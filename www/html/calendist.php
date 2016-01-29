<!doctype html>

<?php

	$auth_url = "https://todoist.com/oauth/authorize?";
	$client = "715810b082074d829cb28760ae4b4723";
	$scope = "task:add,data:read_write,data:delete,project:delete";
	$state = "hopfersaksen";

	$parameters = array(
		'client_id' => urlencode($client),
		'scope' => urlencode($scope),
		'state' => urlencode($state)
	);

	//url-ify the data for the POST
	$param_string = "";
	foreach($parameters as $key=>$value) 
	{ 
		$param_string .= $key.'='.$value.'&'; 
	}

	rtrim($param_string, '&');

?>

<html>

	<head>
		<title>Calendist</title>
		<link rel="stylesheet" type="text/css" href="style.css" />
	</head>
	
	<body>
		<input 	type="button" onclick="location.href='<?php echo $url.''.$fields_string; ?>';" value="Authorize Todoist" />
		<button type="button">Connect Google Calendar</button>
	</body>

</html>