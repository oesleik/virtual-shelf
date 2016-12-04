<?php

namespace Services;

use Models\Prateleira;
use Models\PrateleiraVolume;
use Models\Volume;

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

		$dados = $this->parseRequestBody($req);
		$dados["id_prateleira"]=$req->getAttribute("id_prateleira");
		$dados["id_volume"]=$req->getAttribute("id_volume");

		$prateleira = Prateleira::find($dados["id_prateleira"]);

		if ($prateleira === null) {
			return $this->parseResponse($res, "Prateleira não existe", self::ERROR);
		} else {

			if ($prateleira["id_usuario"] == $req->getAttribute("id_usuario")){

				if(Volume::find($req->getAttribute("id_volume")) === null){
					return $this->parseResponse($res, "Este volume não existe", self::ERROR);
				}else{
					
					$volumeAdd = PrateleiraVolume::firstOrCreate($dados);
					return $this->parseResponse($res, $volumeAdd);
				}
			} else{
				
				return $this->parseResponse($res, "Esta prateleira não pertence a esse usuário", self::ERROR);
			}	
		}	
	}
}