<?php

namespace Services;

use Models\Usuario;

class Usuarios extends Services {

	public function getAll($req, $res) {
		$usuarios = Usuario::all();
		return $this->parseResponse($res, $usuarios);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$usuario = Usuario::find($id);

		if ($usuario === null) {
			return $this->parseResponse($res, "Usuário não encontrado", self::ERROR);
		} else {
			return $this->parseResponse($res, $usuario);
		}
	}

	public function add($req, $res) {
		$dados = $req->getBody();
		return $this->parseResponse($res, $dados);

		// $usuario = Usuario::create($dados);
	}

	public function edit($req, $res) {

	}

	public function delete($req, $res) {

	}

}