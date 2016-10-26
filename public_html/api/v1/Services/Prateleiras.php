<?php

namespace Services;

use Models\Login;

class Prateleiras extends Services {

	public function getAll($req, $res) {
		$preteleiras = Login::all();
		return $this->parseResponse($res, $preteleiras);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$prateleira = Login::find($id);

		if ($prateleira === null) {
			return $this->parseResponse($res, "Prateleira inválido", self::ERROR);
		} else {
			return $this->parseResponse($res, $prateleira);
		}
	}

	public function add($req, $res) {
		$dados = $req->getParsedBody();
		$prateleira = Prateleira::create($dados);
		return $this->parseResponse($res, $login);

	}

	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $req->getParsedBody();

		Prateleira::where("id", $id)->update($dados);
		$prateleira = Prateleira::find($id);

		return $this->parseResponse($res, $login)
	}

	public function delete($req, $res) {
		$id = $req->getAttribute("id");
		$deleted = (bool) Prateleira::destroy($id);
		return $this->parseResponse($res, $deleted);
	}

}