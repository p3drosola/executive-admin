jQuery ->
	$ = jQuery
	window.ea.settings_page = {
		setup : ->
			
			
			
			$('#adminmenu > li, #menu-wrench > .wp-submenu > ul > li').each( ->
				id = $(this).attr('id')
				#name = $('> a', this).text()
				# skip update counts
				name = $('> a', this).contents().filter( -> 
					return this.nodeType == 3
				).text()
				
									
				
				if $.inArray(id, window.ea.core_menus) == -1
					item_class = 'plugin_item'
					enabled = 'checked'
					if $.inArray(id, window.ea.relocated_menus) != -1
						item_class += 'relocated'
						enabled = ''
						
					item = '<li data-menuid="'+id+'" class="'+item_class+'">
						<input type="checkbox" '+enabled+'>
						'+ name+ '
						</li>'
					$('.ea-wrench-config ul').append(item)
				)
		, save : ->
			relocated = []
			$('.ea-wrench-config li').each(->
				if not $('input', this).attr('checked')
					relocated.push($(this).data('menuid'))
			)
			$.cookie('ea_relocated_menus', JSON.stringify(relocated), { path:'/', expires: 365 } )
			window.location = window.location
	}
	window.ea.settings_page.setup();
