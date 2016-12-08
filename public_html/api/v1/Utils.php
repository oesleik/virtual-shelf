<?php

namespace Utils;

use Config;

function getGoogleBooksService() {
	$client = new \Google_Client();
	$config = [];

	if (Config::get("proxy")) {
		$config["proxy"] = (Config::get("proxyAuth") ? Config::get("proxyAuth") . "@" : "") . Config::get("proxy");
	}

	if (count($config)) {
		$httpClient = new \GuzzleHttp\Client($config);
		$client->setHttpClient($httpClient);
	}

	$client->setApplicationName(Config::get("googleAppName"));
	$client->setDeveloperKey(Config::get("googleApiKey"));

	return new \Google_Service_Books($client);
}