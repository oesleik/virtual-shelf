<?php

namespace Services;

abstract class Services {

	const SUCCESS = 200;
	const ERROR = 400;

	protected function parseResponse($res, $response, $status = self::SUCCESS) {
		$result = [];

		if ($status == self::ERROR) {
			$result["error"] = $response;
			$result["status"] = self::ERROR;
		} else {
			$result["message"] = $response;
			$result["status"] = self::SUCCESS;
		}

		return $res->withJson($result, $result["status"]);
	}

}