<?php

require "../../config.php";

$client = new Google_Client();

if (Config::get("proxy")) {
	$httpClient = new GuzzleHttp\Client([
		"proxy" => (Config::get("proxyAuth") ? Config::get("proxyAuth") . "@" : "") . Config::get("proxy"),
		"verify" => Config::get("production")
	]);

	$client->setHttpClient($httpClient);
}

$client->setApplicationName(Config::get("googleAppName"));
$client->setDeveloperKey(Config::get("googleApiKey"));

$service = new Google_Service_Books($client);

// Google_Service_Books_VolumeSearchInfo
// Google_Service_Books_VolumeVolumeInfo
// Google_Service_Books_VolumeLayerInfo

$results = $service->volumes->listVolumes("harry potter");
// $results = $service->volumes->get("I9M8AAAAcAAJ");
// $results = $service->volumes_associated->listVolumesAssociated("I9M8AAAAcAAJ");

foreach ($results as $item) {
	// var_dump($item);
	var_dump($item["volumeInfo"]["industryIdentifiers"]);
}

// var_dump($results);
