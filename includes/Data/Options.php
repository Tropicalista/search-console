<?php

namespace Tropicalista\SearchConsole\Data;

final class Options {

	public function __construct() {
	}

	public function get( $option ) {
		return get_option( $option );
	}

	public function set( $option, $value, $autoload = true ) {
		return update_option( $option, $value, $autoload );
	}

	public function delete( $option ) {
		return delete_option( $option );
	}
}