window.JST = window.JST || {};
JST["admin/jobs"] = "<table class=\"table table-striped table-bordered\">  <tr>    <th>Job</th>    <th>Status</th>    <th>Lock</th>    <th>Created</th>    <th>Data</th>    <th>Error</th>    <th>Actions</th>  </tr><% _.each(jobs, function(j, i) { %>  <tr>    <td><%= j.name %></td>    <td>      <% if (j.status == 0) { %>      <span class=\"label label-success\">done</span>      <% } if (j.status == 1) { %>      <span class=\"label label-info\">pending</span>      <% } if (j.status == 2) { %>      <span class=\"label label-warning has-error\" rel=\"popover\" data-original-title=\"Error\"        data-content=\"<%= j.error %>\">failing</span>      <% } if (j.status == 3) { %>      <span class=\"label label-important has-error\" rel=\"popover\" data-original-title=\"Error\"        data-content=\"<%= j.error %>\">failed</span>      <% } if (j.status == 4) { %>      <span class=\"label label-important has-error\" rel=\"popover\" data-original-title=\"Error\"        data-content=\"<%= j.error %>\">interrupted</span>      <% } %>    </td>    <td>    <% if (j.locked_by) { %>      <%= relativeDate(new Date(j.locked_at)) %> by <span class=\"label\"><%= j.locked_by %></span>     <% } %>    </td>    <td><%= relativeDate(new Date(j.created)) %></td>    <td class=\"data\"><%= arcs.inflector.truncate(j.data, 50) %></td>    <td class=\"data\"><%= arcs.inflector.truncate(j.error, 50) %></td>    <td>      <button id=\"show-btn\" class=\"btn btn-mini\"        data-id=\"<%= j.id %>\">Show</button>      <button id=\"retry-btn\" class=\"btn btn-mini\"        data-id=\"<%= j.id %>\">Retry</button>      <button id=\"release-btn\" class=\"btn btn-mini\"        data-id=\"<%= j.id %>\">Release</button>      <button id=\"delete-btn\" class=\"btn btn-danger btn-mini\"        data-id=\"<%= j.id %>\">Delete</button>    </td>  </tr><% }) %></table>"
JST["admin/show_job"] = "<dl>  <dt>Job</dt>  <dd><%= name %></dd>  <dt>Status</dt>  <dd><%= status %></dd>  <dt>Created</dt>  <dd><%= created %></dd>  <dt>Lock</dt>  <dd><%= locked_at %></dd>  <dt>Data</dt>  <dd><pre><%= data %></pre></dd>  <dt>Error</dt>  <dd><pre><%= error %></pre></dd></dl>"
JST["admin/users"] = "<table class=\"table table-striped table-bordered\">  <tr>    <th>Name</th>    <th>Username</th>    <th>Email</th>    <th>Role</th>    <th>Actions</th>  </tr><% _.each(users, function(u, i) { %>  <tr>    <td><%= u.name %></td>    <td><%= u.username %></td>    <td><%= u.email %></td>    <td>      <% if (u.role == 0) print('Admin') %>      <% if (u.role == 1) print('Sr. Researcher') %>      <% if (u.role == 2) print('Researcher') %>    <td>      <button id=\"delete-btn\" class=\"btn btn-danger btn-mini \"        data-id=\"<%= u.id %>\">Delete</button>      <button id=\"edit-btn\" class=\"btn btn-info btn-mini\"        data-id=\"<%= u.id %>\">Edit</button>    </td>  </tr><% }) %></table>"
JST["home/details"] = "<ul class=\"resource-thumbs\"><% _.each(resources, function(r, i) { %>  <li>    <a href=\"<%= arcs.baseURL + 'resource/' + r.id %>\">      <img src=\"<%= r.thumb %>\" alt=\"resource\" />    </a>    <a class=\"subtle\" href=\"<%= arcs.baseURL + 'resource/' + r.id %>\"><%= r.title %></a>  </li><% }) %><% if (!resources.length) { %>  <li>    <i class=\"icon-exclamation-sign\"></i> No Results Found  </li><% } else { %>  <li>    <a href='<%= arcs.baseURL + 'search/type:\"' + resources[0].type + '\"' %>'>      <i class=\"icon-share-alt\"></i> Show all    </a>  </li><% } %></ul>"
JST["search/grid"] = "<% _.each(results, function(r, i) { %><div class=\"result grid\" data-id=\"<%= r.id %>\">  <div class=\"img-wrapper\">    <img src=\"<%= r.thumb %>\" data-id=\"<%= r.id %>\" />  </div>  <% if (r.title) { %>  <div>    <strong>      <%- r.title.length > 30 ? r.title.substring(0, 30) + '...' : r.title %>    </strong>  </div>  <% } %>  <div>    <a class=\"subtle\" href=\"<%= arcs.baseURL + 'user/' + r.user.username %>\">      <%= r.user.name %>    </a>  </div>  <div>    <% if (r.comments.length) { %>      <%= r.comments.length %> <i class=\"icon-comment\"></i>    <% } if (r.hotspots.length) { %>      <%= r.hotspots.length %> <i class=\"icon-map-marker\"></i>    <% } if (r.flags.length) { %>      <%= r.flags.length %> <i class=\"icon-flag\"></i>    <% } %> &nbsp;  </div></div><% }) %>"
JST["search/list"] = "<table style=\"width:100%\"><% _.each(results, function(r, i) { %>  <tr class=\"result list\" data-id=\"<%= r.id %>\">    <td class=\"img-wrapper\">      <img src=\"<%= r.thumb %>\" data-id=\"<%= r.id %>\" />    </td>    <td>      <div>        <strong><%= r.title %></strong> &nbsp;        <% if (r.metadata.get('identifier')) { %>          <span class=\"monospace\"><%= r.metadata.get('identifier') %></span> &nbsp;        <% } %>        <a class=\"subtle\" href=\"<%= r.url %>\"><%= r.file_name %></a> &nbsp;        (<em><%= r.file_size %></em>)      </div>      <% if (r.type) { %>      <div>        <% if (arcs.mime.isImage(r.mime_type)) { %>          <i class=\"icon-picture\"></i>        <% } else if (arcs.mime.isVideo(r.mime_type)) { %>          <i class=\"icon-film\"></i>        <% } else { %>          <i class=\"icon-file\"></i>        <% } %>        <%= r.type %>      </div>      <% } %>      <div>        Uploaded        <%= relativeDate(new Date(r.created)) %>        by        <a class=\"subtle\" href=\"<%= arcs.url('user', r.user.name) %>\"><%= r.user.name %></a>       </div>      <div>        <% _.each(r.keywords, function(k) { %>          <a class=\"keyword-link subtle\"             href=\"<%= arcs.url('search', 'keyword:' + k) %>\"><%= k %></a>        <% }) %>      </div>      <div>        <% if (r.comments.length) { %>          <%= r.comments.length %> <i class=\"icon-comment\"></i>        <% } if (r.hotspots.length) { %>          <%= r.hotspots.length %> <i class=\"icon-map-marker\"></i>        <% } if (r.flags.length) { %>          <%= r.flags.length %> <i class=\"icon-flag\"></i>        <% } if (!r.public) { %>          <i class=\"icon-lock\"></i>        <% } %>      </div>    </td>  </tr><% }) %></table>"
JST["search/preview"] = "<div class=\"preview\">  <img class=\"preview-image\" src=\"<%= preview || url %>\" alt=\"preview\"/>  <div class=\"preview-footer\">    <a id=\"title\" href=\"<%= arcs.baseURL + \"resource/\" + id %>\">      <%= title %>    </a>&nbsp;    <% if (mime_type == 'application/pdf') print('(PDF)'); %>    <% if (count > 1) { %>    <span class=\"pull-right\">      <% if (page > 1) { %>        <span id=\"prev-btn\">&larr;</span>      <% } %>      <%= page %> / <%= count %>      <span id=\"next-btn\"         class=\"<%= page < count ? '' : 'invisible' %>\">&rarr;</span>    </span>    <% } %>  </div></div>"
JST["ui/button"] = "<a class=\"btn icon unselectable\" id=\"<%= id %>\"    <%= this.url !== undefined ? 'href=\"' + url + '\"' : '' %>>    <span class=\"<%= this.class %>\"></span>    <%= text %></a>"
JST["ui/context_menu"] = "<ul class=\"nav nav-list context-menu\" style=\"display:none\">  <% for (o in options) { %>  <li><a class=\"context-menu-option\"     id=\"context-menu-option-<%= arcs.inflector.identifierize(o) %>\">    <%= o %></a></li>  <% } %></ul>"
JST["ui/loader"] = "<div class=\"loading\" id=\"arcs-loader\"></div>"
JST["ui/modal"] = "<div class=\"modal-header\">  <a class=\"close\" data-dismiss=\"modal\">×</a>  <h3><%= title %></h3></div><div class=\"modal-body\"><% if (subtitle) { %>  <%= subtitle %>  <br><br><% } %>  <div id=\"validation-error\"></div><% _.each(inputs, function(i, name) { %>  <% if (_.isUndefined(i.label) || i.label !== false) { %>    <label for=\"modal-<%= name %>\">      <%= _.isUndefined(i.label) ? name.charAt(0).toUpperCase() + name.substr(1) : i.label %>       <% if (i.help) { %>        <i class=\"icon-info-sign\" rel=\"tooltip\" title=\"<%= i.help %>\"></i>      <% } %>    </label>  <% } %>  <% if (i.type === 'select') { %>    <select class=\"<%= i.class %>\" id=\"modal-<%= name %>-input\"      <%= i.focused ? 'autofocus' : '' %>      name=\"modal-<%= name %>\">    <% _.each(i.options, function(val, key) { %>      <option <%= i.value == val ? 'selected' : '' %> value=\"<%= val %>\"?>        <%= _.isArray(i.options) ? val : key %>      </option>    <% }) %>    </select>  <% } else if (i.type === 'textarea') { %>    <textarea class=\"<%= i.class %>\" id=\"modal-<%= name %>-input\"      name=\"modal-<%= name %>\" <%= i.focused ? 'autofocus' : '' %>><%= i.value || '' %></textarea>  <% } else { %>    <input type=\"<%= i.type ? i.type : 'text' %>\" class=\"<%= i.class %>\"      id=\"modal-<%= name %>-input\" value=\"<%= i.value %>\"      <%= i.focused ? 'autofocus' : '' %>      name=\"modal-<%= name %>\" placeholder=\"<%= i.placeholder %>\" />  <% } %><% }) %></div><div class=\"modal-footer\"><% _.each(buttons, function(b, name) { %>  <button class=\"<%= b.class ? b.class : 'btn' %>\"     id=\"modal-<%= name %>-button\">    <%= name.substr(0, 1).toUpperCase() + name.substr(1) %>   </button><% }) %></div>"
JST["ui/modal_columned"] = "<div class=\"modal-header\">  <a class=\"close\" data-dismiss=\"modal\">×</a>  <h3><%= title %></h3></div><div class=\"modal-body\"><% if (subtitle) { %>  <%= subtitle %>  <br><br><% } %><% var left = true %><% _.each(inputs, function(i, name) { %>  <% if (left) { %>  <div class=\"row\">  <% } %>  <span class=\"span-6\">  <% if (_.isUndefined(i.label) || i.label !== false) { %>    <label for=\"modal-<%= name %>\">      <%= _.isUndefined(i.label) ? name.substr(0, 1).toUpperCase() + name.substr(1) : i.label %>       <% if (i.help) { %>        <i class=\"icon-info-sign\" rel=\"tooltip\" title=\"<%= i.help %>\"></i>      <% } %>    </label>  <% } %>  <% if (i.type === 'select') { %>    <select class=\"<%= i.class %>\" id=\"modal-<%= name %>-input\"      <%= i.focused ? 'autofocus' : '' %>      name=\"modal-<%= name %>\">    <% _.each(i.options, function(val, key) { %>      <option <%= i.value == val ? 'selected' : '' %> value=\"<%= val %>\">        <%= _.isArray(i.options) ? val : key %>      </option>    <% }) %>    </select>  <% } else if (i.type === 'textarea') { %>    <textarea class=\"<%= i.class %>\" id=\"modal-<%= name %>-input\"      name=\"modal-<%= name %>\" <%= i.focused ? 'autofocus' : '' %>></textarea>  <% } else { %>    <input type=\"<%= i.type ? i.type : 'text' %>\" class=\"<%= i.class %>\"      id=\"modal-<%= name %>-input\" value=\"<%= i.value %>\"      <%= i.focused ? 'autofocus' : '' %>      name=\"modal-<%= name %>\" placeholder=\"<%= i.placeholder %>\" />  <% } %>  <% if (!_.isUndefined(i.checkbox)) { %>    <input class=\"checkbox inline\" id=\"modal-<%= name %>-checkbox\"       type=\"checkbox\" <%= (i.checkbox) ? 'checked' : '' %> />  <% } %>  </span>  <% if (!left) { %>  </div>  <% } %>  <% left = !left %><% }) %><% if (!left) { %>  </div><% } %></div><div class=\"modal-footer\"><% _.each(buttons, function(b, name) { %>  <button class=\"<%= b.class ? b.class : 'btn' %>\"     id=\"modal-<%= name %>-button\">    <%= name.substr(0, 1).toUpperCase() + name.substr(1) %>   </button><% }) %></div>"
JST["ui/modal_wrapper"] = "<div id=\"modal\" class=\"modal\" style=\"display:none; max-height:none;\"></div>"
JST["ui/notification"] = "<div id=\"notification\" class=\"alert notification\" style=\"display:none\">    <a class=\"close\" data-dismiss=\"alert\" href=\"#\">×</a>    <h3 class=\"alert-heading\" id=\"header\"></h3>    <span id=\"msg\"></span></div>"
JST["ui/progress"] = "<span class=\"progress\">  <div class=\"bar\" style=\"width: <%= progress %>%\"></div></span>"
JST["upload/list"] = "<div class=\"accordion-group upload\" data-id=\"<%= cid %>\">  <div class=\"accordion-heading\">    <div class=\"accordion-toggle\">      <% if (arcs.mime.isImage(type)) { %>        <i class=\"icon-picture\"></i>      <% } else if (arcs.mime.isVideo(type)) { %>        <i class=\"icon-film\"></i>      <% } else { %>        <i class=\"icon-file\"></i>      <% } %>      <%= name %> &nbsp;&nbsp;      <em><%= arcs.utils.convertBytes(size) %></em> &nbsp;&nbsp;      <div class=\"remove\"></div>      <span class=\"progress\">        <div class=\"bar\" style=\"width: <%= progress %>%\"></div>      </span>      <span id=\"progress-done\" class=\"pull-right\" style=\"display:none\">        <i class=\"icon-ok\"></i> Done      </span>    </div>  </div>  <div class=\"accordion-body collapse in\">    <div class=\"accordion-inner\">      <input type=\"text\" id=\"upload-title\" placeholder=\"Title\" />      <input type=\"text\" id=\"upload-identifier\" placeholder=\"Identifier\" />      <select id=\"upload-type\" style=\"display:inline-block\">        <option disabled selected>Choose Type...</option>      <% _.each(arcs.config.types, function(help, type) { %>        <option><%= type %></option>      <% }) %>      </select>    </div>  </div></div>"
JST["viewer/annotations"] = "<% _.each(hotspots, function(h) { %><a class=\"annotation\"><%= h.type %></a><div class=\"annotation-caption\"><%- h.caption %></div><br><% }) %>"
JST["viewer/carousel"] = "<% _.each(resources, function(r, i) { %>  <li>    <img class=\"thumb\" src=\"<%= r.thumb %>\" alt=\"thumbnail\"      style=\"width:100px; height:90px;\" data-id=\"<%= r.id %>\"/>    <div class=\"overlay\">      <span><%= i + 1 + offset %></span>    </div>  </li><% }) %>"
JST["viewer/collection_table"] = "<tr>  <td>Title</td>  <td><%= title %></td></tr><tr>  <td>Description</td>  <td><%= description %></td></tr><tr>  <td>Public</td>  <td><%= public ? \"Yes\" : \"No\" %></td></tr><% if (pdf) { %><tr>  <td>Original PDF</td>  <td><a href=\"<%= arcs.baseURL + 'resource/' + pdf %>\">Link</a></td></tr><% } %>"
JST["viewer/discussion"] = "<% _.each(comments, function(c) { %><div class=\"comment-wrapper\" id=\"comment-<%= c.id %>\">  <div class=\"comment-voice thumbnail\">    <img class=\"user-thmb\" src=\"http://gravatar.com/avatar/<%= c.gravatar %>?s=40\"/>  </div>  <div class=\"comment-header\">    <a class=\"name subtle\" href=\"<%= arcs.baseURL + 'user/' + c.username %>\">      <%= c.name %>    </a>    commented     <span class=\"time\"><%= relativeDate(new Date(c.created)) %></span>  </div>  <div class=\"comment\"><%- c.content %></div></div><% }) %>"
JST["viewer/document"] = "<iframe src=\"http://docs.google.com/gview?url=<%= url %>&embedded=true\"    style=\"width: 100%; height: 100%; float:left;\" frameborder=\"0\"></iframe>"
JST["viewer/hotspot_modal"] = "<div id=\"hotspot-modal-tabs\" class=\"tabbable\">  <ul class=\"nav nav-tabs\">    <li class=\"active\">      <a href=\"#resource-link\" data-toggle=\"tab\">Resource</a>    </li>    <li><a href=\"#url-link\" data-toggle=\"tab\">URL</a></li>  </ul>  <div class=\"tab-content\">    <div id=\"resource-link\" class=\"tab-pane active\">      <div id=\"hotspot-search\"></div>      <div id=\"hotspot-search-results\"></div>    </div>    <div id=\"url-link\" class=\"tab-pane\">      <div class=\"input-prepend\">        <span class=\"add-on\">http://</span>        <input id=\"url\" class=\"span2\" type=\"text\" />      </div>    </div>  </div></div>"
JST["viewer/hotspots"] = "<% _.each(hotspots, function(h) { %><a class=\"hotspot\" style=\"left:<%= h.left %>px; top:<%= h.top %>px; width:<%= h.width %>px;    height:<%= h.height %>px;\" rel=\"popover\" data-original-title=\"<%= h.type %>\"    data-content=\"<%= h.caption %>\" href=\"<%= h.link %>\"></a><% }) %>"
JST["viewer/image"] = "<img src=\"<%= preview || url %>\" alt=\"resource\" data-id=\"<%= id %>\">"
JST["viewer/keywords"] = "<% _.each(keywords, function(k) { %><a class=\"keyword\" id=\"keyword-<%= k.id %>\" href=\"<%= k.link %>\">    <%- k.keyword %></a><br><% }) %>"
JST["viewer/table"] = "<tr>  <td>Title</td>  <td><%- title %></td></tr><tr>  <td>Access</td>  <td><%= public ? \"public\" : \"private\" %></td></tr><tr>  <td>Type</td>  <td><%- type || '' %></td></tr><tr>  <td>Created</td>  <td><%= created %></td></tr><% if (modified) { %><tr>  <td>Modified</td>  <td><%= modified %></td></tr><% } %><tr>  <td>File-name</td>  <td><a href=\"<%= url %>\"><%= file_name %></a></td></tr><tr>  <td>File-type</td>  <td><a href=\"<%= url %>\"><%= mime_type %></a></td></tr><% _.each(metadata.attributes, function(v, k) { %><% if (v) { %><tr>  <td><%- k.charAt(0).toUpperCase() + k.substr(1) %></td>  <td><%- v %></td></tr><% } %><% }) %>"
