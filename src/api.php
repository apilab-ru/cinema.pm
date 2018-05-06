<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('content-type: application/json; charset=utf-8');

$action = $_REQUEST['action'];

$request = $_REQUEST['request'];

$data = file_get_contents('php://input');
if($data){
  $request = json_decode($data);
}

$api = "http://prokat-palatok.ru/crm2/";

$f = file_get_contents($api . $action . ".php?request=" . urlencode(json_encode($request)));

echo trim($f);
