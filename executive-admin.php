<?php
/*
Plugin Name: Executive Admin
Plugin URI: http://l33t.me/executive-admin
Description: A brilliant Wordpress admin theme.
Author: Pedro Sola
Version: 1.3
Author URI: http://l33t.me
*/


$ea_version = 1.3;

# check WP version
if ( version_compare($wp_version, '3.2.1', '<' )):
	
       add_action('admin_notices', 'ea_version_warning');
       function ea_version_warning() {
           echo "<div id='ea-warning' class='updated fade'><p><strong>".sprintf(__('Executive Admin %s requires WordPress 3.1 or higher.'), $ea_version) ."</strong> ".sprintf(__('Please <a href="%s">upgrade WordPress</a> to the latest version if you want to use Executive Admin.'), 'http://codex.wordpress.org/Upgrading_WordPress'). "</p></div>";
       }

else: # begin ea code

# inject admin pages scripts and stylesheets
add_action('admin_enqueue_scripts', 'ea_scripts');
function ea_scripts(){
	
	wp_enqueue_style('executive-admin', plugins_url('stylesheets/admin.css', __FILE__) );
	wp_enqueue_script('jquery-cookie', plugins_url('scripts/plugins/jquery.cookie.js', __FILE__), array('jquery') );
	wp_enqueue_script('json2');
	wp_enqueue_script('executive-admin', plugins_url('scripts/admin.js', __FILE__), array('jquery', 'jquery-cookie', 'json2') );
	
	
	# @TODO: fix this so it only runs when needed!
	
	#wp_enqueue_script('jquery-ui-draggable');
	#wp_enqueue_script('jquery-ui-droppable');
	
}

# customize admin footer
add_filter( 'admin_footer_text', 'ea_footer' );
function ea_footer( $default_text ) {
	
	$t = 'Thanks for creating with <a href="http://www.wordpress.org">WordPress</a>';
	$t .= '<span id="footer-links"><a href="http://codex.wordpress.org/">Documentation</a> ';
	$t .= '| <a href="http://wordpress.org/support/forum/4">Feedback</a>';
	$t .= '| Version: '.get_bloginfo('version').' </span>';
	
	$t .= '<a id="executive-credits" href="http://l33t.me/executive-admin"></a><p>';
	
	return $t;
}

# updates integration
require_once 'updater.php';
$ea_updater = new PluginUpdateChecker(
	'http://l33t.me/executive-admin/version.json', __FILE__,
	'executive-admin'
);


# inject stylesheet into login screen
add_action('login_head', 'ea_login');
function ea_login() {
	echo '<link rel="stylesheet" href="'.plugins_url('stylesheets/login.css', __FILE__).'" type="text/css" media="screen" charset="utf-8">';
}
# rewrite link header link
add_filter( 'login_headerurl', 'executive_loginurl' );
function executive_loginurl( $original ){
	return bloginfo('url');
}

# EA settings page
add_action('admin_menu', 'ea_add_menu');
function ea_add_menu() {
	add_options_page( "Executive Admin", 'ExAdmin', 8, 'executive-admin', 'ea_display_settings');
}
function ea_display_settings(){ 
	include('settings-page.php');
}



endif; # end $ea