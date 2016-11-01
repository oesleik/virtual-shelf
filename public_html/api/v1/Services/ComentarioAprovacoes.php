<?php

namespace Services;

use Models\ComentarioAprovacao;

class ComentarioAprovacoes extends Services {

	public function getAll($req, $res) {
		$comentarios = ComentarioAprovacao::all();
		return $this->parseResponse($res, $comentarios);
	}

	public function get($req, $res) {
		$id = $req->getAttribute("id");
		$comentario = ComentarioAprovacao::find($id);

		if ($comentario === null) {
			return $this->parseResponse($res, "Comentário de aprovação não encontrado", self::ERROR);
		} else {
			return $this->parseResponse($res, $comentario);
		}
	}

	public function add($req, $res) {
		$dados = $this->parseRequestBody($req);
		$comentario = ComentarioAprovacao::create($dados);
		return $this->parseResponse($res, $comentario);
	}

	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $this->parseRequestBody($req);

		ComentarioAprovacao::where("id", $id)->update($dados);
		$comentario = ComentarioAprovacao::find($id);

		return $this->parseResponse($res, $comentario);
	}

	public function delete($req, $res) {
		$id = $req->getAttribute("id");
		$deleted = (bool) ComentarioAprovacao::destroy($id);
		return $this->parseResponse($res, $deleted);
	}

}