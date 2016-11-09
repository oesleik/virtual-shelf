<?php

namespace Utils;

use Config;

function getGoogleBooksService() {
	$client = new \Google_Client();

	if (Config::get("proxy")) {
		$httpClient = new \GuzzleHttp\Client([
			"proxy" => (Config::get("proxyAuth") ? Config::get("proxyAuth") . "@" : "") . Config::get("proxy"),
			"verify" => Config::get("production")
		]);

		$client->setHttpClient($httpClient);
	}

	$client->setApplicationName(Config::get("googleAppName"));
	$client->setDeveloperKey(Config::get("googleApiKey"));

	return new \Google_Service_Books($client);
}