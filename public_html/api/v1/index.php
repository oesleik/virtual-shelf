<?php

error_reporting(E_ALL);
ini_set("display_errors", true);

require 'vendor/autoload.php';

$config = [];
$app = new \Slim\App($config);

$app->get('/hello/{name}', function ($request, $response, $args) {
	return $response->write('Hello, ' . $args['name'] . '! Welcome to Slim Framework');
});

$app->get('/usuarios/{id}', '\Services\Usuarios:get');

$app->run();