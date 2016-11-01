<?php

namespace Services;

use Models\Editora;

class Editoras extends Services {

	public function getAll($req, $res) {
		$editoras = Editora::all();
		return $this->parseResponse($res, $editoras);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$editora = Editora::find($id);

		if ($editora === null) {
			return $this->parseResponse($res, "Editora não encontrada", self::ERROR);
		} else {
			return $this->parseResponse($res, $editora);
		}
	}

	public function add($req, $res) {
		$dados = $req->getParsedBody();
		$editora = Editora::create($dados);
		return $this->parseResponse($res, $editora);
	}

	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $req->getParsedBody();

		Editora::where("id", $id)->update($dados);
		$editora = Editora::find($id);

		return $this->parseResponse($res, $editora);
	}

	public function delete($req, $res) {
		$id = $req->getAttribute("id");
		$deleted = (bool) Editora::destroy($id);
		return $this->parseResponse($res, $deleted);
	}

}