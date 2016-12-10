<?php

namespace Services;

use Models\VolumeComentario;

class VolumeComentarios extends Services {

	public function getAll($req, $res) {
		$id = $req->getAttribute("id_volume");
		$volumesComentarios = VolumeComentario::where('id_volume', $id)->get();
		return $this->parseResponse($res, $volumesComentarios);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$volumeComentario = VolumeComentario::find($id);

		if ($volumeComentario === null) {
			return $this->parseResponse($res, "Comentário de volume não encontrado", self::ERROR);
		} else {
			return $this->parseResponse($res, $volumeComentario);
		}
	}

	public function add($req, $res) {
		$id_volume = $req->getAttribute("id_volume");
		$id_usuario = $req->getAttribute("id_usuario");
		$dados = $this->parseRequestBody($req);
		$dados["id_volume"]=$id_volume;
		$dados["id_usuario"]=$id_usuario;

		$volumeComentario = VolumeComentario::Create($dados);
		return $this->parseResponse($res, $volumeComentario);
	}

	public function edit($req, $res) {
		$id_comentario = $req->getAttribute("id_comentario");
		$id_usuario = $req->getAttribute("id_usuario");
		$dados = $this->parseRequestBody($req);
		$comentario = VolumeComentario::find($id_comentario);
		
		if($comentario['id_usuario'] == $id_usuario){
			VolumeComentario::where("id", $id_comentario)->update($dados);
			$comentarioAtualizado = VolumeComentario::find($id_comentario);
			return $this->parseResponse($res, $comentarioAtualizado);
		}
		else{
			return $this->parseResponse($res, "Comentário de volume não atualizado", self::ERROR);
		}

	}

	public function delete($req, $res) {
		$id_comentario = $req->getAttribute("id_comentario");
		$id_usuario = $req->getAttribute("id_usuario");

		$comentario = VolumeComentario::find($id_comentario);

		if($comentario['id_usuario'] == $id_usuario){
			$deleted = (bool) VolumeComentario::destroy($id_comentario);
			return $this->parseResponse($res, $deleted);
		}
		else{
			return $this->parseResponse($res, "Comentário não é deste usuário", self::ERROR);
		}
	}
}