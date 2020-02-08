<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache');

$input = json_decode(file_get_contents('php://input'));

//Функция для http get запроса
function getData($url, $data, $headers) {
	$curl = curl_init();
	curl_setopt_array($curl, [
		CURLOPT_RETURNTRANSFER	=>	true,
		CURLOPT_HEADER			=>	false,
		CURLOPT_CONNECTTIMEOUT	=>	5,
		CURLOPT_HTTPHEADER		=>	$headers,
		CURLOPT_URL				=>	$url . '?' . http_build_query($data),
	]);
	$result = curl_exec($curl);
	$error = curl_error($curl);
	$code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	curl_close($curl);
	
	if($code != 200) {
		http_response_code(500);
		exit;
	}
	
	return $result;
}

//Вывод информации о почтовом отделении
if (!empty($input->zipcode)) {
	
	$url = 'https://www.pochta.ru/portal-portlet/delegate/postoffice-api/method/offices.find.byCode';
	$data = [
		'postalCode' => $input->zipcode,
	];
	$headers = [
		'User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0',
		'Accept: application/json',
		'X-Requested-With: XMLHttpRequest',
		'Referer: https://www.pochta.ru/offices',
		'Cookie: PORTAL_LANGUAGE=ru_RU',
		'Connection: close',
	];
	
	echo getData($url, $data, $headers);
	exit;
	
//Вывод информации о почтовом отправлении
} elseif (!empty($input->barcode)) {
	
	$url = 'https://www.pochta.ru/tracking';
	$data = [
		'p_p_id' => 'trackingPortlet_WAR_portalportlet',
		'p_p_lifecycle' => '2',
		'p_p_state' => 'normal',
		'p_p_mode' => 'view',
		'p_p_resource_id' => 'getList',
		'p_p_cacheability' => 'cacheLevelPage',
		'p_p_col_id' => 'column-1',
		'p_p_col_pos' => '1',
		'p_p_col_count' => '2',
		'barcodeList' => $input->barcode,
	];
	$headers = [
		'User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0',
		'Accept: application/json',
		'X-Requested-With: XMLHttpRequest',
		'Referer: https://www.pochta.ru/tracking',
		'Cookie: PORTAL_LANGUAGE=ru_RU',
		'Connection: close',
	];
	
	echo getData($url, $data, $headers);
	exit;
}

http_response_code(400);
echo '[]';
exit;
