(function() {
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  jQuery(function() {
    var $, logout_link, relocated_menus, user_menu, username, wrench_menu;
    $ = jQuery;
    window.ea = {};
    $(' #adminmenu .wp-menu-separator, \
		#adminmenu .wp-menu-image, \
		#adminmenu .wp-menu-toggle,\
		#adminmenu .wp-menu-separator-last,\
		#adminmenu #collapse-menu,\
		#adminmenu .wp-menu-arrow,\
		#adminmenuback').remove();
    $('#adminmenu').detach().appendTo('#wphead');
    $('#adminmenuwrap').remove();
    if ($('table.plugins').length > 0) {
      $('table.plugins tbody tr').each(function(i) {
        var modlink, modtype;
        modlink = $('.row-actions-visible a:first', this).attr('href');
        modtype = function() {
          if ($('.row-actions-visible a:first', this).hasClass('active')) {
            return 'off';
          } else {
            return 'on';
          }
        };
        $('.plugin-version-author-uri', this).append(" | ").append($('.row-actions-visible span', this).not(':first').detach());
        return $('.row-actions-visible span:first', this).html($('.row-actions-visible span:first a', this));
      });
    }
    username = $('#user_info > div > p:first').text();
    logout_link = $('#user_info_links a:last').attr('href');
    user_menu = '<li id="menu-user" class="img-menu wp-has-submenu menu-top">\
		<a tabindex="1" class="wp-has-submenu menu-top menu-icon-user" href="#">User</a>\
		<div class="wp-submenu">\
			<div class="wp-submenu-head">User</div>\
			<ul>\
				\
					<span>' + username + '</span>\
				\
				<li class="wp-first-item">\
					<a tabindex="1" class="wp-first-item" href="profile.php">Edit Profile</a>\
				</li>\
				<li>\
					<a tabindex="1" href="' + logout_link + '">Log Out</a>\
				</li>\
\
			</ul>\
		</div>\
	</li>';
    wrench_menu = '<li id="menu-wrench" class="img-menu wp-has-submenu menu-top">\
		<a tabindex="1" class="wp-has-submenu menu-top menu-icon-wrench" href="#">Wrench</a>\
		<div class="wp-submenu">\
			<div class="wp-submenu-head">Wrench</div>\
			<ul>\
				\
			</ul>\
		</div>\
		</li>';
    $('#adminmenu').append(wrench_menu + user_menu);
    window.ea.core_menus = ['menu-dashboard', 'menu-posts', 'menu-posts-custom_type', 'menu-media', 'menu-links', 'menu-pages', 'menu-comments', 'menu-appearance', 'menu-plugins', 'menu-users', 'menu-tools', 'menu-settings', 'menu-user', 'menu-wrench'];
    relocated_menus = $.cookie('ea_relocated_menus');
    if (relocated_menus === null) {
      $.cookie('ea_relocated_menus', '[]', {
        path: '/',
        expires: 365
      });
      relocated_menus = [];
    }
    window.ea.relocated_menus = JSON.parse(relocated_menus);
    return $('#adminmenu > li.menu-top').each(function() {
      var _ref, _ref2;
      if ((_ref = $(this).attr('id'), __indexOf.call(ea.core_menus, _ref) < 0) && (_ref2 = $(this).attr('id'), __indexOf.call(ea.relocated_menus, _ref2) < 0)) {
        return $(this).detach().appendTo('#adminmenu #menu-wrench > .wp-submenu > ul');
      }
    });
  });
}).call(this);
