<?php

return [
	"driver" => "mysql",
	"host" => Config::get("db_host"),
	"database" => Config::get("db_database"),
	"username" => Config::get("db_username"),
	"password" => Config::get("db_password"),
	"charset"   => "utf8",
	"collation" => "utf8_unicode_ci",
	"prefix"    => "",
];