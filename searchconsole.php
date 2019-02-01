<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://tropicalseo.net
 * @since             1.0.0
 * @package           SearchConsole
 *
 * @wordpress-plugin
 * Plugin Name:       Search Console
 * Plugin URI:        https://tropicalseo.net/
 * Description:       This plugin displays your Google Search Console Analytics data inside your WordPress.
 * Version:           1.2.8
 * Author:            Tropicalista
 * Author URI:		  https://tropicalseo.net/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       search-console
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( !defined( 'WPINC' ) ) {
    die;
}


/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'SearchConsole_VERSION', '1.2.8' );

function sc_fs_uninstall_cleanup()
{
    delete_option( 'search-console-general' );
    delete_option( 'search-console-advanced' );
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-searchconsole-activator.php
 */
function activate_SearchConsole()
{
    require_once plugin_dir_path( __FILE__ ) . 'includes/class-searchconsole-activator.php';
    SearchConsole_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-searchconsole-deactivator.php
 */
function deactivate_SearchConsole()
{
    require_once plugin_dir_path( __FILE__ ) . 'includes/class-searchconsole-deactivator.php';
    SearchConsole_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_SearchConsole' );
register_deactivation_hook( __FILE__, 'deactivate_SearchConsole' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-searchconsole.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_SearchConsole()
{
    $plugin = new SearchConsole();
    $plugin->run();
}

run_SearchConsole();

