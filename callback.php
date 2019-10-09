<?php

define('CLIENT_ID',  'b86fdc8d2ff6d5f7f394');
define('CLIENT_SECRET', 'd107ded4b914154e25d30c1dd9cd1fbf58e2abe9');

$code = $_GET['code'];

function curl_load_file( $url, $post_string = null, $request_type = 'POST', $header_parms = null ) {
	 // create curl resource
	$ch = curl_init();

	// set url
	curl_setopt($ch, CURLOPT_URL, $url);

	//return the transfer as a string
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	
    curl_setopt($ch, CURLOPT_TIMEOUT, 180); 

	curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');
	
	if ($request_type == 'POST') {
		curl_setopt($ch, CURLOPT_POST, 1);
	} else {
		// request_type could be PUT or DELETE
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $request_type);
	}
	
	if ($request_type != 'DELETE') {
		curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_string) );
	}
	
	// set up http header fields
	$headers = $header_parms ? $header_parms : array(
		'Accept: application/json'
	);
	
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	
	// add code to accept https certificate
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	// $output contains the output string
	$output = curl_exec($ch);
	// close curl resource to free up system resources
	curl_close($ch); 
	return $output;
}

$url = 'https://github.com/login/oauth/access_token';

$post_data = array(
	'client_id' => CLIENT_ID,
	'client_secret' => CLIENT_SECRET,
	'code' => $code
);


$ret = curl_load_file($url, $post_data, 'POST');

/*
echo '***';
var_dump($ret);
echo '###<br>';
*/

$tmp = json_decode($ret);
$token = $tmp->access_token;
header('Location: http://localhost:3000/github/callback?token=' . $token);

//echo 'access token: ', $token;
/*
$headers = array(
	'Accept: application/json',
	'Authorization: token ' . $token
);
$user_url = 'https://api.github.com/user?access_token=' . $token;
//$ret = file($user_url);

$ret = curl_load_file($user_url, array(), 'GET', $headers);
echo '<br>user return: <br>';
var_dump($ret);

$email_url = 'https://api.github.com/user/emails?access_token=' . $token;
//$ret = file($user_url);

$ret = curl_load_file($email_url, array(), 'GET', $headers);
echo '<br>Email return: <br>';
var_dump($ret);


die();*/