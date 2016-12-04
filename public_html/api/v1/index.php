<?php

require "../../../config.php";

$config = [
	"settings" => [ "displayErrorDetails" => Config::get("debug") ]
];

$app = new \Slim\App($config);

// Usuarios
$app->get("/usuarios", "Services\Usuarios:getAll");
$app->get("/usuarios/{id:\d+}", "Services\Usuarios:get");
$app->post("/usuarios", "Services\Usuarios:add");
$app->put("/usuarios/{id:\d+}", "Services\Usuarios:edit");
$app->delete("/usuarios/{id:\d+}", "Services\Usuarios:delete");

// Volume
$app->get("/volumes", "Services\Volumes:getAll");
$app->get("/volumes/{id:\d+}", "Services\Volumes:get");
$app->get("/volumes/pesquisa/{pesquisa}", "Services\Volumes:getPesquisa");
$app->post("/volumes", "Services\Volumes:add");
$app->put("/volumes/{id:\d+}/usuario/{id_usuario:\d+}/situacao/{situacao}", "Services\Volumes:atualizarSituacaoVolumeUsuario");
$app->put("/volumes/{id:\d+}/usuario/{id_usuario:\d+}/avaliacao/{avaliacao}", "Services\Volumes:atualizarAvaliacaoVolumeUsuario");

// Login
$app->get("/logins", "Services\Logins:getAll");
$app->get("/logins/{id:\d+}", "Services\Logins:get");
$app->post("/logins", "Services\Logins:add");

// Perfil social
$app->get("/perfis-sociais", "Services\PerfisSociais:getAll");
$app->get("/perfis-sociais/{id:\d+}", "Services\PerfisSociais:get");
$app->get("/perfis-sociais/{provider}/{id:\d+}", "Services\PerfisSociais:getUsuario");
$app->post("/perfis-sociais", "Services\PerfisSociais:add");

// Prateleiras
$app->get("/prateleiras/usuario/{id_usuario:\d+}", "Services\Prateleiras:getAll");
$app->get("/prateleiras/{id:\d+}/usuario/{id_usuario:\d+}", "Services\Prateleiras:get");
$app->post("/prateleiras/usuario/{id_usuario:\d+}", "Services\Prateleiras:add");
$app->post("/prateleiras/{id_prateleira:\d+}/usuario/{id_usuario:\d+}/volume/{id_volume:\d+}", "Services\Prateleiras:addVolume");
$app->delete("/prateleiras/usuario/{id_usuario:\d+}/volume/{id_volume:\d+}", "Services\Prateleiras:deleteVolume");
$app->delete("/prateleiras/usuario/{id_usuario:\d+}", "Services\Prateleiras:delete");

$app->run();
