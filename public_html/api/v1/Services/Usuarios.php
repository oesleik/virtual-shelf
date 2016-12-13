<?php

namespace Services;

use Models\Usuario;
use Models\PerfilSocial;

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
			$redesSociais = PerfilSocial::where("id_usuario", $id)->get();
			$usuario["redes_sociais"] = $redesSociais;
			return $this->parseResponse($res, $usuario);
		}
	}

	public function add($req, $res) {
		$dados = $this->parseRequestBody($req);
		$usuario = Usuario::create($dados);
		return $this->parseResponse($res, $usuario);
	}

	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $this->parseRequestBody($req);

		Usuario::where("id", $id)->update($dados);
		$usuario = Usuario::find($id);

		return $this->parseResponse($res, $usuario);
	}

	public function delete($req, $res) {
		$id = $req->getAttribute("id");
		$deleted = (bool) Usuario::destroy($id);
		return $this->parseResponse($res, $deleted);
	}

}