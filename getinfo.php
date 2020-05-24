<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache');

$barcode = isset($_POST['barcode']) ? $_POST['barcode'] : null;

//Функция для http get запроса
function getData($url, $data, $headers) {
	$curl = curl_init();
	curl_setopt_array($curl, [
		CURLOPT_URL				=> $url,
		CURLOPT_RETURNTRANSFER	=> true,
		CURLOPT_HEADER			=> false,
		CURLOPT_CONNECTTIMEOUT	=> 5,
		CURLOPT_POST			=> true,
		CURLOPT_POSTFIELDS		=> http_build_query($data),
		CURLOPT_HTTPHEADER		=> $headers,
		CURLOPT_SSL_VERIFYPEER	=> false,
	]);
	$result = curl_exec($curl);
	curl_close($curl);
	return $result;
}

//Вывод информации о почтовом отправлении
if (!empty($barcode)) {
	
	$url = 'https://www.pochta.ru/tracking?' . http_build_query([
		'p_p_id' => 'trackingPortlet_WAR_portalportlet',
		'p_p_lifecycle' => '2',
		'p_p_state' => 'normal',
		'p_p_mode' => 'view',
		'p_p_resource_id' => 'tracking.get-by-barcodes',
		'p_p_cacheability' => 'cacheLevelPage',
		'p_p_col_id' => 'column-1',
		'p_p_col_pos' => '1',
		'p_p_col_count' => '1',
	]);
	$data = [
		'barcodes' => $barcode,
	];
	$headers = [
		'User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:70.0) Gecko/20100101 Firefox/76.0',
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
