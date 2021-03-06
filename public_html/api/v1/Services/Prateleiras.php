<?php

namespace Services;

use Models\Prateleira;
use Models\PrateleiraVolume;
use Models\Volume;

class Prateleiras extends Services {

	public function getAll($req, $res) {
		$prateleiras = Prateleira::where("id_usuario", $req->getAttribute("id_usuario"))->get();
		return $this->parseResponse($res, $prateleiras);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$idUsuario = $req->getAttribute("id_usuario");
		$prateleira = Prateleira::find($id);

		if ($prateleira === null || $prateleira->id_usuario != $idUsuario) {
			return $this->parseResponse($res, "Prateleira não encontrada", self::ERROR);
		} else {
			return $this->parseResponse($res, $prateleira);
		}
	}

	public function add($req, $res) {
		$dados = $this->parseRequestBody($req);
		$dados["id_usuario"] = $req->getAttribute("id_usuario");
		$prateleira = Prateleira::create($dados);
		return $this->parseResponse($res, $prateleira);

	}


	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $this->parseRequestBody($req);
		$dados["id_usuario"] = $req->getAttribute("id_usuario");

		Prateleira::where("id", $id)->update($dados);
		$prateleira = Prateleira::find($id);

		return $this->parseResponse($res, $prateleira);
	}

	public function delete($req, $res) {
		$idPrateleira= $req->getAttribute("id_prateleira");
		$idUsuario= $req->getAttribute("id_usuario");
		PrateleiraVolume::where("id_prateleira", $idPrateleira)->delete();
		Prateleira::where("id", $idPrateleira)->where("id_usuario", $idUsuario)->delete();
	}

	public function deleteVolume($req, $res) {
		$idPrateleira = $req->getAttribute("id_prateleira");
		$idVolume = $req->getAttribute("id_volume");
		$idUsuario = $req->getAttribute("id_usuario");

		$prateleira = Prateleira::find($idPrateleira);

		if ($prateleira !== null && $prateleira->id_usuario == $idUsuario) {
			PrateleiraVolume::where("id_prateleira", $idPrateleira)->where("id_volume", $idVolume)->delete();
		} else {
			return $this->parseResponse($res, "Prateleira não encontrada", self::ERROR);
		}
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

	public function getVolumes($req, $res) {
		$prateleira = Prateleira::find($req->getAttribute("id_prateleira"));

		if ($prateleira != null && $prateleira->id_usuario == $req->getAttribute("id_usuario")) {
			$volumes = PrateleiraVolume::where("id_prateleira", $req->getAttribute("id_prateleira"))->get();
			$serviceVolumes = new Volumes();
			$dadosVolumes = array();

			foreach ($volumes as $relacao) {
				$volume = Volume::find($relacao->id_volume);

				if ($volume !== null) {
					$dadosVolumes[] = $serviceVolumes->_parseVolume($volume);
				}
			}

			return $this->parseResponse($res, $dadosVolumes);
		} else {
			return $this->parseResponse($res, "Prateleira inválida", self::ERROR);
		}
	}
}