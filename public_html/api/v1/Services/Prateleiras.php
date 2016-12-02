<?php

namespace Services;

use Models\Prateleira;
use Models\PrateleiraVolume;

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

		$id = $req->getAttribute("id_usuario");
		$dados = $this->parseRequestBody($req);
		$dados["id_usuario"]=$id;

		$prateleira = Prateleira::firstOrCreate($dados);
		

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

	public function addVolume($req, $res) {

		$prateleira = $req->getAttribute("id_prateleira");
		$volume = $req->getAttribute("id_volume");
		$dados = $this->parseRequestBody($req);
		$dados["id_prateleira"]=$prateleira;
		$dados["id_volume"]=$volume;

		$prateleira = PrateleiraVolume::firstOrCreate($dados);
		

		return $this->parseResponse($res, $prateleira);

	}

}