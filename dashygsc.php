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
 * @package           DashyGsc
 *
 * @wordpress-plugin
 * Plugin Name:       Search Console
 * Plugin URI:        https://tropicalseo.net/
 * Description:       This plugin displays your Google Search Console Analytics data inside your WordPress.
 * Version:           1.0.0
 * Author:            Sticchio
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       dashygsc
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'DASHYGSC_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-dashygsc-activator.php
 */
function activate_DashyGsc() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-dashygsc-activator.php';
	DashyGsc_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-dashygsc-deactivator.php
 */
function deactivate_DashyGsc() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-dashygsc-deactivator.php';
	DashyGsc_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_DashyGsc' );
register_deactivation_hook( __FILE__, 'deactivate_DashyGsc' );
register_uninstall_hook('uninstall.php', 'dashy_wmt_uninstall');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-dashygsc.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_DashyGsc() {

	$plugin = new DashyGsc();
	$plugin->run();

}
run_DashyGsc();
