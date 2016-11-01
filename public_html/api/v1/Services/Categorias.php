<?php

namespace Services;

use Models\Categoria;

class Categorias extends Services {

	public function getAll($req, $res) {
		$categorias = Categoria::all();
		return $this->parseResponse($res, $categorias);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$categoria = Categoria::find($id);

		if ($categoria === null) {
			return $this->parseResponse($res, "Categoria não encontrada", self::ERROR);
		} else {
			return $this->parseResponse($res, $categoria);
		}
	}

	public function add($req, $res) {
		$dados = $this->parseRequestBody($req);
		$categoria = Categoria::create($dados);
		return $this->parseResponse($res, $categoria);
	}

	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $this->parseRequestBody($req);

		Categoria::where("id", $id)->update($dados);
		$categoria = Categoria::find($id);

		return $this->parseResponse($res, $categoria);
	}

	public function delete($req, $res) {
		$id = $req->getAttribute("id");
		$deleted = (bool) Categoria::destroy($id);
		return $this->parseResponse($res, $deleted);
	}

}