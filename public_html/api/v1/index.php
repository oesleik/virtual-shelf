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

// Login
$app->get("/logins", "Services\Logins:getAll");
$app->get("/logins/{id}", "Services\Logins:get");
$app->post("/logins", "Services\Logins:add");


// Perfil social
$app->get("/perfil_socials", "Services\Perfil_socials:getAll");
$app->get("/perfil_socials/{id}", "Services\Perfil_socials:get");
$app->post("/perfil_socials", "Services\Perfil_socials:add");
$app->run();
