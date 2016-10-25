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

	}

	public function delete($req, $res) {

	}

}