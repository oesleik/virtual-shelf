<?php

namespace Services;

class Usuarios extends Services {

	public function getAll($req, $res) {
		$usuarios = [];
		return $this->parseResponse($res, $usuarios);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");

		if (!is_numeric($id)) {
			return $this->parseResponse($res, "Usuário não encontrado", self::ERROR);
		}

		$usuario = [];
		$usuario["id"] = $id;

		return $this->parseResponse($res, $usuario);
	}

}