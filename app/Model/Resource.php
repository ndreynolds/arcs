<?php

include_once(LIB . 'relic' . DS . 'library' . DS . 'Mime.php');
include_once(LIB . 'relic' . DS . 'library' . DS . 'Image.php');

class Resource extends AppModel {
    public $name = 'Resource';
    public $belongsTo = 'User';
    public $hasMany = array(
        'Membership',
        'Comment',
        'Keyword',
        'Hotspot',
        'Flag',
        'Metadatum'
    );
    public $whitelist = array(
        'public',
        'exclusive',
        'mime_type',
        'title',
        'context',
        'type',
        'first_req'
    );

    /**
     * Adds the URLs to the Resource's file and thumbnail to the return array.
     * Note that we don't store those, so we must dynamically generate them.
     */
    public function afterFind($results, $primary) {
        $results = parent::afterFind($results, $primary);
        # Add the thumbnail and resource urls to the results array.
        # We're using our resultsMap method, passing in $this and using it
        # internally as $ctx, as a way of accessing our methods within the 
        # callback.
        $results = $this->resultsMap($results, function($r, $ctx) {
            if (isset($r['sha']) && isset($r['file_name'])) {
                $r['url'] = $ctx->url($r['sha'], $r['file_name']);
                $r['thumb'] = $ctx->url($r['sha'], 'thumb.png');
                if (is_file($ctx->path($r['sha'], 'preview.png')))
                    $r['preview'] = $ctx->url($r['sha'], 'preview.png');
            }
            return $r;
        }, $this);
        return $results;
    }

    /**
     * Creates the file-level components of a Resource.
     *
     * Given a file path, it will calculate a SHA1 checksum of the file at the
     * path. The file is then moved (or copied) to the uploads directory and
     * stored content-addressably (using the hexdigest of our checksum).
     *
     * @param string $src      Path to a readable file.
     * @param array  $options  Array of options, specified below:
     *
     *      filename: Provide the desired filename, if different than src path 
     *                basename.
     *      move:     If false, copy the file rather than move it. Will move by 
     *                default.
     *      thumb:    Make a thumbnail.
     *      preview:  Make a preview (if it seems prudent). When False a preview
     *                will not be made.
     *
     * @return string  a SHA1 hexdigest that can be used to get the resource's 
     *                 path.
     */
    public function createFile($src, $options=array()) {
        $defaults = array(
            'filename' => null,
            'move' => true,
            'thumb' => false,
            'preview' => true
        );
        $options = array_merge($defaults, $options);

        # If we can't read the src path, return false.
        if (!is_readable($src)) return false;

        # Get the SHA, destination path, and filename.
        $sha = $this->_getSHA($src);
        $fname = is_null($options['filename']) ? basename($src) : $options['filename'];
        $dst = $this->path($sha);

        # Try to make the new directory if it's not already there.
        if (!is_dir($dst))
            # Return false if we can't make it.
            if (!mkdir($dst, 0777, true)) return false;

        # If the file doesn't already exist (it may be a duplicate):
        if (!is_file($dst . DS . $sha)) {
            # Try to move if move and writable.
            if ($options['move'] && is_writable($src)) {
                $success = rename($src, $dst . DS . $sha);
            # Otherwise try to copy. (Maybe it's read-only)
            } else {
                $success = copy($src, $dst . DS . $sha);
            }
            # Return false on failure.
            if (!$success) return false;
            # Thumbnail
            if ($options['thumb']) $this->makeThumbnail($sha);
            else $this->_setDefaultThumb($sha);
        }

        # Create a hard link to the file, if the file doesn't already exist.
        if (!is_file($dst . DS . $fname))
            # Return false if we can't make the link.
            if (!link($dst . DS . $sha, $dst . DS . $fname)) return false;
        
        # Make a preview image, if we need one.
        if ($this->_needsPreview($sha) && $options['preview']) 
            $this->makePreview($sha);

        # Return the hexdigest.
        return $sha;
    }

    /**
     * Return the file path to the resource's directory.
     *
     * This is based on the paths.uploads setting in `arcs.ini`
     *
     * @param sha    resource's SHA1
     * @param fname  filename
     */
    public function path($sha, $fname=null) {
        $path = $this->_path($sha, Configure::read('paths.uploads'), DS);
        if ($fname) return $path . DS . $fname;
        return $path;
    }

    /**
     * Return the url to the resource's directory.
     *
     * This is based on the urls.uploads setting in `arcs.ini`
     *
     * @param sha   resource's SHA1
     * @param fname resource's filename
     */
    public function url($sha, $fname=null) {
        $url = $this->_path($sha, Configure::read('urls.uploads'));
        if ($fname) return $url . DS . $fname;
        return $url;
    }

    /**
     * Return the file size of a Resource, in bytes.
     *
     * @param sha   resource's SHA1
     * @param fname resource's filename
     */
    public function size($sha, $fname) {
        return filesize($this->path($sha, $fname));
    }

    public function makeThumbnail($sha) {
        return \Relic\Image::thumbnail(
            $this->path($sha, $sha),
            $this->path($sha, 'thumb.png')
        );
    }

    public function makePreview($sha) {
        return \Relic\Image::preview(
            $this->path($sha, $sha),
            $this->path($sha, 'preview.png')
        );
    }

    /**
     *
     * @param files
     */
    public function makeZipfile($files, $zipname) {
        if (!class_exists('ZipArchive')) return false;
        $tmp_file = tempnam(sys_get_temp_dir(), 'ARCS');
        $zip = new ZipArchive();
        $zip->open($tmp_file);
        $zip->addEmptyDir($zipname);
        foreach ($files as $name => $sha) {
            try {
                $zip->addFile($this->path($sha, $name), $zipname . DS . $name);
            } catch (Exception $e) {
                continue;
            }
        }
        $zip->close();
        return $this->createFile($tmp_file, array(
            'filename' => $zipname . '.zip',
            'preview' => false
        ));
    }

    public function firstRequest($id) {
        $this->read(null, $id);
        $this->set('first_req', false);
        $this->save();
    }

    /* PRIVATE METHODS */

    /**
     * Builds paths for resources using the ARCS spec. For example:
     *
     * $this->_path('123456789abcdef...', '/root/dir/')
     *
     * # '/root/dir/1/2/3/456789abcdef...'
     *
     * @param sha   resource's SHA1
     * @param root  root path to prepend
     * @param sep   separator to use, in most cases '/' or '\'
     * @return      full path
     */
    private function _path($sha, $root='', $sep='/') {
        # Trim any trailing sep
        $root = rtrim($root, $sep);
        return $root . $sep . 
            substr($sha, 0, 1) . $sep . 
            substr($sha, 1, 1) . $sep . 
            substr($sha, 2, 1) . $sep . 
            substr($sha, 3);
    }

    /**
     * Computes a SHA1 checksum of the file at the given path.
     *
     * @param name   file path
     * @return       a SHA1 hexdigest
     */
    private function _getSHA($path) {
        return sha1_file($path);
    }

    private function _needsPreview($sha) {
        $path = $this->path($sha, $sha);
        # Anything greater than a megabyte.
        if (filesize($path) > 1000000) return true;
        $mime = \Relic\Mime::mime($path);
        # PDFs and TIFFs need previews, too.
        if (in_array($mime, array('application/pdf', 'image/tiff'))) return true;
        return false;
    }

    /**
     * Puts a default thumbnail within the path, given a MIME type.
     *
     * We don't create thumbnails during the Request-Response loop, but 
     * we'll copy over a placeholder.
     *
     * @param sha
     */
    private function _setDefaultThumb($sha) {
        $types = \Relic\Mime::extensions($this->path($sha, $sha));
        $image = 'generic';
        foreach($types as $type) {
            if (is_file(IMAGES . 'default_thumbs' . DS . $type . '.png')) {
                $image = $type;
                break;
            }
        }
        copy(
            IMAGES . 'default_thumbs' . DS . $image . '.png', 
            $this->path($sha, 'thumb.png')
        );
    }
}
