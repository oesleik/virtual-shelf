<?php

final class Config {

	private static $config = array();

	public static function set($name, $value) {
		self::$config[$name] = $value;
	}

	public static function get($name) {
		return self::$config[$name];
	}

	public static function exists($name) {
		return isset(self::$config[$name]);
	}

	public static function loadUserConfig() {
		$filePath = self::get("root") . "config.user.php";

		if (file_exists($filePath)) {
			$userConfig = require $filePath;
		}
	}

}

require "config.default.php";