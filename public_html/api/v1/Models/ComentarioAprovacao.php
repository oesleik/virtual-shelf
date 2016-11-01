<?php

namespace Models;

use \Illuminate\Database\Eloquent\Model;

class ComentarioAprovacao extends Model {

	protected $table = "comentario_aprovacao";
	protected $guarded = [];

	public $timestamps = false;

}