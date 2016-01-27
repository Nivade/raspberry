<!doctype html>

<?php

$url = "https://todoist.com/oauth/authorize?";
$client = "715810b082074d829cb28760ae4b4723";
$scope = "task:add,data:read_write,data:delete,project:delete";
$state = "hopfersaksen"; 
$secret = "49e47697724a49c2bead7ac21f20a5b8";
//$data['state'] = "49e47697724a49c2bead7ac21f20a5b8"; 

$fields = array(
	'client_id' => urlencode($client),
	'scope' => urlencode($scope),
	'state' => urlencode($state)
);

//url-ify the data for the POST
$fields_string = "";
foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
rtrim($fields_string, '&');

header('Location: '.$url.''.$fields_string);



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