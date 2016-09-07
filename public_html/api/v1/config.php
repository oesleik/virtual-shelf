<?php
error_reporting(E_ALL);
ini_set("display_errors", true);

require 'config.default.php';

if (Config::$debug) {
	error_reporting(E_ALL);
	ini_set("display_errors", true);
}

require Config::$root . 'vendor/autoload.php';
require Config::$rootApi . 'autoload.php';
require Config::$rootApi . 'connection.php';