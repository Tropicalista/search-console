<?php

add_action('wp_head', 'search_console_add_meta' );

function search_console_add_meta() {
	$options = get_option('searchconsole2');
	echo $options['meta'];
}



