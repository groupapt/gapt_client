<?php

error_reporting(E_ALL);
ini_set('display_errors',1);
session_start();
include_once 'ApiCaller.php';
 
    $apicaller = new ApiCaller('http://localhost:5000/code/api/v1.0/cases/date/json/');
    $cases = $apicaller->sendRequest('2014-03-10','date');

?>
<!DOCTYPE html>
<html>
<head>
  <title>CODe</title>
    <link rel="stylesheet" href="style.css" type="text/css" />
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css" type="text/css" />
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/css/base/jquery-ui.css" type="text/css" />
    <style>
        #newtodo_window
        {
            text-align: left;
            display:none;
        }
        .spacer
        {
            margin-top:10px;
        }
    </style>
</head>
<body>
    <div class ="navbar navbar-default" role="navigation" >
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.php">CODe</a>
         </div>  
        <div class ="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="logout.php">Logout</a></li>
            </ul>
        </div>
    </div>  
    <div class="container theme-showcase">
    <div class="page-header">
          <h1>Result</h1>
    </div>
        <div class="text-right">
            <button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#newtodo_window">
                Create a new TODO item
            </button>
            <div class="spacer"></div>
            <div id="newtodo_window" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style ="background-color:#FFFFB2">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" >Create a new TODO item</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php if(count($cases)===0): ?>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6"><h3>NO Cases Returned </h3> </div>
                <div class="col-md-3"></div>
            </div>
        <?php endif; ?>
	
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
        <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min.js"></script>
        
        <script>

        </script>    
    </body>
</html>    
 
