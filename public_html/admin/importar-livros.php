<?php

require "../../config.php";

$service = Utils\getGoogleBooksService();

// Google_Service_Books_VolumeSearchInfo
// Google_Service_Books_VolumeVolumeInfo
// Google_Service_Books_VolumeLayerInfo

// $results = $service->volumes->listVolumes("harry potter");
$results = $service->volumes->get("gCtazG4ZXlQC");
// $results = $service->volumes_associated->listVolumesAssociated("gCtazG4ZXlQC");

var_dump($results);
// foreach ($results as $item) {
// 	var_dump($item);
// 	// var_dump($item["volumeInfo"]["industryIdentifiers"]);
// }

// var_dump($results);
