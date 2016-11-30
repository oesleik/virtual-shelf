<?php

namespace Services;

use Models\VolumeUsuario;

class VolumeUsuarios extends Services {

	public function getAll($req, $res) {
		$volumesUsuario = VolumeUsuario::all();
		return $this->parseResponse($res, $volumesUsuario);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$volumeusuario = VolumeUsuario::find($id);

		if ($volumeusuario === null) {
			return $this->parseResponse($res, "Volume de usuário não encontrado", self::ERROR);
		} else {
			return $this->parseResponse($res, $volumeusuario);
		}
	}

	public function add($req, $res) {

		$dados = $this->parseRequestBody($req);
		$volumeUsuario = Volume::create($dados);

		return $this->parseResponse($res, $volumeUsuario);
	}

	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $this->parseRequestBody($req);

		VolumeUsuario::where("id", $id)->update($dados);
		$volumeusuario = VolumeUsuario::find($id);

		return $this->parseResponse($res, $volumeusuario);
	}

	public function delete($req, $res) {
		$id = $req->getAttribute("id");
		$deleted = (bool) VolumeUsuario::destroy($id);
		return $this->parseResponse($res, $deleted);
	}


}