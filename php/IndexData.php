<?



function GetData($id) {
	$curl = curl_init();
	curl_setopt_array($curl, array(
	    CURLOPT_RETURNTRANSFER => true,
	    CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_HEADER => false,
		CURLOPT_CONNECTTIMEOUT => 10,
		CURLOPT_HTTPHEADER => array('User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
									'Referer: https://www.pochta.ru/post-index',
									'Connection: keep-alive'),
		CURLOPT_URL => 'https://www.pochta.ru/portal-portlet/delegate/postoffice-api/method/offices.find.byCode?postalCode='.$id
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

if(!isset($_GET['id']) || empty($_GET['id'])) exit('{"Status":"ParamsError"}');

$tracknumber = trim($_GET['id']);

$result = GetData($tracknumber);

if(!$result) exit('{"LocalError":"CurlError"}');

echo $result;

?>