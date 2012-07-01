(function() {
  jQuery(function() {
    var $;
    $ = jQuery;
    window.ea.settings_page = {
      setup: function() {
        return $('#adminmenu > li, #menu-wrench > .wp-submenu > ul > li').each(function() {
          var enabled, id, item, item_class, name;
          id = $(this).attr('id');
          name = $('> a', this).contents().filter(function() {
            return this.nodeType === 3;
          }).text();
          if ($.inArray(id, window.ea.core_menus) === -1) {
            item_class = 'plugin_item';
            enabled = 'checked';
            if ($.inArray(id, window.ea.relocated_menus) !== -1) {
              item_class += 'relocated';
              enabled = '';
            }
            item = '<li data-menuid="' + id + '" class="' + item_class + '">\
						<input type="checkbox" ' + enabled + '>\
						' + name + '\
						</li>';
            return $('.ea-wrench-config ul').append(item);
          }
        });
      },
      save: function() {
        var relocated;
        relocated = [];
        $('.ea-wrench-config li').each(function() {
          if (!$('input', this).attr('checked')) {
            return relocated.push($(this).data('menuid'));
          }
        });
        $.cookie('ea_relocated_menus', JSON.stringify(relocated), {
          path: '/',
          expires: 365
        });
        return window.location = window.location;
      }
    };
    return window.ea.settings_page.setup();
  });
}).call(this);
