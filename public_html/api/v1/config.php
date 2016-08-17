<?php

error_reporting(E_ALL);
ini_set("display_errors", true);

require '../../../vendor/autoload.php';

spl_autoload_register(function ($class) {
	$file = __DIR__ . '/' . str_replace('\\', '/', $class) . '.php';

	if (file_exists($file)) {
		require $file;
	}
});

define('DEBUG', true);