<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://tropicalseo.net
 * @since      1.0.0
 *
 * @package    SearchConsole
 * @subpackage SearchConsole/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    SearchConsole
 * @subpackage SearchConsole/includes
 * @author     Tropicalista <tropicalseotool@gmail.com>>
 */
class SearchConsole {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      SearchConsoleLoader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;
	protected $plugin_dir_url;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {

		if ( defined( 'SearchConsole_VERSION' ) ) {
			$this->version = SearchConsole_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'search-console';

		$this->load_dependencies();
		$this->set_locale();
		$this->set_table();
		$this->set_routes();
		$this->define_admin_hooks();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - SearchConsoleLoader. Orchestrates the hooks of the plugin.
	 * - SearchConsolei18n. Defines internationalization functionality.
	 * - SearchConsoleAdmin. Defines all hooks for the admin area.
	 * - SearchConsolePublic. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-searchconsole-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-searchconsole-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-searchconsole-admin.php';
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-searchconsole-public.php';
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-searchconsole-table.php';
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-searchconsole-rest.php';

		/**
		 * The class responsible for loading Google SDK.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/vendor/autoload.php';

		$this->loader = new SearchConsole_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the SearchConsolei18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new SearchConsole_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	private function set_table() {

		$plugin_table = new SearchConsole_Table();
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_table, 'add_table_scripts', 10, 1 );

	}

	private function set_routes() {

		$plugin_rest = new SearchConsole_Rest( $this->get_plugin_name(), $this->get_version() );
		$this->loader->add_action( 'rest_api_init', $plugin_rest, 'register_routes' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new SearchConsole_Admin( $this->get_plugin_name(), $this->get_version() );
		
		// Add menu item
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'add_plugin_admin_menu' );

		// Save/Update our plugin options
		$this->loader->add_action( 'admin_init', $plugin_admin, 'add_settings' );
		$this->loader->add_action( 'admin_init', $plugin_admin, 'add_advanced_settings' );
		$this->loader->add_action( 'admin_init', $plugin_admin, 'reset_settings' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'gsc_widget_js' );

		$this->loader->add_action( 'wp_head', $plugin_admin, 'gsc_adminbar_token' );
		$this->loader->add_action( 'current_screen', $plugin_admin, 'gsc_table_token' );

		// Add frontend admin bar
		//$this->loader->add_action( 'wp_enqueue_scripts', $plugin_admin, 'gsc_adminbar_js' );
		//$this->loader->add_action( 'admin_bar_menu', $plugin_admin, 'gsc_adminbar_menu', 2000 );

		// Add Settings link to the plugin
		$plugin_basename = plugin_basename( plugin_dir_path( __DIR__ ) . 'searchconsole.php' );
		$this->loader->add_filter( 'plugin_action_links_' . $plugin_basename, $plugin_admin, 'add_action_links' );
		$this->loader->add_filter( 'plugin_row_meta', $plugin_admin, 'plugin_links', 10, 2 );

		// add widget to dashboard
		$this->loader->add_action('wp_dashboard_setup', $plugin_admin, 'my_custom_dashboard_widgets');

		// Add meta box
		$this->loader->add_action('add_meta_boxes', $plugin_admin, 'gsc_register_meta_boxes');

	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new SearchConsole_Public( $this->get_plugin_name(), $this->get_version() );
		// Add metatag to frontend
		$this->loader->add_action('wp_head', $plugin_public, 'frontendHeader');

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );

	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    SearchConsoleLoader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
