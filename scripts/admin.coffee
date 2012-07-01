jQuery ->
	
	$ = jQuery
	window.ea = {}
		
	# clean up admin menu
	$(' #adminmenu .wp-menu-separator, 
		#adminmenu .wp-menu-image, 
		#adminmenu .wp-menu-toggle,
		#adminmenu .wp-menu-separator-last,
		#adminmenu #collapse-menu,
		#adminmenu .wp-menu-arrow,
		#adminmenuback').remove()
		
	# move menu to header
	$('#adminmenu').detach().appendTo('#wphead')
	$('#adminmenuwrap').remove()
	
	# rewrite this to check the body tag for plugins-php class
	# plugins page
	if $('table.plugins').length > 0
		$('table.plugins tbody tr').each (i)-> 
			modlink = $('.row-actions-visible a:first', this).attr('href')
			modtype = -> 
				if $('.row-actions-visible a:first', this).hasClass('active')
					'off'
				else 
					'on'
			
			$('.plugin-version-author-uri', this).append(" | ").append($('.row-actions-visible span', this).not(':first').detach())
			$('.row-actions-visible span:first', this).html($('.row-actions-visible span:first a', this));


	# user menu
	username = $('#user_info > div > p:first' ).text()
	logout_link = $('#user_info_links a:last').attr('href')
	
	user_menu = '<li id="menu-user" class="img-menu wp-has-submenu menu-top">
		<a tabindex="1" class="wp-has-submenu menu-top menu-icon-user" href="#">User</a>
		<div class="wp-submenu">
			<div class="wp-submenu-head">User</div>
			<ul>
				
					<span>'+username+'</span>
				
				<li class="wp-first-item">
					<a tabindex="1" class="wp-first-item" href="profile.php">Edit Profile</a>
				</li>
				<li>
					<a tabindex="1" href="'+logout_link+'">Log Out</a>
				</li>

			</ul>
		</div>
	</li>'

	

	# create plugin menu
	wrench_menu = '<li id="menu-wrench" class="img-menu wp-has-submenu menu-top">
		<a tabindex="1" class="wp-has-submenu menu-top menu-icon-wrench" href="#">Wrench</a>
		<div class="wp-submenu">
			<div class="wp-submenu-head">Wrench</div>
			<ul>
				
			</ul>
		</div>
		</li>'
		
	$('#adminmenu').append wrench_menu + user_menu
	
	# configure wrench menu
	# if menu items are not core_items & are not relocated items, they are placed in the wrench menu
	window.ea.core_menus = ['menu-dashboard', 'menu-posts', 'menu-posts-custom_type', 'menu-media', 'menu-links', 'menu-pages', 'menu-comments', 'menu-appearance', 'menu-plugins', 'menu-users', 'menu-tools', 'menu-settings', 'menu-user', 'menu-wrench']
	
	relocated_menus = $.cookie('ea_relocated_menus')
	if relocated_menus == null
		$.cookie('ea_relocated_menus', '[]', { path:'/', expires: 365 } )
		relocated_menus = []	
	window.ea.relocated_menus = JSON.parse(relocated_menus)
	
	
	# relocate plugin generated menus
	
	$('#adminmenu > li.menu-top').each ->
		if $(this).attr('id') not in ea.core_menus and $(this).attr('id') not in ea.relocated_menus
			$(this).detach().appendTo('#adminmenu #menu-wrench > .wp-submenu > ul')


