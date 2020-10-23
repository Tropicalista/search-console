<?php
namespace Tropicalista\SearchConsole\Data;

/**
 * Admin Pages Handler
 */
class Settings {

    const OPTION = 'searchconsole_settings';
    /**
     * Holds various class instances
     *
     * @var array
     */
    protected $options;


    public function __construct() {
        $this->options = get_option( self::OPTION );
    }

}
