<?php

namespace Services;

use Models\VolumeComentario;

class VolumeComentarios extends Services {

	public function getAll($req, $res) {
		$volumesComentarios = VolumeComentario::all();
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
		$dados = $this->parseRequestBody($req);
		$volumeComentario = VolumeComentario::create($dados);
		return $this->parseResponse($res, $volumeComentario);
	}

	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $this->parseRequestBody($req);

		VolumeComentario::where("id", $id)->update($dados);
		$volumeComentario = VolumeComentario::find($id);

		return $this->parseResponse($res, $volumeComentario);
	}

	public function delete($req, $res) {
		$id = $req->getAttribute("id");
		$deleted = (bool) VolumeComentario::destroy($id);
		return $this->parseResponse($res, $deleted);
	}

}