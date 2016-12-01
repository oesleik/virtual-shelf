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

		$id = $req->getAttribute("id_usuario");
		$dados = $this->parseRequestBody($req);
		$dados["id_usuario"]=$id;

		//return $this->parseResponse($res, $dados);
		//$prateleira = Prateleira::firstOrCreate([
		//	'id_usuario' => $id,
		//	"nome"=>$dados["nome"]
		//	]);
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

	public function adicionarVolume($req, $res) {



	}

}