<?php

require "../../../config.php";

$config = [
	"settings" => [ "displayErrorDetails" => Config::get("debug") ]
];

$app = new \Slim\App($config);

// Usuarios
$app->get("/usuarios", "Services\Usuarios:getAll");
$app->get("/usuarios/{id}", "Services\Usuarios:get");
$app->post("/usuarios", "Services\Usuarios:add");

// Volume
$app->get("/volumes", "Services\Volumes:getAll");
$app->get("/volumes/{id}", "Services\Volumes:get");
$app->post("/volumes", "Services\Volumes:add");

$app->run();
