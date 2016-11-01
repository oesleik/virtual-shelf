<?php

namespace Services;

use Models\ComentarioModeracao;

class ComentarioModeracoes extends Services {

	public function getAll($req, $res) {
		$comentarios = ComentarioModeracao::all();
		return $this->parseResponse($res, $comentarios);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$comentario = ComentarioModeracao::find($id);

		if ($comentario === null) {
			return $this->parseResponse($res, "Comentário não encontrado", self::ERROR);
		} else {
			return $this->parseResponse($res, $comentario);
		}
	}

	public function add($req, $res) {
		$dados = $this->parseRequestBody($req);
		$comentario = ComentarioModeracao::create($dados);
		return $this->parseResponse($res, $comentario);
	}

	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $this->parseRequestBody($req);

		ComentarioModeracao::where("id", $id)->update($dados);
		$comentario = ComentarioModeracao::find($id);

		return $this->parseResponse($res, $comentario);
	}

	public function delete($req, $res) {
		$id = $req->getAttribute("id");
		$deleted = (bool) ComentarioModeracao::destroy($id);
		return $this->parseResponse($res, $deleted);
	}

}