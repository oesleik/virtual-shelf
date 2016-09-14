<?php

final class Config {

	static $production;
	static $debug;
	static $root;
	static $rootApi;

	static $googleAppName;
	static $googleApiKey;

	static $proxy;
	static $proxyAuth;

	public function __construct() {
		self::$production = true;
		self::$debug = false;
		self::$root = realpath(__DIR__ . '/../../../') . '/';
		self::$rootApi = self::$root . 'public_html/api/v1/';

		self::$googleAppName = '';
		self::$googleApiKey = '';

		self::$proxy = false;
		self::$proxyAuth = false;

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
