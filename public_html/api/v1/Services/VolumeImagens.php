<?php

namespace Services;

use Models\VolumeImagem;

class VolumeImagens extends Services {

	public function getAll($req, $res) {
		$imagens = VolumeImagem::all();
		return $this->parseResponse($res, $imagens);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$imagem = VolumeImagem::find($id);

		if ($imagem === null) {
			return $this->parseResponse($res, "Imagem de volume não encontrada", self::ERROR);
		} else {
			return $this->parseResponse($res, $imagem);
		}
	}

	public function add($req, $res) {
		$dados = $this->parseRequestBody($req);
		$imagem = VolumeImagem::create($dados);
		return $this->parseResponse($res, $imagem);
	}

	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $this->parseRequestBody($req);

		VolumeImagem::where("id", $id)->update($dados);
		$imagem = VolumeImagem::find($id);

		return $this->parseResponse($res, $imagem);
	}

	public function delete($req, $res) {
		$id = $req->getAttribute("id");
		$deleted = (bool) VolumeImagem::destroy($id);
		return $this->parseResponse($res, $deleted);
	}

}