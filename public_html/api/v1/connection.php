<?php
use \Illuminate\Container\Container;
use \Illuminate\Database\ConnectionResolver;
use \Illuminate\Database\Connectors\ConnectionFactory;
use \Illuminate\Database\Eloquent\Model;

startConnection(require Config::get("root") . "database.php");

function startConnection($settings) {
	$container = new Container();

	$factory = new ConnectionFactory($container);
	$connection = $factory->make($settings);

	$resolver = new ConnectionResolver();
	$resolver->addConnection("default", $connection);
	$resolver->setDefaultConnection("default");

	Model::setConnectionResolver($resolver);
}