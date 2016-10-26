<?php

namespace Services;

use Models\Perfil_social;

class Perfil_socials extends Services {

	public function getAll($req, $res) {
		$perfil_socials = Perfil_social::all();
		return $this->parseResponse($res, $perfil_socials);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$perfil_social = Perfil_social::find($id);

		if ($perfil_social === null) {
			return $this->parseResponse($res, "Perfil social não encontrado", self::ERROR);
		} else {
			return $this->parseResponse($res, $perfil_social);
		}
	}

	public function add($req, $res) {
		$dados = $req->getBody();
		return $this->parseResponse($res, $dados);
	}

	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $req->getParsedBody();

		Perfil_social::where("id", $id)->update($dados);
		$perfil_social = Perfil_social::find($id);

		return $this->parseResponse($res, $perfil_social);
	}

	public function delete($req, $res) {
		$id = $req->getAttribute("id");
		$deleted = (bool) Perfil_social::destroy($id);
		return $this->parseResponse($res, $deleted);
	}

}