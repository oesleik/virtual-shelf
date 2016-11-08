<?php

namespace Services;

use Models\Prateleira;

class Prateleiras extends Services {

	public function getAll($req, $res) {
		$prateleiras = Prateleira::all();
		return $this->parseResponse($res, $prateleiras);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$prateleira = Prateleira::find($id);

		if ($prateleira === null) {
			return $this->parseResponse($res, "Prateleira inválido", self::ERROR);
		} else {
			return $this->parseResponse($res, $prateleira);
		}
	}

	public function add($req, $res) {
		$dados = $this->parseRequestBody($req);
		$prateleira = Prateleira::create($dados);
		return $this->parseResponse($res, $prateleira);

	}

	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $this->parseRequestBody($req);

		Prateleira::where("id", $id)->update($dados);
		$prateleira = Prateleira::find($id);

		return $this->parseResponse($res, $prateleira);
	}

	public function delete($req, $res) {
		$id = $req->getAttribute("id");
		$deleted = (bool) Prateleira::destroy($id);
		return $this->parseResponse($res, $deleted);
	}

}