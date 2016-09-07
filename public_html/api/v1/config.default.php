<?php

final class Config {

	static $debug;
	static $root;
	static $rootApi;

	static $googleApiKey;
	static $googleAppName;

	public function __construct() {
		self::$debug = true;
		self::$root = realpath(__DIR__ . '/../../../') . '/';
		self::$rootApi = self::$root . 'public_html/api/v1/';

		self::$googleApiKey = '';

		$this->loadUserConfig();
	}

	private function loadUserConfig() {
		$filePath = self::$rootApi . 'config.user.php';

		if (file_exists($filePath)) {
			$userConfig = require $filePath;

			foreach ($userConfig as $name => $value) {
				self::${$name} = $value;
			}
		}
	}

}

new Config();
