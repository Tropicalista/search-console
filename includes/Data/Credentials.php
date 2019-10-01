<?php

namespace Tropicalista\SearchConsole\Data;


class Credentials {

	const OPTION = 'searchconsole_credentials';

	private $encrypted_options;

	public function __construct() {
		$this->encrypted_options = new \Tropicalista\SearchConsole\Data\Encrypted_Options();
	}

	public function get() {
        $config = get_option("searchconsole_settings");

        if(empty($config['custom_credentials'])){
			return $this->parse_defaults(0);
        }

		return $this->parse_defaults(
			$this->encrypted_options->get( self::OPTION )
		);
	}

	public function set( $data ) {
		if ( ! empty( $data ) && ! empty( $data['clientId'] ) && ! empty( $data['clientSecret'] ) && ! empty( $data['redirectUri'] ) ) {
			return $this->encrypted_options->set( self::OPTION, $data );
		}
	}

	public function has() {
		$credentials = (array) $this->get();
		if ( ! empty( $credentials ) && ! empty( $credentials['clientId'] ) && ! empty( $credentials['clientSecret'] ) && ! empty( $credentials['redirectUri'] ) ) {
			return true;
		}
		return false;
	}

	private function parse_defaults( $data ) {
		$defaults = array(
            'clientId'     => '192245718841-t3c0koqbc835srj1i4ss8ve778k9risj.apps.googleusercontent.com',
            'clientSecret' => 'wgje7OszHWz_kZQMjlCpvcL7',
            'redirectUri'  => 'urn:ietf:wg:oauth:2.0:oob'
		);
		if ( ! is_array( $data ) ) {
			return $defaults;
		}
		return wp_parse_args( $data, $defaults );
	}
}