<?php

require '../api/v1/config.php';

$client = new Google_Client();
$client->setApplicationName(Config::$googleAppName);
$client->setDeveloperKey(Config::$googleApiKey);

$service = new Google_Service_Books($client);
$optParams = array('filter' => 'free-ebooks');
$results = $service->volumes->listVolumes('Henry David Thoreau', $optParams);

foreach ($results as $item) {
	echo $item['volumeInfo']['title'], "<br /> \n";
}

var_dump($results);