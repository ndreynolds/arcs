<?php
/**
 * Keyword model
 *
 * @package    ARCS
 * @link       http://github.com/calmsu/arcs
 * @copyright  Copyright 2012, Michigan State University Board of Trustees
 * @license    BSD License (http://www.opensource.org/licenses/bsd-license.php)
 */
class Keyword extends AppModel {
    public $name = 'Keyword';
    public $belongsTo = array('User', 'Resource');
    public $whitelist = array('keyword', 'resource_id');

    /**
     * Given a string of comma-separated values, split the values and save each
     * of them as keywords.
     *
     * @param string $string  Keyword string (e.g. "one, two, three")
     * @param array $data     A template save array, that will be extended with
     *                        each keyword. Use this to include `user_id`, etc.
     * @return bool           Result of `saveMany`
     */
    public function saveFromString($string, $data=array()) {
        $keywords = array();
        foreach(explode(',', $string) as $k) {
            $keyword = $data;
            $keyword['keyword'] = trim($k);
            if (strlen($k)) $keywords[] = $keyword;
        }
        return $this->saveMany($keywords);
    }
}
