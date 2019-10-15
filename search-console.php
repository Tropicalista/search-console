<?php
/**
 * @wordpress-plugin
 * Plugin Name:       Search Console
 * Plugin URI:        https://www.tropicalseo.it/
 * Description:       This plugin displays your Google Search Console Analytics data inside your WordPress.
 * Version:           2.0.3
 * Author:            Tropicalista
 * Author URI:        https://www.francescopepe.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       searchconsole
 * Domain Path:       /languages
 */

// don't call the file directly
if ( !defined( 'ABSPATH' ) ) exit;

define( 'SEARCHCONSOLE_FILE', __FILE__ );
define( 'SEARCHCONSOLE_PATH', dirname( SEARCHCONSOLE_FILE ) );

if ( function_exists( 'sc_fs' ) ) {
    sc_fs()->set_basename( true, __FILE__ );
} else {

    if ( ! function_exists( 'sc_fs' ) ) {
        // Create a helper function for easy SDK access.
        function sc_fs() {
            global $sc_fs;

            if ( ! isset( $sc_fs ) ) {
                // Include Freemius SDK.
                require_once dirname(__FILE__) . '/freemius/start.php';

                $sc_fs = fs_dynamic_init( array(
                    'id'                  => '2646',
                    'slug'                => 'search-console',
                    'type'                => 'plugin',
                    'public_key'          => 'pk_db1716dc2d3fa36474171fd3889f9',
                    'is_premium'          => false,
                    'has_addons'          => false,
                    'has_paid_plans'      => false,
                    'menu'                => array(
                        'slug'           => 'search-console',
                        'contact'        => false,
                        'support'        => false,
                        'account'        => false,
                    ),
                ) );
            }

            return $sc_fs;
        }

        // Init Freemius.
        sc_fs();
        // Signal that SDK was initiated.
        do_action( 'sc_fs_loaded' );
    }

    require_once plugin_dir_path( __FILE__ ) . 'includes/loader.php';

    $dashylite = \Tropicalista\SearchConsole\Plugin::init();
    
}

?>