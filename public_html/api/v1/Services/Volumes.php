<?php

namespace Services;

use Models\Volume;
use Models\Editora;
use Models\Autor;
use Models\VolumeAutor;
use Models\Categoria;
use Models\VolumeCategoria;
use Models\VolumeImagem;
use Models\VolumeUsuario;

class Volumes extends Services {

	public function getAll($req, $res) {
		$volumes = Volume::all();
		return $this->parseResponse($res, $volumes);
	}

	public function get($req, $res) {
		$volume = Volume::find($req->getAttribute("id"));

		if ($volume === null) {
			return $this->parseResponse($res, "Volume não encontrado", self::ERROR);
		} else {
			$dadosVolume = $this->_parseVolume($volume);
			return $this->parseResponse($res, $dadosVolume);
		}
	}

	public function getPesquisa($req, $res) {
		$pesquisa = $req->getAttribute("pesquisa");

		$service = \Utils\getGoogleBooksService();
		$response = $service->volumes->listVolumes($pesquisa);

		$volumes = array();
		foreach ($response as $item) {
			$volumes[] = $this->_parseVolumeGoogle($item);
		}

		return $this->parseResponse($res, $volumes);
	}

	public function add($req, $res) {
		$dados = $this->parseRequestBody($req);
		$volume = Volume::create($dados);
		return $this->parseResponse($res, $volume);
	}

	public function edit($req, $res) {
		$id = $req->getAttribute("id");
		$dados = $this->parseRequestBody($req);

		Volume::where("id", $id)->update($dados);
		$volume = Volume::find($id);

		return $this->parseResponse($res, $volume);
	}

	public function delete($req, $res) {
		$id = $req->getAttribute("id");
		$deleted = (bool) Volume::destroy($id);
		return $this->parseResponse($res, $deleted);
	}

	public function _parseVolume($volume) {
		$related = array();
		$related["editora"] = Editora::find($volume->id_editora);

		$autores = VolumeAutor::where("id_volume", $volume->id)->get();
		$related["autores"] = array();
		foreach ($autores as $relacao) {
			$related["autores"][] = Autor::find($relacao->id_autor);
		}

		$categorias = VolumeCategoria::where("id_volume", $volume->id)->get();
		$related["categorias"] = array();
		foreach ($categorias as $relacao) {
			$related["categorias"][] = Categoria::find($relacao->id_categoria);
		}

		$related["imagens"] = array();
		$imagens = VolumeImagem::where("id_volume", $volume->id)->get();
		foreach ($imagens as $imagem) {
			$related["imagens"][$imagem->tamanho] = $imagem;
		}

		return array_merge($volume->toArray(), $related);
	}

	protected function _parseVolumeGoogle($item) {
		$related = array();
		$info = $item["volumeInfo"];

		$editora = Editora::firstOrCreate([
			"nome" => $info["publisher"] ?: "Desconhecida"
		]);
		$related["editora"] = $editora;

		$volume = Volume::updateOrCreate(["id_google" => $item["id"]], [
			"titulo" => $info["title"],
			"isbn" => isset($info["industryIdentifiers"][0]["identifier"]) ? $info["industryIdentifiers"][0]["identifier"] : "",
			"paginas" => $info["pageCount"],
			"linguagem" => $info["language"],
			"dataPublicacao" => $info["publishedDate"],
			"id_editora" => $editora->id
		]);

		$related["autores"] = array();
		foreach ((array) $info["authors"] as $nome) {
			$autor = Autor::firstOrCreate([
				"nome" => $nome
			]);
			$related["autores"][] = $autor;

			VolumeAutor::firstOrCreate([
				"id_volume" => $volume->id,
				"id_autor" => $autor->id
			]);
		}

		$related["categorias"] = array();
		foreach ((array) $info["categories"] as $nome) {
			$categoria = Categoria::firstOrCreate([
				"nome" => $nome
			]);
			$related["categorias"][] = $categoria;

			VolumeCategoria::firstOrCreate([
				"id_volume" => $volume->id,
				"id_categoria" => $categoria->id
			]);
		}

		$related["imagens"] = array();
		if ($info["imageLinks"]["thumbnail"]) {
			$imagem = VolumeImagem::updateOrCreate([
				"id_volume" => $volume->id,
				"tamanho" => VolumeImagem::TAMANHO_THUMB
			], [
				"caminho" => $info["imageLinks"]["thumbnail"]
			]);
			$related["imagens"][VolumeImagem::TAMANHO_THUMB] = $imagem;
		}
		if ($info["imageLinks"]["smallThumbnail"]) {
			$imagem = VolumeImagem::updateOrCreate([
				"id_volume" => $volume->id,
				"tamanho" => VolumeImagem::TAMANHO_THUMB_SM
			], [
				"caminho" => $info["imageLinks"]["smallThumbnail"]
			]);
			$related["imagens"][VolumeImagem::TAMANHO_THUMB_SM] = $imagem;
		}

		return array_merge($volume->toArray(), $related);
	}

	public function getSituacaoVolumeUsuario($req, $res) {
		$rows = VolumeUsuario::where("id_volume", $req->getAttribute("id"))
							 ->where("id_usuario", $req->getAttribute("id_usuario"))
							 ->get();

		return $this->parseResponse($res, count($rows) ? $rows[0]->situacao : "Não lido");
	}

	public function atualizarSituacaoVolumeUsuario($req, $res) {

		$volumeUsuario = VolumeUsuario::updateOrCreate([
			"id_volume" => $req->getAttribute("id"),
			"id_usuario" => $req->getAttribute("id_usuario")
		],["situacao" => $req->getAttribute("situacao")]);

		return $this->parseResponse($res, $volumeUsuario);

	}

	public function getAvaliacaoVolumeUsuario($req, $res) {
		$rows = VolumeUsuario::where("id_volume", $req->getAttribute("id"))
							 ->where("id_usuario", $req->getAttribute("id_usuario"))
							 ->get();

		return $this->parseResponse($res, count($rows) ? $rows[0]->avaliacao : 0);
	}

	public function atualizarAvaliacaoVolumeUsuario($req, $res) {

		$volumeUsuario = VolumeUsuario::updateOrCreate([
			"id_volume" => $req->getAttribute("id"),
			"id_usuario" => $req->getAttribute("id_usuario")
				
		],["avaliacao" => $req->getAttribute("avaliacao")]);

		return $this->parseResponse($res, $volumeUsuario);

	}

}