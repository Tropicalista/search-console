<?php
namespace Tropicalista\SearchConsole;

/**
 * Scripts and Styles Class
 */
class Assets {

    private $encrypted_options;

    function __construct() {

        $this->encrypted_options = new \Tropicalista\SearchConsole\Data\Encrypted_Options();
        if ( is_admin() ) {
            add_action( 'admin_enqueue_scripts', [ $this, 'register' ], 5 );
        } else {
            add_action( 'wp_enqueue_scripts', [ $this, 'register' ], 5 );
        }
    }

    /**
     * Register our app scripts and styles
     *
     * @return void
     */
    public function register() {
        $this->register_scripts( $this->get_scripts() );
        $this->register_styles( $this->get_styles() );
    }

    /**
     * Register scripts
     *
     * @param  array $scripts
     *
     * @return void
     */
    private function register_scripts( $scripts ) {
        foreach ( $scripts as $handle => $script ) {
            $deps      = isset( $script['deps'] ) ? $script['deps'] : false;
            $in_footer = isset( $script['in_footer'] ) ? $script['in_footer'] : false;
            $version   = isset( $script['version'] ) ? $script['version'] : SEARCHCONSOLE_VERSION;

            wp_register_script( $handle, $script['src'], $deps, $version, $in_footer );
        }
    }

    /**
     * Register styles
     *
     * @param  array $styles
     *
     * @return void
     */
    public function register_styles( $styles ) {
        foreach ( $styles as $handle => $style ) {
            $deps = isset( $style['deps'] ) ? $style['deps'] : false;

            wp_register_style( $handle, $style['src'], $deps, SEARCHCONSOLE_VERSION );
        }
    }

    /**
     * Get all registered scripts
     *
     * @return array
     */
    public function get_scripts() {

        $scripts = [
            'searchconsole-vendor' => [
                'src'       => SEARCHCONSOLE_ASSETS . '/js/chunk-vendors.js',
                'version'   => filemtime( SEARCHCONSOLE_PATH . '/assets/js/chunk-vendors.js' ),
                'in_footer' => true
            ],
            'searchconsole-admin' => [
                'src'       => SEARCHCONSOLE_ASSETS . '/js/app.js',
                'deps'      => [ 'jquery', 'searchconsole-vendor' ],
                'version'   => filemtime( SEARCHCONSOLE_PATH . '/assets/js/app.js' ),
                'in_footer' => true
            ],
            'searchconsole-widget' => [
                'src'       => SEARCHCONSOLE_ASSETS . '/js/gsc_widget.js',
                'deps'      => [ 'jquery' ],
                'version'   => filemtime( SEARCHCONSOLE_PATH . '/assets/js/gsc_widget.js' ),
                'in_footer' => true
            ]
        ];

        return $scripts;
    }

    /**
     * Get registered styles
     *
     * @return array
     */
    public function get_styles() {

        $styles = [
            'searchconsole-style' => [
                'src' =>  SEARCHCONSOLE_ASSETS . '/css/app.css'
            ],
            'searchconsole-admin' => [
                'src' =>  SEARCHCONSOLE_ASSETS . '/css/chunk-vendors.css'
            ],
            'searchconsole-admin-font' => [
                'src' =>  SEARCHCONSOLE_ASSETS . '/css/fontello.css'
            ]
        ];

        return $styles;
    }

}
