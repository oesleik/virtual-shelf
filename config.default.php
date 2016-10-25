<?php

/* ===== DEFAULT ===== */

Config::set("production", true);
Config::set("debug", false);
Config::set("root", realpath(__DIR__) . "/");
Config::set("rootApi", Config::get("root") . "public_html/api/v1/");

Config::set("googleAppName", "");
Config::set("googleApiKey", "");

Config::set("proxy", false);
Config::set("proxyAuth", false);

Config::set("db_host", "localhost");
Config::set("db_database", "virtual_shelf");
Config::set("db_username", "root");
Config::set("db_password", "");


/* ===== USER ===== */
Config::loadUserConfig();


/* ===== OTHERS ===== */
if (Config::get("debug")) {
	error_reporting(E_ALL);
	ini_set("display_errors", true);
}

require Config::get("root") . "vendor/autoload.php";
require Config::get("rootApi") . "autoload.php";
require Config::get("rootApi") . "connection.php";