<?php


	$client = '715810b082074d829cb28760ae4b4723';
	$secret = '49e47697724a49c2bead7ac21f20a5b8';
	$state = $_REQUEST['state'];
	$code = $_REQUEST['code'];
	
	$post = [
		'client_id' => '715810b082074d829cb28760ae4b4723',
		'client_secret' => '49e47697724a49c2bead7ac21f20a5b8',
		'code' => urlencode($code),
	];
	
	try 
	{
		$ch = curl_init('https://todoist.com/oauth/access_token');
		
		if (FALSE === $ch)
			throw new Exception('failed to initialize');	
		
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                            
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
		curl_setopt($ch, CURLOPT_CAINFO, 'C:/xampp/htdocs/cert/cacert.crt');
		
		//execute post
		$response = curl_exec($ch);
		
		if (FALSE === $response)
			throw new Exception(curl_error($ch), curl_errno($ch));

		//close connection
		curl_close($ch);

		var_dump($response);
		
	} catch(Exception $e) {

		trigger_error(sprintf(
			'Curl failed with error #%d: %s',
			$e->getCode(), $e->getMessage()),
			E_USER_ERROR);

	}
?>