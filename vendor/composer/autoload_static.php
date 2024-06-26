<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit1e8350b80f1e75756cd30b10a0cfd18b
{
    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'Appsero\\' => 8,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Appsero\\' => 
        array (
            0 => __DIR__ . '/..' . '/appsero/client/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'Search_Console\\Api' => __DIR__ . '/../..' . '/includes/Api.php',
        'Search_Console\\Encryption' => __DIR__ . '/../..' . '/includes/Encryption.php',
        'Search_Console\\Rest\\Token' => __DIR__ . '/../..' . '/includes/Rest/Token.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit1e8350b80f1e75756cd30b10a0cfd18b::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit1e8350b80f1e75756cd30b10a0cfd18b::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit1e8350b80f1e75756cd30b10a0cfd18b::$classMap;

        }, null, ClassLoader::class);
    }
}
