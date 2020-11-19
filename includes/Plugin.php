<?php
namespace Tropicalista\SearchConsole;

/**
 * Plugin class
 *
 * @class Plugin The class that holds the entire Plugin plugin
 */
final class Plugin {

    /**
     * Plugin version
     *
     * @var string
     */
    public $version = SEARCHCONSOLE_VERSION;

    /**
     * Holds various class instances
     *
     * @var array
     */
    private $container = array();

    /**
     * Constructor for the Plugin class
     *
     * Sets up all the appropriate hooks and actions
     * within our plugin.
     */
    public function __construct() {

        $this->define_constants();

        register_activation_hook( __FILE__, array( $this, 'activate' ) );
        register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );

        add_action( 'plugins_loaded', array( $this, 'init_plugin' ) );
    }

    /**
     * Initializes the Plugin() class
     *
     * Checks for an existing Plugin() instance
     * and if it doesn't find one, creates it.
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new Plugin();
        }

        return $instance;
    }

    /**
     * Magic getter to bypass referencing plugin.
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __get( $prop ) {
        if ( array_key_exists( $prop, $this->container ) ) {
            return $this->container[ $prop ];
        }

        return $this->{$prop};
    }

    /**
     * Magic isset to bypass referencing plugin.
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __isset( $prop ) {
        return isset( $this->{$prop} ) || isset( $this->container[ $prop ] );
    }

    /**
     * Define the constants
     *
     * @return void
     */
    public function define_constants() {
        define( 'SEARCHCONSOLE_INCLUDES', SEARCHCONSOLE_PATH . '/includes' );
        define( 'SEARCHCONSOLE_URL', plugins_url( '', SEARCHCONSOLE_FILE ) );
        define( 'SEARCHCONSOLE_ASSETS', SEARCHCONSOLE_URL . '/assets' );
    }

    /**
     * Load the plugin after all plugis are loaded
     *
     * @return void
     */
    public function init_plugin() {
        $this->load_dependencies();
        $this->init_hooks();
    }

    /**
     * Placeholder for activation function
     *
     * Nothing being called here yet.
     */
    public function activate() {

        $installed = get_option( 'searchconsole_installed' );

        if ( ! $installed ) {
            update_option( 'searchconsole_installed', time() );
            update_option( 'searchconsole_token', NULL );
            update_option( 'searchconsole_api_key', NULL );
            update_option( 'searchconsole_credentials', NULL );
            update_option( 'searchconsole_settings', NULL );

        }

        update_option( 'searchconsole_version', SEARCHCONSOLE_VERSION );
    }

    /**
     * Placeholder for deactivation function
     *
     * Nothing being called here yet.
     */
    public function deactivate() {

    }

    public function uninstall() {
        delete_option( 'searchconsole_installed' );
        delete_option( 'searchconsole_token' );
        delete_option( 'searchconsole_api_key' );
        delete_option( 'searchconsole_credentials' );
        delete_option( 'searchconsole_settings' );
        delete_option( 'searchconsole_widgets' );
        delete_option( 'searchconsole_custom_widgets' );
         
    }

    /**
     * Initialize the hooks
     *
     * @return void
     */
    public function init_hooks() {

        add_action( 'init', array( $this, 'init_classes' ) );
        add_action( 'rest_api_init', array( $this, 'init_rest' ) );

        // Localize our plugin
        add_action( 'init', array( $this, 'localization_setup' ) );
    }

    /**
     * Instantiate the required classes
     *
     * @return void
     */
    public function init_classes() {

        if ( $this->is_request( 'admin' ) ) {
            $this->container['admin'] = new \Tropicalista\SearchConsole\Admin();
        }

        if ( $this->is_request( 'frontend' ) ) {
            $this->container['frontend'] = new \Tropicalista\SearchConsole\Frontend();
        }

        if ( $this->is_request( 'ajax' ) ) {
            // $this->container['ajax'] =  new \Tropicalista\SearchConsole\Ajax();
        }

        if ( $this->is_request( 'rest' ) ) {
            $this->container['rest'] = new \Tropicalista\SearchConsole\REST_API();
        }

        $this->container['assets'] = new \Tropicalista\SearchConsole\Assets();
    }

    /**
     * Instantiate the required classes
     *
     * @return void
     */
    public function init_rest() {

        $this->container['rest'] = new \Tropicalista\SearchConsole\REST_API();

    }

    /**
     * Initialize plugin for localization
     *
     * @uses load_plugin_textdomain()
     */
    public function localization_setup() {
        load_plugin_textdomain( 'search-console', false, dirname( plugin_basename( SEARCHCONSOLE_FILE ) ) . '/languages/' );
    }

    private function load_dependencies() {
        // Autoload vendor files.
        require_once SEARCHCONSOLE_PATH . '/vendor/autoload.php';

    }

    /**
     * What type of request is this?
     *
     * @param  string $type admin, ajax, cron or frontend.
     *
     * @return bool
     */
    private function is_request( $type ) {
        switch ( $type ) {
            case 'admin' :
                return is_admin();

            case 'ajax' :
                return defined( 'DOING_AJAX' );

            case 'rest' :
                return defined('REST_REQUEST');

            case 'cron' :
                return defined( 'DOING_CRON' );

            case 'frontend' :
                return ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' );
        }
    }

} // Plugin