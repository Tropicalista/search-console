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
 * Version:           1.0.6
 * Author:            Tropicalista
 * Author URI:		  https://tropicalseo.net
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       searchconsole
 * Domain Path:       /languages
 * @fs_premium_only /admin/js/app.js, /admin/js/chunk-vendors.js
 */
// If this file is called directly, abort.
if ( !defined( 'WPINC' ) ) {
    die;
}

if ( !function_exists( 'sc_fs' ) ) {
    /**
     * Currently plugin version.
     * Start at version 1.0.0 and use SemVer - https://semver.org
     * Rename this for your plugin and update it as you release new versions.
     */
    define( 'SearchConsole_VERSION', '1.0.6' );
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
    // Create a helper function for easy SDK access.
    function sc_fs()
    {
        global  $sc_fs ;
        
        if ( !isset( $sc_fs ) ) {
            // Include Freemius SDK.
            require_once dirname( __FILE__ ) . '/freemius/start.php';
            $sc_fs = fs_dynamic_init( array(
                'id'             => '2646',
                'slug'           => 'search-console',
                'type'           => 'plugin',
                'public_key'     => 'pk_db1716dc2d3fa36474171fd3889f9',
                'is_premium'     => false,
                'has_addons'     => false,
                'has_paid_plans' => true,
                'trial'          => array(
                'days'               => 14,
                'is_require_payment' => false,
            ),
                'menu'           => array(
                'slug' => 'search-console',
            ),
                'is_live'        => true,
            ) );
        }
        
        return $sc_fs;
    }
    
    // Init Freemius.
    sc_fs();
    // Signal that SDK was initiated.
    do_action( 'sc_fs_loaded' );
    function sc_fs_settings_url()
    {
        return admin_url( 'admin.php?page=search-console-settings' );
    }
    
    sc_fs()->add_filter( 'connect_url', 'sc_fs_settings_url' );
    sc_fs()->add_filter( 'after_skip_url', 'sc_fs_settings_url' );
    sc_fs()->add_filter( 'after_connect_url', 'sc_fs_settings_url' );
    sc_fs()->add_filter( 'after_pending_connect_url', 'sc_fs_settings_url' );
    sc_fs()->add_action( 'after_uninstall', 'sc_fs_uninstall_cleanup' );
}
