<?




function GetTrackData($track) {
	$curl = curl_init();
	curl_setopt_array($curl, array(
	    CURLOPT_RETURNTRANSFER => true,
	    CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_HEADER => false,
		CURLOPT_CONNECTTIMEOUT => 10,
		CURLOPT_HTTPHEADER => array('User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
									'Referer: https://www.pochta.ru/tracking',
									'Connection: keep-alive'),
		CURLOPT_URL => 'https://www.pochta.ru/tracking?p_p_id=trackingPortlet_WAR_portalportlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=getList&p_p_cacheability=cacheLevelPage&p_p_col_id=column-1&p_p_col_pos=1&p_p_col_count=2&barcodeList='.$track
	));
	$result = curl_exec($curl);
	$http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	curl_close($curl);

	if($http_code != 200) return false;
	else return $result;
}












//Вывод json данных
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache');

//exit('{"list":[]}');

if(!isset($_GET['id']) || empty($_GET['id'])) exit('{"Status":"ParamsError"}');

$tracknumber = trim($_GET['id']);

$result = GetTrackData($tracknumber);

if(!$result) exit('{"LocalError":"CurlError"}');

echo $result;

?>