<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://tropicalseo.net
 * @since      1.0.0
 *
 * @package    SearchConsole
 * @subpackage SearchConsole/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    SearchConsole
 * @subpackage SearchConsole/admin
 * @author     Tropicalista <tropicalseotool@gmail.com>>
 */
class SearchConsole_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;
	
	private $key;
	private $optionsDefault;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
		$this->key = $this->getKey();
		$this->optionsDefault = $this->getOptions();
		$this->optionsAdvancedDefault = $this->getAdvancedOptions();
	}

	public function getKey(){

		$options = get_option($this->plugin_name . '-advanced');
		if(isset($options['oauth'])){
			return $options['oauth'];
		}

		return [
			'clientId'     => '192245718841-t3c0koqbc835srj1i4ss8ve778k9risj.apps.googleusercontent.com',
			'clientSecret' => 'wgje7OszHWz_kZQMjlCpvcL7',
			'redirectUri'  => 'urn:ietf:wg:oauth:2.0:oob'
		];

	}

	public function getOptions(){

		return [
	        'site' => '',
	        'token' => null
	    ];			

	}

	public function getAdvancedOptions(){

		return [
	        'meta' => '',
	        'oauth' => $this->key,
	        'custom_oauth' => false
	    ];			

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {
		wp_enqueue_style( $this->plugin_name . '-custom', plugin_dir_url( __FILE__ ) . 'css/searchconsole.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

	}

	/**
	 * Register the administration menu for this plugin into the WordPress Dashboard menu.
	 *
	 * @since    1.0.0
	 */
	public function add_plugin_admin_menu() {

		$my_page = add_menu_page( 'Search Console', 'Search Console', 'manage_options', $this->plugin_name, array($this, 'display_plugin_main_page'), 'dashicons-chart-bar'  );
		$settings_page = add_submenu_page( $this->plugin_name, 'Settings', 'Edit settings', 'manage_options', $this->plugin_name . '-settings', array($this, 'display_plugin_setup_page') );
		add_action( 'load-' . $my_page, array($this, 'enqueue_scripts') );
		add_action( 'load-' . $my_page, array($this, 'enqueue_styles') );
		add_action( 'load-' . $settings_page, array($this, 'enqueue_styles') );
	}

	/**
	* Add settings action link to the plugins page.
	*
	* @since  1.0.0
	*/
	public function add_action_links( $links ) {
	    /*
	    *  Documentation : https://codex.wordpress.org/Plugin_API/Filter_Reference/plugin_action_links_(plugin_file_name)
	    */
	   $settings_link = array(
	    '<a href="' . admin_url( 'admin.php?page=' . $this->plugin_name ) . 'settings">' . __('Settings', $this->plugin_name) . '</a>',
	   );
	   return array_merge(  $settings_link, $links );

	}

	/**
	 * Render the main page for plugin
	 *
	 * @since  1.0.0
	 */
	public function display_plugin_main_page() {
		include_once 'partials/searchconsole-display.php';
	}

	/**
	 * Render the options page for plugin
	 *
	 * @since  1.0.0
	 */
	public function display_plugin_setup_page() {
		include_once 'partials/searchconsole-admin-display.php';
	}

	function add_settings() {

	    // First, we register a section. This is necessary since all future options must belong to a 
	    add_settings_section(
	        $this->plugin_name . '-general',         // ID used to identify this section and with which to register options
	        '',                  // Title to be displayed on the administration page
	        '', // Callback used to render the description of the section
	        $this->plugin_name . '-general'     // Page on which to add this section of options
	    );
	     
	    // Next, we'll introduce the fields for toggling the visibility of content elements.
	    add_settings_field( 
	        'show_settings',                      // ID used to identify the field throughout the theme
	        esc_html__( 'Choose a site', 'searchconsole' ),                           // The label to the left of the option interface element
	        array($this, 'show_settings'),	   // The name of the function responsible for rendering the option interface
	        $this->plugin_name . '-general',    // The page on which this option will be displayed
	        $this->plugin_name . '-general'    // The name of the section to which this field belongs
	    );
	     
	    // Finally, we register the fields with WordPress
	    register_setting(
	        $this->plugin_name . '-general',
	        $this->plugin_name . '-general',
	        array($this, 'validate_general')
	    );
	 	     
	}

	function add_advanced_settings() {
     
	    add_settings_section(
	        $this->plugin_name . '-advanced',         // ID used to identify this section and with which to register options
	        '',                  // Title to be displayed on the administration page
	        '', // Callback used to render the description of the section
	        $this->plugin_name . '-advanced'     // Page on which to add this section of options
	    );
	     
	    add_settings_field( 
	        'custom_token',                     
	        '',              
	        array($this, 'custom_token'),   // The name of the function responsible for rendering the option interface
	        $this->plugin_name . '-advanced',                    
	        $this->plugin_name . '-advanced',         
	        array(                              
	            'Activate this setting to display the content.'
	        )
	    );
	     
	    // Finally, we register the fields with WordPress
	    register_setting(
	        $this->plugin_name . '-advanced',
	        $this->plugin_name . '-advanced',
	        array($this, 'validate_advanced')
	    );
	 	     
	}

	function show_settings(){
		include_once 'partials/searchconsole-settings.php';
	}

	function custom_token(){
		include_once 'partials/searchconsole-advanced.php';
	}

	/**
	*
	* Store the settings
	*
	**/
	public function frontendHeader() 
	{
		if(is_front_page()){
			$options = get_option($this->plugin_name . '-advanced');
			echo $options['meta'];	
		}
	}

	/**
	*
	* The widget
	*
	**/
	public function my_custom_dashboard_widgets() 
	{
		global $wp_meta_boxes;
		 
		wp_add_dashboard_widget('custom_help_widget', 'Search Console', array($this,'custom_dashboard_help'));

	}
 
	function custom_dashboard_help() {
		include_once 'partials/searchconsole-display.php';
	}

	function validate_general($input){
		$provider = new League\OAuth2\Client\Provider\Google($this->key);
	    $valid = array();

		$options = get_option($this->plugin_name . '-general', $this->optionsDefault);
		$token = $options['token'];
	    $valid['site'] = '';

	    if(isset($input['code'])){
		    // Optional: Now you have a token you can look up a users profile data
		    try {

		        // Try to get an access token (using the authorization code grant)
		        $token = $provider->getAccessToken('authorization_code', [
		            'code' => $input['code']
		        ]);

		        // Use this to interact with an API on the users behalf
		        $token = [
		            'access_token' => $token->getToken(),
		            'expires' => $token->getExpires(),
		            'refresh_token' => $token->getRefreshToken(),
		        ];

		    } catch (Exception $e) {

				add_settings_error(
					'requiredTextFieldEmpty',
					'empty',
					'Invalid code',
					'error'
				);

		    }
	    }
	    $valid['token'] = $token;	    	
	    if(isset($input['site'])){
		    $valid['site'] = $input['site'];
	    }

	    //Cleanup
	    return $valid;

	}

	function validate_advanced($input){

	    $valid = array();

		$options = get_option($this->plugin_name . '-advanced', $this->optionsAdvancedDefault);

	    $valid['meta'] = isset($input['meta']) ? $input['meta'] : $options['meta'];
	    if(isset($input['custom_oauth'])){
		    $valid['custom_oauth'] = $input['custom_oauth'] == 'on' ? true : false;  	
	    }else{
	    	$valid['custom_oauth'] = false;
	    }
		if($valid['custom_oauth']){
		    $valid['oauth'] = isset($input['oauth']) ? $input['oauth'] : $options['oauth'];
	    }

	    //Cleanup
	    return $valid;

	}

	function reset_settings() {

	    // Finally, we register the fields with WordPress
	    register_setting(
	        $this->plugin_name . 'reset',
	        $this->plugin_name . 'reset',
	        array($this, 'reset_all')
	    );
	 	     
	}

	function reset_all($input){
		if (isset($input['reset'])){
		    delete_option($this->plugin_name . '-general');
		    delete_option($this->plugin_name . '-advanced');
		    $options = [
		        'site' => '',
		        'token' => null
		    ];
		    update_option( $this->plugin_name . '-general', $options );	
		}
		return true;
	}

	function getOptionsAndRefreshToken(){
		$options = get_option($this->plugin_name . '-general', $this->optionsDefault);

		$provider = new League\OAuth2\Client\Provider\Google($this->key);

		if(!empty($options['token'])){
		    $token = new League\OAuth2\Client\Token\AccessToken($options['token']);

		    if($token->hasExpired()){
		      $grant = new League\OAuth2\Client\Grant\RefreshToken();
		      $token = $provider->getAccessToken($grant, $options['token']);
		    };
		    $token = $token->jsonSerialize();
		    $token['refresh_token'] = $options['token']['refresh_token'];
			$options['token'] = $token;

		}
		update_option($this->plugin_name . '-general', $options);

		return $options;
	}
}
