<?php

namespace Models;

use \Illuminate\Database\Eloquent\Model;

class Login extends Model {

	protected $table = "login";
	protected $guarded = [];

	public $timestamps = false;

}