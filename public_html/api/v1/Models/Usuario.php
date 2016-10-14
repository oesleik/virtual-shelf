<?php

namespace Models;

use \Illuminate\Database\Eloquent\Model;

class Usuario extends Model {

	protected $table = "usuario";
	protected $guarded = [];

	public $timestamps = false;

}