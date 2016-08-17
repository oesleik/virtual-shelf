<?php

require 'config.php';

$config = [
	'settings' => [ 'displayErrorDetails' => DEBUG ]
];

$app = new \Slim\App($config);

$app->get('/usuarios/{id}', '\Services\Usuarios:get');

$app->run();