<?php

namespace Services;

use Models\VolumeComentario;
use Models\Usuario;
use Models\ComentarioAprovacao;
use Models\ComentarioModeracao;

class VolumeComentarios extends Services {

	public function getAll($req, $res) {
		$idVolume = $req->getAttribute("id_volume");
		$idUsuario = $req->getAttribute("id_usuario");
		$comentarios = VolumeComentario::where('id_volume', $idVolume)->get();

		foreach ($comentarios as $idx => $comentario) {
			$comentarios[$idx]["usuario"] = Usuario::find($comentario->id_usuario);
			$comentarios[$idx]["aprovacoes"] = count(ComentarioAprovacao::where("id_comentario", $comentario->id)->where("aprovacao", true)->get());
			$comentarios[$idx]["aprovado"] = count(ComentarioAprovacao::where("id_comentario", $comentario->id)->where("id_usuario", $idUsuario)->where("aprovacao", true)->get()) > 0;
		}

		return $this->parseResponse($res, $comentarios);
	}

	public function get($req, $res) {
		$comentario = VolumeComentario::find($req->getAttribute("id_comentario"));

		if ($comentario === null) {
			return $this->parseResponse($res, "Comentário não encontrado", self::ERROR);
		} else {
			return $this->parseResponse($res, $comentario);
		}
	}

	public function add($req, $res) {
		$dados = $this->parseRequestBody($req);
		$dados["id_volume"] = $req->getAttribute("id_volume");
		$dados["id_usuario"] = $req->getAttribute("id_usuario");
		$comentario = VolumeComentario::create($dados);
		return $this->parseResponse($res, $comentario);
	}

	public function edit($req, $res) {
		$dados = $this->parseRequestBody($req);
		$idComentario = $req->getAttribute("id_comentario");
		$idUsuario = $req->getAttribute("id_usuario");
		$comentario = VolumeComentario::find($idComentario);

		if ($comentario['id_usuario'] == $idUsuario) {
			VolumeComentario::where("id", $idComentario)->update($dados);
			$comentario = VolumeComentario::find($idComentario);
			return $this->parseResponse($res, $comentario);
		} else {
			return $this->parseResponse($res, "Comentário não encontrado", self::ERROR);
		}
	}

	public function delete($req, $res) {
		$idComentario = $req->getAttribute("id_comentario");
		$idUsuario = $req->getAttribute("id_usuario");
		$comentario = VolumeComentario::find($idComentario);

		if ($comentario['id_usuario'] == $idUsuario) {
			VolumeComentario::destroy($idComentario);
		} else {
			return $this->parseResponse($res, "Comentário não é deste usuário", self::ERROR);
		}
	}

	public function atualizarAprovacaoComentario($req, $res) {
		$idComentario = $req->getAttribute("id_comentario");
		$idUsuario = $req->getAttribute("id_usuario");
		$aprovacao = in_array($req->getAttribute("aprovacao"), array("true", "1", "S"));

		ComentarioAprovacao::updateOrCreate([
			"id_comentario" => $idComentario,
			"id_usuario" => $idUsuario
		], ["aprovacao" => $aprovacao]);
	}

	public function addStatusModeracao($req, $res) {
		$idComentario = $req->getAttribute("id_comentario");
		$idUsuario = $req->getAttribute("id_usuario");
		$status = $req->getAttribute("status");

		ComentarioModeracao::updateOrCreate([
			"id_comentario" => $idComentario,
			"id_usuario" => $idUsuario,
			"tipo_comentario" => $status
		], []);
	}
}