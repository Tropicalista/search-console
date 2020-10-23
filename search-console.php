<?php
/**
 * @wordpress-plugin
 * Plugin Name:       Search Console
 * Plugin URI:        https://www.tropicalseo.it/
 * Description:       This plugin displays your Google Search Console Analytics data inside your WordPress.
 * Version:           2.1.1
 * Author:            Tropicalista
 * Author URI:        https://www.francescopepe.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       searchconsole
 * Domain Path:       /languages
 */

// don't call the file directly
if ( !defined( 'ABSPATH' ) ) exit;

define( 'SEARCHCONSOLE_VERSION', '2.1.1' );
define( 'SEARCHCONSOLE_FILE', __FILE__ );
define( 'SEARCHCONSOLE_PATH', dirname( SEARCHCONSOLE_FILE ) );

require_once plugin_dir_path( __FILE__ ) . 'includes/loader.php';

$dashylite = \Tropicalista\SearchConsole\Plugin::init();

