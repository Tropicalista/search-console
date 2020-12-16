<?php

namespace Tropicalista\SearchConsole;

// Don't redefine the functions if included multiple times.
if (!\function_exists('Tropicalista\\SearchConsole\\GuzzleHttp\\uri_template')) {
    require __DIR__ . '/functions.php';
}
