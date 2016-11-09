<?php

namespace Models;

use \Illuminate\Database\Eloquent\Model;

class VolumeImagem extends Model {

	const TAMANHO_THUMB = "thumb";
	const TAMANHO_THUMB_SM = "thumb_sm";

	protected $table = "volume_imagem";
	protected $guarded = [];

	public $timestamps = false;

}