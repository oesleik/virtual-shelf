<?php

namespace Models;

use \Illuminate\Database\Eloquent\Model;

class ComentarioModeracao extends Model {

	protected $table = "comentario_moderacao";
	protected $guarded = [];

	public $timestamps = false;

}