<?php

namespace Services;

use Models\Autor;

class Autores extends Services {

	public function getAll($req, $res) {
		$autores = Autor::all();
		return $this->parseResponse($res, $autores);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$autor = Autor::find($id);

		if ($autor === null) {
			return $this->parseResponse($res, "Autor não encontrado", self::ERROR);
		} else {
			return $this->parseResponse($res, $autor);
		}
	}

	public function add($req, $res) {
		$dados = $this->parseRequestBody($req);
		$autor = Autor::create($dados);
		return $this->parseResponse($res, $autor);
	}

	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $this->parseRequestBody($req);

		Autor::where("id", $id)->update($dados);
		$autor = Autor::find($id);

		return $this->parseResponse($res, $autor);
	}

	public function delete($req, $res) {
		$id = $req->getAttribute("id");
		$deleted = (bool) Autor::destroy($id);
		return $this->parseResponse($res, $deleted);
	}

}