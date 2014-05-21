<?php

	error_reporting(E_ALL);
	ini_set('display_errors',1);
	require_once 'ApiCaller.php';
	
	$search_param = strip_tags($_GET['search_param']);
    $apicaller = new ApiCaller("http://localhost:5000/api/0.1/json/$search_param}");
    $cases = $apicaller->sendRequest('2014-03-10','date');

?>
<!DOCTYPE html>
<html>
	<head>
	    <title>CODe</title>
	    <meta charset="utf-8" />
	    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.5.4/bootstrap-select.min.css" type="text/css" />
	    <link rel="stylesheet" href="style.css" type="text/css" />
	    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css" type="text/css" />
	    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css" type="text/css" />
	    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/css/base/jquery-ui.css" type="text/css" />
	    <style>
	    .form-control{width:30%;}
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
	    <div class="container">
	        <div class="row">
	            <div class="col-xs-8 col-xs-offset-2">
	            <form name="input" action="index.php" method="get">
					<div class="input-group">
						<div class="input-group-btn search-panel">
							<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
							<span id="search_concept">Filter by</span> <span class="caret"></span>
							</button>
						<ul class="dropdown-menu" role="menu">
						  <li><a href="#date">Date</a></li>
						  <li><a href="#ref">Ref</a></li>
						  <li><a href="#party">Party</a></li>
						  <li><a href="#judge">Judge</a></li>
						</ul>
						</div>
						<input type="hidden" name="search_param" value="all" id="search_param" />         
						<input type="text" id="search_bar" class="form-control" name="param" placeholder="Search term..." />
						<span class="input-group-btn">
							<button class="btn btn-default" type="submit"><span class="glyphicon glyphicon-search"></span></button>
						</span
					</div>
				</form>
				</div>
			</div>
		</div>
		
	    <div class="container theme-showcase">
	    <div class="page-header">
	          <h1>Result</h1>
	    </div>

        <?php if(count($cases)===0): ?>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6"><h3>No Cases Found </h3> </div>
                <div class="col-md-3"></div>
            </div>
        <?php endif; ?>
        <div class="container">
			<h2>Normal</h2>
			<div class="row form-group product-chooser">
		
					<?php
						foreach($cases['response'] as $case_obj) {
							if(isset($case_obj['pdf'])){
								$link = "http://www.justiceservices.gov.mt/courtservices/Judgements/" . $case_obj['pdf'];
							} else {
								$link = "#";
							}
					?>

						<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
							<div class="product-chooser-item selected">
								<div class="col-xs-8 col-sm-8 col-md-12 col-lg-12">
									<span class="title"><?php echo $case_obj['reference']; ?></span>
									<b>Date: </b><span class="description"><?php echo $case_obj['date']; ?></span><br>
									<b>Court: </b><span class="description"><?php echo $case_obj['court']; ?></span><br>
									<b>Judge: </b><span class="description"><?php echo $case_obj['judge']; ?></span><br>
									<b>Prosecutor: </b><span class="description"><?php echo $case_obj['prosecutor']; ?></span><br>
									<b>Defendant: </b><span class="description"><?php echo $case_obj['defendant']; ?></span><br>
									<br><br>
										
									<a href="<?php echo $link; ?>" <img src="pdf-download.png" height="50px" width="200px"/></a>
								
									<input type="radio" name="product" value="mobile_desktop" checked="checked">
								</div>
								<div class="clear"></div>
							</div>
						</div>
					<?php } ?>
			</div>
		</div>		
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
        <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.5.4/bootstrap-select.min.js"></script>
        <script src="main.js"></script>    
    </body>
</html>    
 
