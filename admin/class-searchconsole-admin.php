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
class SearchConsole_Admin
{
    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $plugin_name    The ID of this plugin.
     */
    private  $plugin_name ;
    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    private  $version ;
    private  $key ;
    private  $optionsDefault ;
    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string    $plugin_name       The name of this plugin.
     * @param      string    $version    The version of this plugin.
     */
    public function __construct( $plugin_name, $version )
    {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
        $this->key = $this->getKey();
        $this->optionsDefault = $this->getOptions();
        $this->optionsAdvancedDefault = $this->getAdvancedOptions();
    }
    
    public function getKey()
    {
        $options = get_option( $this->plugin_name . '-advanced' );
        if ( isset( $options['oauth'] ) ) {
            return $options['oauth'];
        }
        return [
            'clientId'     => '192245718841-t3c0koqbc835srj1i4ss8ve778k9risj.apps.googleusercontent.com',
            'clientSecret' => 'wgje7OszHWz_kZQMjlCpvcL7',
            'redirectUri'  => 'urn:ietf:wg:oauth:2.0:oob',
        ];
    }
    
    public function getOptions()
    {
        return [
            'site'  => '',
            'token' => null,
        ];
    }
    
    public function getAdvancedOptions()
    {
        return [
            'meta'         => '',
            'oauth'        => $this->key,
            'custom_oauth' => false,
        ];
    }
    
    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles__premium_only() {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in DashyLite_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The DashyLite_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_style( $this->plugin_name . '-sema', 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.7/semantic.min.css', array(), $this->version, 'all' );
        wp_enqueue_style( $this->plugin_name . '-date', '//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css', array(), $this->version, 'all' );
        wp_enqueue_style( $this->plugin_name . '-vendors', plugin_dir_url( __FILE__ ) . 'css/chunk-vendors.css', array(), $this->version, 'all' );
        wp_enqueue_style( $this->plugin_name . '-app', plugin_dir_url( __FILE__ ) . 'css/app.css', array(), $this->version, 'all' );
        wp_enqueue_style( $this->plugin_name . '-custom', plugin_dir_url( __FILE__ ) . 'css/searchconsole.css', array(), $this->version, 'all' );

    }

    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts__premium_only() {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in DashyLite_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The DashyLite_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_script( $this->plugin_name . '-vendors', plugin_dir_url( __FILE__ ) . 'js/chunk-vendors.js', array('jquery'), $this->version, true );
        wp_enqueue_script( $this->plugin_name . '-app', plugin_dir_url( __FILE__ ) . 'js/app.js', array(), $this->version, true );

    }
    
    public function enqueue_scripts() {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in DashyLite_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The DashyLite_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_script( $this->plugin_name . '-app', plugin_dir_url( __FILE__ ) . 'js/free.js', array(), $this->version, true );

    }
    
    public function enqueue_styles() {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in DashyLite_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The DashyLite_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_style( $this->plugin_name . '-app', plugin_dir_url( __FILE__ ) . 'css/searchconsole.css', array(), $this->version, 'all' );
        wp_enqueue_style( $this->plugin_name . '-free', plugin_dir_url( __FILE__ ) . 'css/free.css', array(), $this->version, 'all' );

    }
    
    function common_styles(){
        wp_enqueue_script( $this->plugin_name . '-app', 'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.6/js/standalone/selectize.min.js' );
        wp_register_style('select2', 'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.6/css/selectize.min.css');
        wp_enqueue_style( 'select2' );        
    }

    /**
     * Register the administration menu for this plugin into the WordPress Dashboard menu.
     *
     * @since    1.0.0
     */
    public function add_plugin_admin_menu()
    {
        $my_page = add_menu_page(
            'Search Console',
            'Search Console',
            'manage_options',
            $this->plugin_name,
            array( $this, 'display_plugin_main_page' ),
            'dashicons-chart-bar'
        );
        $settings_page = add_submenu_page(
            $this->plugin_name,
            'Settings',
            'Settings',
            'manage_options',
            $this->plugin_name . '-settings',
            array( $this, 'display_plugin_setup_page' )
        );
        //if ( sc_fs()->can_use_premium_code() ) {
            add_action( 'load-' . $my_page, array( $this, 'enqueue_scripts__premium_only' ) );
            add_action( 'load-' . $my_page, array( $this, 'enqueue_styles__premium_only' ) );
            add_action( 'load-' . $settings_page, array( $this, 'enqueue_styles__premium_only' ) );
            add_action( 'load-' . $settings_page, array( $this, 'common_styles' ) );
        /*}else{
            add_action( 'load-' . $my_page, array( $this, 'enqueue_scripts' ) );
            add_action( 'load-' . $my_page, array( $this, 'enqueue_styles' ) );
            add_action( 'load-' . $settings_page, array( $this, 'common_styles' ) );
        }*/
        add_action('admin_head', array($this, 'add_meta_tag_in_head'));
    }
    
    /**
     * Add settings action link to the plugins page.
     *
     * @since  1.0.0
     */
    public function add_action_links( $links )
    {
        /*
         *  Documentation : https://codex.wordpress.org/Plugin_API/Filter_Reference/plugin_action_links_(plugin_file_name)
         */
        $settings_link = array( '<a href="' . admin_url( 'admin.php?page=' . $this->plugin_name ) . '-settings">' . __( 'Settings', 'searchconsole' ) . '</a>' );
        return array_merge( $settings_link, $links );
    }
    
    /**
     * Render the main page for plugin
     *
     * @since  1.0.0
     */
    public function display_plugin_main_page()
    {
        include_once 'partials/searchconsole-display.php';
    }
    
    /**
     * Render the options page for plugin
     *
     * @since  1.0.0
     */
    public function display_plugin_setup_page()
    {
        include_once 'partials/searchconsole-admin-display.php';
    }
    
    function add_settings()
    {
        // First, we register a section. This is necessary since all future options must belong to a
        add_settings_section(
            $this->plugin_name . '-general',
            // ID used to identify this section and with which to register options
            '',
            // Title to be displayed on the administration page
            '',
            // Callback used to render the description of the section
            $this->plugin_name . '-general'
        );
        // Next, we'll introduce the fields for toggling the visibility of content elements.
        add_settings_field(
            'show_settings',
            // ID used to identify the field throughout the theme
            esc_html__( 'Choose a site', 'searchconsole' ),
            // The label to the left of the option interface element
            array( $this, 'show_settings' ),
            // The name of the function responsible for rendering the option interface
            $this->plugin_name . '-general',
            // The page on which this option will be displayed
            $this->plugin_name . '-general'
        );
        // Finally, we register the fields with WordPress
        register_setting( $this->plugin_name . '-general', $this->plugin_name . '-general', array( $this, 'validate_general' ) );
    }
    
    function add_advanced_settings()
    {
        add_settings_section(
            $this->plugin_name . '-advanced',
            // ID used to identify this section and with which to register options
            '',
            // Title to be displayed on the administration page
            '',
            // Callback used to render the description of the section
            $this->plugin_name . '-advanced'
        );
        add_settings_field(
            'custom_token',
            '',
            array( $this, 'custom_token' ),
            // The name of the function responsible for rendering the option interface
            $this->plugin_name . '-advanced',
            $this->plugin_name . '-advanced',
            array( 'Activate this setting to display the content.' )
        );
        // Finally, we register the fields with WordPress
        register_setting( $this->plugin_name . '-advanced', $this->plugin_name . '-advanced', array( $this, 'validate_advanced' ) );
    }
    
    function show_settings()
    {
        include_once 'partials/searchconsole-settings.php';
    }
    
    function custom_token()
    {
        include_once 'partials/searchconsole-advanced.php';
    }
    
    /**
     *
     * The widget
     *
     **/
    public function my_custom_dashboard_widgets()
    {
        global  $wp_meta_boxes ;
        wp_add_dashboard_widget( 'custom_help_widget', 'Search Console', array( $this, 'custom_dashboard_gsc' ) );
    }
    
    function custom_dashboard_gsc()
    {
        include_once 'partials/searchconsole-widget.php';
    }

    function gsc_metabox()
    {
        include_once 'partials/searchconsole-metabox.php';
    }
    
    function validate_general( $input )
    {
        $provider = new League\OAuth2\Client\Provider\Google( $this->key );
        $valid = array();
        $options = get_option( $this->plugin_name . '-general', $this->optionsDefault );
        $token = $options['token'];
        $valid['site'] = '';
        if ( isset( $input['code'] ) ) {
            // Optional: Now you have a token you can look up a users profile data
            try {
                // Try to get an access token (using the authorization code grant)
                $token = $provider->getAccessToken( 'authorization_code', [
                    'code' => $input['code'],
                ] );
                // Use this to interact with an API on the users behalf
                $token = [
                    'access_token'  => $token->getToken(),
                    'expires'       => $token->getExpires(),
                    'refresh_token' => $token->getRefreshToken(),
                ];
            } catch ( Exception $e ) {
                add_settings_error(
                    'requiredTextFieldEmpty',
                    'empty',
                    'Invalid code',
                    'error'
                );
            }
        }
        $valid['token'] = $token;
        if ( isset( $input['site'] ) ) {
            $valid['site'] = $input['site'];
        }
        //Cleanup
        return $valid;
    }
    
    function validate_advanced( $input )
    {
        $valid = array();
        $options = get_option( $this->plugin_name . '-advanced', $this->optionsAdvancedDefault );
        $valid['meta'] = ( isset( $input['meta'] ) ? $input['meta'] : $options['meta'] );
        
        if ( isset( $input['custom_oauth'] ) ) {
            $valid['custom_oauth'] = ( $input['custom_oauth'] == 'on' ? true : false );
        } else {
            $valid['custom_oauth'] = false;
        }
        
        if ( $valid['custom_oauth'] ) {
            $valid['oauth'] = ( isset( $input['oauth'] ) ? $input['oauth'] : $options['oauth'] );
        }
        //Cleanup
        return $valid;
    }
    
    function reset_settings()
    {
        // Finally, we register the fields with WordPress
        register_setting( $this->plugin_name . 'reset', $this->plugin_name . 'reset', array( $this, 'reset_all' ) );
    }
    
    function reset_all( $input )
    {
        
        if ( isset( $input['reset'] ) ) {
            delete_option( $this->plugin_name . '-general' );
            delete_option( $this->plugin_name . '-advanced' );
            $options = [
                'site'  => '',
                'token' => null,
            ];
            update_option( $this->plugin_name . '-general', $options );
        }
        
        return true;
    }
    
    function getOptionsAndRefreshToken()
    {
        $options = get_option( $this->plugin_name . '-general', $this->optionsDefault );
        $provider = new League\OAuth2\Client\Provider\Google( $this->key );
        
        if ( !empty($options['token']) ) {
            $token = new League\OAuth2\Client\Token\AccessToken( $options['token'] );
            
            if ( $token->hasExpired() ) {
                $grant = new League\OAuth2\Client\Grant\RefreshToken();
                $token = $provider->getAccessToken( $grant, $options['token'] );
            }
            
            $token = $token->jsonSerialize();
            $token['refresh_token'] = $options['token']['refresh_token'];
            $options['token'] = $token;
        }
        
        update_option( $this->plugin_name . '-general', $options );
        return $options;
    }

    /**
     * Register meta box(es).
     */
    function gsc_register_meta_boxes() {
        add_meta_box( 'meta-box-id', __( 'Search Console', 'searchconsole' ), array($this, 'gsc_metabox'), array('post','page') );
    }

    function gsc_widget_js( $hook ) {
        $screen = get_current_screen();
        $checkVars = array('post', 'dashboard', 'page');

        if ( in_array($screen->id, $checkVars) ) {
            wp_enqueue_script( 'gsc_script-loader', 'https://www.gstatic.com/charts/loader.js' );
            wp_enqueue_script( 'gsc_script-moment', 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js' );
            wp_enqueue_script( 'gsc_script-gapi', 'https://apis.google.com/js/api.js' );
            wp_enqueue_script( 'gsc_script-app', plugin_dir_url(__FILE__) . 'js/free.js' );
        }
    }

    function gsc_adminbar_menu( $hook ) {
        
        // Don't display notification in admin bar if it's disabled or the current user isn't an administrator
        if( !is_super_admin() || !is_admin_bar_showing() || is_admin() )
        {
            return;
        }
        global $wp_admin_bar;

        $menu_id = 'gsc';
        $menu = '<span>'.__('Clicks').'</span>: <span id="gsc-clicks"></span> | ';
        $menu .= '<span>'.__('Impressons').'</span>: <span id="gsc-impressions"></span> | ';
        $menu .= '<span>'.__('Position').'</span>: <span id="gsc-position"></span> | ';
        $menu .= '<span>'.__('CTR').'</span>: <span id="gsc-ctr"></span> | ';
        $wp_admin_bar->add_menu(
            array(
                'id' => $menu_id, 
                'title' => $menu
            )
        );

    }

    function gsc_adminbar_js( $hook ) {
        
        // Don't display notification in admin bar if it's disabled or the current user isn't an administrator
        if( !is_super_admin() || !is_admin_bar_showing() || is_admin() )
        {
            return;
        }
        wp_enqueue_script( 'gsc_script-gapi', 'https://apis.google.com/js/api.js', array(), null, true );
        wp_enqueue_script( 'gsc_script-app', plugin_dir_url(__FILE__) . 'js/gsc-table.js', array(), null, true );


    }

    function gsc_adminbar_token( $hook ) {
      
        // Don't display notification in admin bar if it's disabled or the current user isn't an administrator
        if( !is_super_admin() || !is_admin_bar_showing() || is_admin() )
        {
            return;
        }

        $this->showToken(); 

    }

    function gsc_table_token( $hook ) {
      
        $screen = get_current_screen()->id;
        // Don't display notification in admin bar if it's disabled or the current user isn't an administrator
        if( $screen == 'edit-post' || $screen == 'edit-page' )
        {
            $this->showToken(); 
        }

    }

    function showToken(){
        $options = $this->getOptionsAndRefreshToken();
        $site = $options['site'];

        ?>
        <script type="text/javascript">

            var access_token = "<?php echo($options['token']['access_token']) ?>";
            var site = "<?php echo($site) ?>";

        </script>
        
        <?php 

    }

    function plugin_links($links, $file) {
        
        if ( strpos( $file, 'searchconsole.php' ) !== false ) {
            $rate_href  = 'https://wordpress.org/support/plugin/edd-download-images-slider/reviews/?rate=5#new-post';
            $rate_title = esc_attr__('Click here to rate and review this plugin on WordPress.org', 'edd-dis');
            $rate_text  = esc_html__('Rate this plugin', 'edd-dis') .'&nbsp;&raquo;';
            
            $links[]    = '<a target="_blank" rel="noopener noreferrer" href="'. $rate_href .'" title="'. $rate_title .'">'. $rate_text .'</a>';
        }
        return $links;
        
    }

    public function add_meta_tag_in_head() {
        echo '<meta name="search-console-baseurl" content="' . get_rest_url() . $this->plugin_name . '">';
    }

}