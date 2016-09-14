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
// $results = $service->volumes->listVolumes("oeslei");
// $results = $service->volumes->get("I9M8AAAAcAAJ");

// foreach ($results as $item) {
// 	var_dump($item);
// }

// var_dump($results);

// titulo
// subtítulo
// autores
// dataPublicacao
// paginas
// imagens
// lingua


// genero?

// infoLink