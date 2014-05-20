<?php

    error_reporting(E_ALL);
    ini_set('display_errors',1);
    session_start();
    require_once 'ApiCaller.php';
 
    $apicaller = new ApiCaller('http://localhost:5000/api/0.1/json/');
    $cases = $apicaller->sendRequest('2014-03-10','date');

    header('Location: result.php');

?>