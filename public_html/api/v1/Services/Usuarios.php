<?php

namespace Services;

class Usuarios {

	public function get($request, $response) {
		return $response->withJson(['message' => 'Hello, ' . $request->getAttribute('id')], 200);
	}

}