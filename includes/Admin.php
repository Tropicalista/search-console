<?php
namespace Tropicalista\SearchConsole;

/**
 * Admin Pages Handler
 */
class Admin {

    protected $encryption;
    protected $options;

    public function __construct() {

        $this->encryption = new \Tropicalista\SearchConsole\Data\Encrypted_Options();  
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );

        add_action( 'admin_enqueue_scripts', [ $this, 'add_table_scripts' ] );
        add_action( 'manage_posts_custom_column',        array( $this, 'gsc_posts_data' ), 10, 2 );
        add_action( 'manage_pages_custom_column',        array( $this, 'gsc_posts_data' ), 10, 2 );
        add_action( 'wp_dashboard_setup', array( $this, 'add_dashboard_widgets' ) );
        
        add_filter( 'manage_posts_columns',              array( $this, 'gsc_posts' ) );
        add_filter( 'manage_pages_columns',              array( $this, 'gsc_posts' ) );
    }

    /**
     * Register our menu page
     *
     * @return void
     */
    public function admin_menu() {
        global $submenu;

        $capability = 'manage_options';
        $slug       = 'search-console';

        $hook = add_menu_page( __( 'Search Console', 'searchconsole' ), __( 'Search Console', 'searchconsole' ), $capability, $slug, [ $this, 'plugin_page' ], 'dashicons-chart-bar' );

        $submenu[ $slug ][] = array( __( 'Search Console', 'searchconsole' ), $capability, 'admin.php?page=' . $slug . '#/' );
        if ( current_user_can( $capability ) ) {
            $submenu[ $slug ][] = array( __( 'Settings', 'searchconsole' ), $capability, 'admin.php?page=' . $slug . '#/settings' );
        }

        add_action( 'load-' . $hook, [ $this, 'init_hooks'] );
    }

    /**
     * Initialize our hooks for the admin page
     *
     * @return void
     */
    public function init_hooks() {
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
        add_filter('update_footer', [ $this, 'remove_footer_admin' ] );
        add_filter('admin_footer_text', [ $this, 'add_rating' ] );
    }

    /**
     * Load scripts and styles for the app
     *
     * @return void
     */
    public function enqueue_scripts() {

        global $wp_scripts;
        foreach( $wp_scripts->queue as $handle ) {
            wp_dequeue_script($handle);
        }
        
        wp_enqueue_style( 'searchconsole-admin' );
        wp_enqueue_style( 'searchconsole-style' );
        wp_enqueue_style( 'searchconsole-admin-font' );
        wp_enqueue_script( 'searchconsole-admin' );
    }

    function add_table_scripts( $hook ) {
        $screen = get_current_screen()->id;
    ?>
      <script type="text/javascript">
              var _nonce = "<?php echo wp_create_nonce( 'wp_rest' ); ?>";
      </script>
    <?php
        if ( $screen == 'edit-post' || $screen == 'edit-page' ) {
            wp_enqueue_script( 'gsc_script-gapi', 'https://apis.google.com/js/api.js' );
            wp_enqueue_script(  'dayjs', 'https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.7.5/dayjs.min.js', array(), null, true );
            wp_enqueue_script(  'table-js', SEARCHCONSOLE_ASSETS . '/js/gsc_table.js', array(), null, true );
        }
    }

    /**
     * Render our admin page
     *
     * @return void
     */
    public function plugin_page() {

    ?>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script src="https://apis.google.com/js/api.js"></script>

    <?php
        echo '<div class="dashy-wrapper"><div id="vue-admin-app"></div></div>';
    }

    /**
     * Adds Search Console column to Posts/Pages list column
     *
     * @param array $defaults An array of column names.
     */
    public function gsc_posts( $defaults ) {
        $defaults['asc_gsc'] = __( 'Search Console', 'searchconsole' );
        return $defaults;
    }

    public function gsc_posts_data( $column_name, $id ) {
        if ( $column_name == 'asc_gsc' ) {
            $post_slug = get_permalink( $id );
            echo '<span class="gsc-url" data-url="' . esc_attr( $post_slug ) . '"></span>';
        }
    }

    public function add_dashboard_widgets() {
        global $wp_meta_boxes;
         
        wp_add_dashboard_widget( 'custom_dashboard_gsc', 'Search Console', array( $this, 'custom_dashboard_gsc' ) );

        wp_enqueue_script( 'google-charts', 'https://www.gstatic.com/charts/loader.js' );
        wp_enqueue_script( 'gsc_script-gapi', 'https://apis.google.com/js/api.js' );
        wp_enqueue_script(  'dayjs', 'https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.7.5/dayjs.min.js', array(), null, true );
        wp_enqueue_script(  'search-console-widget', SEARCHCONSOLE_ASSETS . '/js/gsc_widget.js', array(), null, true );
    }

    function custom_dashboard_gsc()
    {
        ?>
        <script src="https://apis.google.com/js/api.js"></script>
        <div id="search-console-widget">
          <div id="gsc-chart"></div>
          <div>
            report generated by <a href="https://www.tropicalseo.it/?utm_source=search-console-plugin&utm_medium=widget&utm_campaign=promo">TropicalSeo</a>
          </div>

        </div>        
        <?php

    }

    public function remove_footer_admin() {
        echo 'Made with <span class="dashicons dashicons-heart red"></span> by <a href="https://www.francescopepe.com">Tropicalista</a>';
    }

    public function add_rating() {
        echo 'If you like <b>Search Console</b> please add <i class="dashicons dashicons-star-filled star"></i><i class="dashicons dashicons-star-filled star"></i><i class="dashicons dashicons-star-filled star"></i><i class="dashicons dashicons-star-filled star"></i><i class="dashicons dashicons-star-filled star"></i> review on <a href="https://wordpress.org/support/plugin/search-console/reviews/" target="_blank">WordPress.org</a>';
    }

}
