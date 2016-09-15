<?php

require '../api/v1/config.php';

$client = new Google_Client();

if (Config::$proxy) {
	$httpClient = new GuzzleHttp\Client([
		'proxy' => (Config::$proxyAuth ? Config::$proxyAuth . '@' : '') . Config::$proxy,
		'verify' => Config::$production
	]);

	$client->setHttpClient($httpClient);
}

$client->setApplicationName(Config::$googleAppName);
$client->setDeveloperKey(Config::$googleApiKey);

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
