<?php

namespace Services;

use Models\Volume;
use Models\Editora;
use Models\Autor;
use Models\VolumeAutor;
use Models\Categoria;
use Models\VolumeCategoria;
use Models\VolumeImagem;

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

	protected _parseVolumeGoogle($item) {
		$related = array();
		$info = $item["volumeInfo"];

		$editora = Editora::firstOrCreate([
			"nome" => $info["publisher"]
		]);
		$related["editora"] = $editora;

		$volume = Volume::firstOrCreate([
			"titulo" => $info["title"],
			"isbn" => $info["industryIdentifiers"][0]["identifier"],
			"paginas" => $info["pageCount"],
			"linguagem" => $info["language"],
			"dataPublicacao" => $info["publishedDate"],
			"id_google" => $item["id"],
			"id_editora" => $editora->id
		]);

		$related["autores"] = array();
		foreach ($info["authors"] as $nome) {
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
		foreach ($info["categories"] as $nome) {
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
			$imagem = VolumeImagem::firstOrCreate([
				"id_volume" => $volume->id,
				"tamanho" => VolumeImagem::TAMANHO_THUMB,
				"caminho" => $info["imageLinks"]["thumbnail"]
			]);
			$related["imagens"][VolumeImagem::TAMANHO_THUMB] = $imagem;
		}
		if ($info["imageLinks"]["smallThumbnail"]) {
			$imagem = VolumeImagem::firstOrCreate([
				"id_volume" => $volume->id,
				"tamanho" => VolumeImagem::TAMANHO_THUMB_SM,
				"caminho" => $info["imageLinks"]["smallThumbnail"]
			]);
			$related["imagens"][VolumeImagem::TAMANHO_THUMB_SM] = $imagem;
		}

		return array_merge($volume->toArray(), $related);
	}

}