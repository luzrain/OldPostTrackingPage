<?
require_once("reqognize.php");






function GetCaptchaImg() {
	$curl = curl_init();
	curl_setopt_array($curl, array(
	    CURLOPT_RETURNTRANSFER => true,
	    CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_HEADER => false,
		CURLOPT_CONNECTTIMEOUT => 10,
		CURLOPT_HTTPHEADER => array('User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:30.0) Gecko/20100101 Firefox/30.0',
									'Referer: http://www.russianpost.ru/Tracking20/',
									'Connection: keep-alive'),
		CURLOPT_URL => 'http://www.russianpost.ru/Tracking20/Code/Code.png.ashx',
		CURLOPT_HEADER => true
	));
	$result = curl_exec($curl);
	
	$headers = substr($result, 0, curl_getinfo($curl, CURLINFO_HEADER_SIZE));
	$img = substr($result, curl_getinfo($curl, CURLINFO_HEADER_SIZE));
	$http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	curl_close($curl);

	/* Формирование строки cookie */
	$cookiestr = '';
	preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $headers, $m);
	foreach ($m[1] as $cook) $cookiestr .= $cook.'; ';
	$cookiestr = substr($cookiestr, 0, -2);
	/* Формирование строки cookie */

	if($http_code != 200) return false;
	else return array($img, $cookiestr);
}




function GetTrackData($track, $cookie, $code) {
	$curl = curl_init();
	curl_setopt_array($curl, array(
	    CURLOPT_RETURNTRANSFER => true,
	    CURLOPT_SSL_VERIFYPEER => false,
		CURLOPT_SSL_VERIFYHOST => false,
		CURLOPT_HEADER => false,
		CURLOPT_CONNECTTIMEOUT => 10,
		CURLOPT_HTTPHEADER => array('User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:30.0) Gecko/20100101 Firefox/30.0',
									'Referer: http://www.russianpost.ru/Tracking20/',
									'Cookie: '.$cookie,
									'Connection: keep-alive'),
		CURLOPT_URL => 'http://www.russianpost.ru/Tracking20/OperationHistory.js.aspx?Id='.$track.'&Code='.$code.'&Language=Russian'
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

if(!isset($_GET['id']) || empty($_GET['id'])) exit('{"Status":"ParamsError", }');
$tracknumber = trim($_GET['id']);

$tmp = GetCaptchaImg();
if(!$tmp) exit('{"Status":"CurlError1"}');
$CaptchaImg = imagecreatefromstring($tmp[0]);
$CapcthaCookie = $tmp[1];              //Куки, устанавливаемые капчей
$CaptchaCode = ocr_image($CaptchaImg); //Код капчи

$tmp = GetTrackData($tracknumber, $CapcthaCookie, $CaptchaCode);
if(!$tmp) exit('{"Status":"CurlError2"}');

echo $tmp;

?>