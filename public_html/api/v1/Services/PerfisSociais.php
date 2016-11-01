<?php

namespace Services;

use Models\PerfilSocial;

class PerfisSociais extends Services {

	public function getAll($req, $res) {
		$perfisSociais = PerfilSocial::all();
		return $this->parseResponse($res, $perfisSociais);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$perfilSocial = PerfilSocial::find($id);

		if ($perfilSocial === null) {
			return $this->parseResponse($res, "Perfil social não encontrado", self::ERROR);
		} else {
			return $this->parseResponse($res, $perfilSocial);
		}
	}

	public function getUsuario($req, $res) {
		$id = $req->getAttribute("id");
		$provider = $req->getAttribute("provider");

		$usuarios = PerfilSocial::where("rede_social", $provider)
								->where("id_usuario_rede", $id)
								->take(1)->get();

		if (isset($usuarios[0])) {
			return $this->parseResponse($res, $usuarios[0]);
		} else {
			return $this->parseResponse($res, "Perfil social não encontrado", self::ERROR);
		}
	}

	public function add($req, $res) {
		$dados = $this->parseRequestBody($req);
		$perfilSocial = PerfilSocial::create($dados);
		return $this->parseResponse($res, $perfilSocial);
	}

	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $this->parseRequestBody($req);

		PerfilSocial::where("id", $id)->update($dados);
		$perfilSocial = PerfilSocial::find($id);

		return $this->parseResponse($res, $perfilSocial);
	}

	public function delete($req, $res) {
		$id = $req->getAttribute("id");
		$deleted = (bool) PerfilSocial::destroy($id);
		return $this->parseResponse($res, $deleted);
	}

}