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
$app->get("/volumes/{id:\d+}/usuario/{id_usuario:\d+}/situacao", "Services\Volumes:getSituacaoVolumeUsuario");
$app->put("/volumes/{id:\d+}/usuario/{id_usuario:\d+}/situacao/{situacao}", "Services\Volumes:atualizarSituacaoVolumeUsuario");
$app->get("/volumes/{id:\d+}/usuario/{id_usuario:\d+}/avaliacao", "Services\Volumes:getAvaliacaoVolumeUsuario");
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
$app->put("/prateleiras/{id:\d+}/usuario/{id_usuario:\d+}", "Services\Prateleiras:edit");
$app->get("/prateleiras/{id_prateleira:\d+}/usuarios/{id_usuario:\d+}/volumes", "Services\Prateleiras:getVolumes");
$app->post("/prateleiras/{id_prateleira:\d+}/usuarios/{id_usuario:\d+}/volumes/{id_volume:\d+}", "Services\Prateleiras:addVolume");
$app->delete("/prateleiras/{id_prateleira:\d+}/usuario/{id_usuario:\d+}/volume/{id_volume:\d+}", "Services\Prateleiras:deleteVolume");
$app->delete("/prateleiras/{id_prateleira:\d+}/usuario/{id_usuario:\d+}", "Services\Prateleiras:delete");

//comentários
$app->get("/comentarios/volume/{id_volume:\d+}/usuario/{id_usuario:\d+}", "Services\VolumeComentarios:getAll");
$app->get("/comentarios/{id_comentario:\d+}", "Services\VolumeComentarios:get");
$app->post("/comentarios/volume/{id_volume:\d+}/usuario/{id_usuario:\d+}", "Services\VolumeComentarios:add");
$app->put("/comentarios/{id_comentario:\d+}/usuario/{id_usuario:\d+}", "Services\VolumeComentarios:edit");
$app->delete("/comentarios/{id_comentario:\d+}/usuario/{id_usuario:\d+}", "Services\VolumeComentarios:delete");
// $app->get("/comentarios/{id_comentario:\d+}/usuario/{id_usuario:\d+}/moderacao/{status}", "Services\VolumeComentarios:addStatusModeracao");
$app->put("/comentarios/{id_comentario:\d+}/usuario/{id_usuario:\d+}/aprovacao/{aprovacao}", "Services\VolumeComentarios:atualizarAprovacaoComentario");
$app->put("/comentarios/{id_comentario:\d+}/usuario/{id_usuario:\d+}/moderacao/{status}", "Services\VolumeComentarios:addStatusModeracao");
$app->delete("/comentarios/{id_comentario:\d+}/usuario/{id_usuario:\d+}/moderacao/{status}", "Services\VolumeComentarios:deleteStatusModeracao");


// categorias
$app->get("/categorias", "Services\Categorias:getAll");

$app->run();
