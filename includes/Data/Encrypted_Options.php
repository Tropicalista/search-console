<?php

namespace Tropicalista\SearchConsole\Data;

final class Encrypted_Options {

	private $encryption;
	private $options;

	public function __construct() {
		$this->encryption = new \Tropicalista\SearchConsole\Data\Data_Encryption();
		$this->options    = new \Tropicalista\SearchConsole\Data\Options();
	}

	public function get( $option ) {
		$raw_value = $this->options->get( $option );
		if ( ! $raw_value ) {
			return false;
		}
		$data = $this->encryption->decrypt( $raw_value );
		return maybe_unserialize( $data );
	}

	public function set( $option, $value ) {
		if ( ! is_scalar( $value ) ) {
			$value = maybe_serialize( $value );
		}
		$raw_value = $this->encryption->encrypt( $value );
		if ( ! $raw_value ) {
			return false;
		}
		return $this->options->set( $option, $raw_value );
	}

	public function delete( $option ) {
		return $this->options->delete( $option );
	}
}