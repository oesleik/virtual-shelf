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
$app->put("/usuarios/{id}", "Services\Usuarios:edit");
$app->delete("/usuarios/{id}", "Services\Usuarios:delete");

// Volume
$app->get("/volumes", "Services\Volumes:getAll");
$app->get("/volumes/{id}", "Services\Volumes:get");
$app->post("/volumes", "Services\Volumes:add");

// Login
$app->get("/logins", "Services\Logins:getAll");
$app->get("/logins/{id}", "Services\Logins:get");
$app->post("/logins", "Services\Logins:add");

// Perfil social
$app->get("/perfis-sociais", "Services\PerfisSociais:getAll");
$app->get("/perfis-sociais/{id:\d+}", "Services\PerfisSociais:get");
$app->get("/perfis-sociais/{provider}/{id}", "Services\PerfisSociais:getUsuario");
$app->post("/perfis-sociais", "Services\PerfisSociais:add");

$app->run();
