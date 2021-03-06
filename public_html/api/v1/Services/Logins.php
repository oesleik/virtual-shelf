<?php

namespace Services;

use Models\Login;

class Logins extends Services {

	public function getAll($req, $res) {
		$logins = Login::all();
		return $this->parseResponse($res, $logins);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$login = Login::find($id);

		if ($login === null) {
			return $this->parseResponse($res, "Login inválido", self::ERROR);
		} else {
			return $this->parseResponse($res, $login);
		}
	}

	public function add($req, $res) {
		$dados = $this->parseRequestBody($req);
		$login = Login::create($dados);
		return $this->parseResponse($res, $login);

	}

	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $this->parseRequestBody($req);

		Login::where("id", $id)->update($dados);
		$login = Login::find($id);

		return $this->parseResponse($res, $login);
	}

	public function delete($req, $res) {
		$id = $req->getAttribute("id");
		$deleted = (bool) Login::destroy($id);
		return $this->parseResponse($res, $deleted);
	}

}