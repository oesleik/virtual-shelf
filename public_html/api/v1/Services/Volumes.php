<?php

namespace Services;

use Models\Volume;

class Volumes extends Services {

	public function getAll($req, $res) {
		$volumes = Volume::all();
		return $this->parseResponse($res, $volumes);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$volume = Volume::find($id);

		if ($volume === null) {
			return $this->parseResponse($res, "Volume não encontrado", self::ERROR);
		} else {
			return $this->parseResponse($res, $volume);
		}
	}

	public function add($req, $res) {
		$dados = $req->getParsedBody();
		$volume = Volume::create($dados);
		return $this->parseResponse($res, $volume);

	}

	public function edit($req, $res) {

	}

	public function delete($req, $res) {

	}

}