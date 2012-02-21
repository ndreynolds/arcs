
arcs.templates.resourceImage = "<img src=\"{{ url }}\" alt=\"resource\" data-id=\"{{ id }}\">";

arcs.templates.resourceDocument = "<iframe src=\"http://docs.google.com/gview?url={{ url }}&embedded=true\"\n    style=\"width:60%; height:100%; float:left;\" frameborder=\"0\"></iframe>";

arcs.templates.resourceTable = "<tr>\n    <td>Title</td>\n    <td>{{ title }}\n</tr>\n<tr>\n    <td>Public</td>\n    {{# public }}\n    <td>Yes</td>\n    {{/ public }}\n    {{^ public }}\n    <td>No</td>\n    {{/ public }}\n</tr>\n<tr>\n    <td>Type</td>\n    <td>{{ type }}</td>\n</tr>\n<tr>\n    <td>Created</td>\n    <td>{{ created }}</td>\n</tr>\n{{# modified }}\n<tr>\n    <td>Modified</td>\n    <td>{{ modified }}</td>\n</tr>\n{{/ modified }}\n<tr>\n    <td>Download Link</td>\n    <td><a href=\"{{ url }}\">{{ file_name }}</a></td>\n</tr>";

arcs.templates.collectionTable = "<tr>\n    <td>Title</td>\n    <td>{{ title }}\n</tr>\n<tr>\n    <td>Description</td>\n    <td>{{ description }}\n</tr>\n<tr>\n    <td>Public</td>\n    {{# public }}\n    <td>Yes</td>\n    {{/ public }}\n    {{^ public }}\n    <td>No</td>\n    {{/ public }}\n</tr>\n{{# pdf }}\n<tr>\n    <td>Original PDF</td>\n    <td><a href=\"../resource/{{ pdf }}\">Link</a></td>\n</tr>\n{{/ pdf }}";

arcs.templates.discussion = "{{# comments }}\n<div class=\"comment-wrapper\" id=\"comment-{{ id }}\">\n    <div class=\"comment-header\">\n        <span class=\"name\">{{ name }}{{ _name }}</span>\n        commented \n        <span class=\"time\">{{ created }}{{ _created }}</span>\n    </div>\n    <div class=\"comment\">{{ content }}</div>\n</div>\n{{/ comments }}";

arcs.templates.tagList = "{{# tags }}\n<a class=\"tag\" id=\"tag-{{ id }}\" href=\"{{ link  }}\">\n    {{ tag }}\n</a>\n<br>\n{{/ tags }}";

arcs.templates.hotspotModal = "<div class=\"modal-header\">\n    <h3>New Annotation</h3>\n</div>\n<div class=\"modal-body\">\n    <h4>Type</h4>\n    <select id=\"type\">\n        <option value=\"photo\">Photo</option>\n        <option value=\"sketch\">Sketch</option>\n        <option value=\"report\">Report</option>\n    </select>\n    <h4>Title</h4>\n    <input type=\"text\" id=\"title\" />\n    <h4>Caption</h4>\n    <textarea id=\"caption\"></textarea>\n    <div class=\"tabbable\">\n        <ul class=\"nav tabs\">\n            <li class=\"active\"><a href=\"#resource-link\" data-toggle=\"tab\">Resource</a></li>\n            <li><a href=\"#url-link\" data-toggle=\"tab\">URL</a></li>\n        </ul>\n        <div class=\"tab-content\">\n            <div id=\"resource-link\" class=\"tab-pane active\">\n                <div id=\"hotspot-search\"></div>\n                <div id=\"hotspot-search-results\"></div>\n            </div>\n            <div id=\"url-link\" class=\"tab-pane\">\n                <div class=\"input-prepend\">\n                    <span class=\"add-on\">http://</span>\n                    <input id=\"url\" type=\"text\" />\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"modal-footer\">\n    <button id=\"save\" class=\"btn success\">Save</button>\n    <button id=\"cancel\" class=\"btn\">Cancel</button>\n</div>";

arcs.templates.hotspot = "{{# hotspots }}\n<a class=\"hotspot\" style=\"left:{{left}}px; top:{{top}}px; width:{{width}}px;\n    height:{{height}}px;\" rel=\"popover\" data-original-title=\"{{type}}\"\n    data-content=\"{{caption}}\" href=\"{{link}}\"></a>\n{{/ hotspots }}";

arcs.templates.annotation = "{{# hotspots }}\n<a class=\"annotation\">{{ type }}</a>\n<br>\n<span class=\"annotation-caption\">{{ caption}}</span>\n<br>\n{{/ hotspots }}";

arcs.templates.button = "<a class=\"btn icon unselectable\" id=\"{{ id }}\"\n    {{# url }} href=\"{{ url }}\" {{/ url }}>\n    <span class=\"{{ class }}\"></span>\n    {{ text }}\n</a>";

arcs.templates.resultsGrid = "{{# results }}\n<div class=\"result grid\">\n    <img src=\"{{ thumb }}\" data-id=\"{{ id }}\" style=\"height:100px\" />\n    <div><strong>{{ title }}</strong></div>\n    <div>{{ user_name }}</div>\n</div>\n{{/ results }}";

arcs.templates.resultsList = "<table>\n{{# results }}\n<tr class=\"result list\">\n    <td>\n        <img src=\"{{ thumb }}\" data-id=\"{{ id }}\" style=\"width:100px\" />\n    </td>\n    <td>\n        <div><strong>{{ title }}</strong></div>\n        <br>\n        <div>{{ user_name }}</div>\n    </td>\n</tr>\n{{/ results }}\n</table>";

arcs.templates.modalWrapper = "<div id=\"modal\" class=\"modal\" style=\"display:none; max-height:none;\"></div>";

arcs.templates.searchModal = "<div class=\"modal-header\">\n    <h3>{{ title }}</h3>\n</div>\n<div class=\"modal-body\">\n    {{ message }}\n    <br><br>\n    <input type=\"text\" value=\"{{ value }}\" id=\"search-modal-value\" />\n</div>\n<div class=\"modal-footer\">\n    <button id=\"cancel\" class=\"btn\">Cancel</button>\n    <button id=\"save\" class=\"btn info\">Make it so</button>\n</div>";

arcs.templates.splitModal = "<div class=\"modal-header\">\n    <h3>PDF</h3>\n</div>\n<div class=\"modal-body\">\n    We noticed you've uploaded a PDF. If you'd like, we can\n    split the PDF into a collection, where it can be annotated\n    and commented on--page by page.\n    <hr>\n    <h4>Make a collection from this resource?</h4>\n</div>\n<div class=\"modal-footer\">\n    <button id=\"cancel\" class=\"btn\">No, leave it alone.</button>\n    <button id=\"yes\" class=\"btn success\">Yes</button>\n</div>";

arcs.templates.loader = "<div class=\"loading\" id=\"arcs-loader\"></div>";
