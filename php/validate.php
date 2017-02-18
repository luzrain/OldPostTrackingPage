<?PHP
/*
Проверка почтового идентификатора на валидность
*/


if(!isset($_GET['code'])) exit();

$code = $_GET['code'];


if(preg_match("/^\d{14}$/", $code)) {
	//внутрироссийский почтовый идентификатор

	$tmp = 0;
	for($i=0; $i<12; $i+=2) $tmp += $code[$i];
	$tmp *= 3;
	for($i=1; $i<12; $i+=2) $tmp += $code[$i];

	$key = 10 - $tmp % 10;

	if($code[13] == $key) echo "OK";
	exit;


} else if(preg_match("/^[a-zA-Z]{2}\d{9}[a-zA-Z]{2}$/", $code)) {
	//Международный почтовый идентификатор

	$tmp = 0;
	$tmp = $code[2]*8 + $code[3]*6 + $code[4]*4 + $code[5]*2 + $code[6]*3 + $code[7]*5 + $code[8]*9 + $code[9]*7;

	$key = 11 - $tmp % 11;

	if($code[10] == $key) echo "OK";
	exit;
}






?>