<?
//OCR для почты России на июнь 2013
//автор sunstudent@yandex.ru

ini_set('error_reporting', E_ERROR);
//--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*
//Блок с шаблонами написания цифер для OCR
//--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*
//Шаблон для цифры 0
//******************************************************************************
//Вариант 1
$mask[0][0][0]['x']=0; $mask[0][0][0]['y']=0;
$mask[0][0][1]['x']=3; $mask[0][0][1]['y']=0;
$mask[0][0][2]['x']=5; $mask[0][0][2]['y']=1;
$mask[0][0][3]['x']=6; $mask[0][0][3]['y']=2;
$mask[0][0][4]['x']=6; $mask[0][0][4]['y']=4;
$mask[0][0][5]['x']=7; $mask[0][0][5]['y']=5;
$mask[0][0][6]['x']=6; $mask[0][0][6]['y']=9;
$mask[0][0][7]['x']=5; $mask[0][0][7]['y']=12;
$mask[0][0][8]['x']=4; $mask[0][0][8]['y']=13;
$mask[0][0][9]['x']=2; $mask[0][0][9]['y']=14;
$mask[0][0][10]['x']=0; $mask[0][0][10]['y']=13;
$mask[0][0][11]['x']=-2; $mask[0][0][11]['y']=11;
$mask[0][0][12]['x']=-3; $mask[0][0][12]['y']=7;
$mask[0][0][13]['x']=-2; $mask[0][0][13]['y']=2;
$mask[0][0][14]['x']=3; $mask[0][0][14]['y']=4;
$mask[0][0][15]['x']=3; $mask[0][0][15]['y']=9;
$mask[0][0][16]['x']=1; $mask[0][0][16]['y']=9;
$mask[0][0][17]['x']=1; $mask[0][0][17]['y']=4;

//Вариант 2
$mask[0][1][0]['x']=0; $mask[0][1][0]['y']=0;
$mask[0][1][1]['x']=1; $mask[0][1][1]['y']=-1;
$mask[0][1][2]['x']=4; $mask[0][1][2]['y']=0;
$mask[0][1][3]['x']=6; $mask[0][1][3]['y']=1;
$mask[0][1][4]['x']=6; $mask[0][1][4]['y']=2;
$mask[0][1][5]['x']=7; $mask[0][1][5]['y']=4;
$mask[0][1][6]['x']=7; $mask[0][1][6]['y']=11;
$mask[0][1][7]['x']=6; $mask[0][1][7]['y']=13;
$mask[0][1][8]['x']=4; $mask[0][1][8]['y']=15;
$mask[0][1][9]['x']=0; $mask[0][1][9]['y']=15;
$mask[0][1][10]['x']=-1; $mask[0][1][10]['y']=14;
$mask[0][1][11]['x']=-2; $mask[0][1][11]['y']=13;
$mask[0][1][12]['x']=-3; $mask[0][1][12]['y']=7;
$mask[0][1][13]['x']=-2; $mask[0][1][13]['y']=2;
$mask[0][1][14]['x']=-1; $mask[0][1][14]['y']=1;
$mask[0][1][15]['x']=1; $mask[0][1][15]['y']=4;
$mask[0][1][16]['x']=3; $mask[0][1][16]['y']=5;
$mask[0][1][17]['x']=3; $mask[0][1][17]['y']=11;
$mask[0][1][18]['x']=1; $mask[0][1][18]['y']=11;

//******************************************************************************

//Шаблон для цифры 1
//******************************************************************************
//Вариант 1
$mask[1][0][0]['x']=0; $mask[1][0][0]['y']=0;
$mask[1][0][1]['x']=5; $mask[1][0][1]['y']=0;
$mask[1][0][2]['x']=6; $mask[1][0][2]['y']=0;
$mask[1][0][3]['x']=5; $mask[1][0][3]['y']=1;
$mask[1][0][4]['x']=5; $mask[1][0][4]['y']=10;
$mask[1][0][5]['x']=7; $mask[1][0][5]['y']=10;
$mask[1][0][6]['x']=7; $mask[1][0][6]['y']=11;
$mask[1][0][7]['x']=7; $mask[1][0][7]['y']=13;
$mask[1][0][8]['x']=6; $mask[1][0][8]['y']=14;
$mask[1][0][9]['x']=3; $mask[1][0][9]['y']=14;
$mask[1][0][10]['x']=0; $mask[1][0][10]['y']=14;
$mask[1][0][11]['x']=-1; $mask[1][0][11]['y']=13;
$mask[1][0][12]['x']=-1; $mask[1][0][12]['y']=11;
$mask[1][0][13]['x']=0; $mask[1][0][13]['y']=10;
$mask[1][0][14]['x']=1; $mask[1][0][14]['y']=10;
$mask[1][0][15]['x']=1; $mask[1][0][15]['y']=7;
$mask[1][0][16]['x']=1; $mask[1][0][16]['y']=3;
$mask[1][0][17]['x']=0; $mask[1][0][17]['y']=2;
$mask[1][0][18]['x']=0; $mask[1][0][18]['y']=1;

//Вариант 2
$mask[1][1][0]['x']=0; $mask[1][1][0]['y']=0;
$mask[1][1][1]['x']=1; $mask[1][1][1]['y']=-1;
$mask[1][1][2]['x']=4; $mask[1][1][2]['y']=-1;
$mask[1][1][3]['x']=5; $mask[1][1][3]['y']=1;
$mask[1][1][4]['x']=5; $mask[1][1][4]['y']=5;
$mask[1][1][5]['x']=5; $mask[1][1][5]['y']=10;
$mask[1][1][6]['x']=7; $mask[1][1][6]['y']=10;
$mask[1][1][7]['x']=7; $mask[1][1][7]['y']=11;
$mask[1][1][8]['x']=7; $mask[1][1][8]['y']=14;
$mask[1][1][9]['x']=6; $mask[1][1][9]['y']=15;
$mask[1][1][10]['x']=-1; $mask[1][1][10]['y']=15;
$mask[1][1][11]['x']=-2; $mask[1][1][11]['y']=14;
$mask[1][1][12]['x']=-2; $mask[1][1][12]['y']=11;
$mask[1][1][13]['x']=-1; $mask[1][1][13]['y']=10;
$mask[1][1][14]['x']=1; $mask[1][1][14]['y']=10;
$mask[1][1][15]['x']=1; $mask[1][1][15]['y']=3;
$mask[1][1][16]['x']=-1; $mask[1][1][16]['y']=3;
$mask[1][1][17]['x']=-1; $mask[1][1][17]['y']=1;
//******************************************************************************

//Шаблон для цифры 2
//******************************************************************************
//Вариант 1
$mask[2][0][0]['x']=0; $mask[2][0][0]['y']=0;
$mask[2][0][1]['x']=1; $mask[2][0][1]['y']=-1;
$mask[2][0][2]['x']=5; $mask[2][0][2]['y']=-1;
$mask[2][0][3]['x']=6; $mask[2][0][3]['y']=0;
$mask[2][0][4]['x']=7; $mask[2][0][4]['y']=3;
$mask[2][0][5]['x']=6; $mask[2][0][5]['y']=6;
$mask[2][0][6]['x']=5; $mask[2][0][6]['y']=8;
$mask[2][0][7]['x']=4; $mask[2][0][7]['y']=9;
$mask[2][0][8]['x']=5; $mask[2][0][8]['y']=10;
$mask[2][0][9]['x']=7; $mask[2][0][9]['y']=9;
$mask[2][0][10]['x']=7; $mask[2][0][10]['y']=12;
$mask[2][0][11]['x']=6; $mask[2][0][11]['y']=13;
$mask[2][0][12]['x']=-1; $mask[2][0][12]['y']=13;
$mask[2][0][13]['x']=0; $mask[2][0][13]['y']=10;
$mask[2][0][14]['x']=1; $mask[2][0][14]['y']=9;
$mask[2][0][15]['x']=2; $mask[2][0][15]['y']=7;
$mask[2][0][16]['x']=4; $mask[2][0][16]['y']=4;
$mask[2][0][17]['x']=4; $mask[2][0][17]['y']=2;
$mask[2][0][18]['x']=1; $mask[2][0][18]['y']=2;
$mask[2][0][19]['x']=-2; $mask[2][0][19]['y']=4;
$mask[2][0][20]['x']=-1; $mask[2][0][20]['y']=1;

//Вариант 2
$mask[2][1][0]['x']=0; $mask[2][1][0]['y']=0;
$mask[2][1][1]['x']=4; $mask[2][1][1]['y']=-1;
$mask[2][1][2]['x']=5; $mask[2][1][2]['y']=0;
$mask[2][1][3]['x']=7; $mask[2][1][3]['y']=1;
$mask[2][1][4]['x']=7; $mask[2][1][4]['y']=5;
$mask[2][1][5]['x']=6; $mask[2][1][5]['y']=6;
$mask[2][1][6]['x']=5; $mask[2][1][6]['y']=8;
$mask[2][1][7]['x']=4; $mask[2][1][7]['y']=9;
$mask[2][1][8]['x']=4; $mask[2][1][8]['y']=10;
$mask[2][1][9]['x']=7; $mask[2][1][9]['y']=11;
$mask[2][1][10]['x']=6; $mask[2][1][10]['y']=15;
$mask[2][1][11]['x']=-1; $mask[2][1][11]['y']=15;
$mask[2][1][12]['x']=-1; $mask[2][1][12]['y']=12;
$mask[2][1][13]['x']=0; $mask[2][1][13]['y']=10;
$mask[2][1][14]['x']=1; $mask[2][1][14]['y']=9;
$mask[2][1][15]['x']=2; $mask[2][1][15]['y']=7;
$mask[2][1][16]['x']=3; $mask[2][1][16]['y']=5;
$mask[2][1][17]['x']=3; $mask[2][1][17]['y']=2;
$mask[2][1][18]['x']=1; $mask[2][1][18]['y']=2;
$mask[2][1][19]['x']=-1; $mask[2][1][19]['y']=4;
$mask[2][1][20]['x']=-2; $mask[2][1][20]['y']=1;
//******************************************************************************

//Шаблон для цифры 3
//******************************************************************************
//Вариант 1
$mask[3][0][0]['x']=0; $mask[3][0][0]['y']=0;
$mask[3][0][1]['x']=1; $mask[3][0][1]['y']=-1;
$mask[3][0][2]['x']=6; $mask[3][0][2]['y']=-1;
$mask[3][0][3]['x']=7; $mask[3][0][3]['y']=0;
$mask[3][0][4]['x']=6; $mask[3][0][4]['y']=1;
$mask[3][0][5]['x']=5; $mask[3][0][5]['y']=3;
$mask[3][0][6]['x']=7; $mask[3][0][6]['y']=5;
$mask[3][0][7]['x']=7; $mask[3][0][7]['y']=10;
$mask[3][0][8]['x']=6; $mask[3][0][8]['y']=11;
$mask[3][0][9]['x']=5; $mask[3][0][9]['y']=12;
$mask[3][0][10]['x']=-1; $mask[3][0][10]['y']=13;
$mask[3][0][11]['x']=0; $mask[3][0][11]['y']=10;
$mask[3][0][12]['x']=3; $mask[3][0][12]['y']=10;
$mask[3][0][13]['x']=4; $mask[3][0][13]['y']=6;
$mask[3][0][14]['x']=3; $mask[3][0][14]['y']=5;
$mask[3][0][15]['x']=2; $mask[3][0][15]['y']=3;
$mask[3][0][16]['x']=-1; $mask[3][0][16]['y']=2;
$mask[3][0][17]['x']=1; $mask[3][0][17]['y']=4;

//Вариант 2
$mask[3][1][0]['x']=0; $mask[3][1][0]['y']=0;
$mask[3][1][1]['x']=7; $mask[3][1][1]['y']=0;
$mask[3][1][2]['x']=7; $mask[3][1][2]['y']=2;
$mask[3][1][3]['x']=6; $mask[3][1][3]['y']=4;
$mask[3][1][4]['x']=6; $mask[3][1][4]['y']=6;
$mask[3][1][5]['x']=8; $mask[3][1][5]['y']=7;
$mask[3][1][6]['x']=8; $mask[3][1][6]['y']=12;
$mask[3][1][7]['x']=7; $mask[3][1][7]['y']=14;
$mask[3][1][8]['x']=6; $mask[3][1][8]['y']=15;
$mask[3][1][9]['x']=0; $mask[3][1][9]['y']=15;
$mask[3][1][10]['x']=0; $mask[3][1][10]['y']=13;
$mask[3][1][11]['x']=4; $mask[3][1][11]['y']=12;
$mask[3][1][12]['x']=5; $mask[3][1][12]['y']=9;
$mask[3][1][13]['x']=4; $mask[3][1][13]['y']=8;
$mask[3][1][14]['x']=2; $mask[3][1][14]['y']=6;
$mask[3][1][15]['x']=2; $mask[3][1][15]['y']=4;
$mask[3][1][16]['x']=0; $mask[3][1][16]['y']=2;
$mask[3][1][17]['x']=-1; $mask[3][1][17]['y']=3;
//******************************************************************************

//Шаблон для цифры 4
//******************************************************************************
//Вариант 1
$mask[4][0][0]['x']=0; $mask[4][0][0]['y']=0;
$mask[4][0][1]['x']=1; $mask[4][0][1]['y']=-1;
$mask[4][0][2]['x']=2; $mask[4][0][2]['y']=-3;
$mask[4][0][3]['x']=3; $mask[4][0][3]['y']=-5;
$mask[4][0][4]['x']=4; $mask[4][0][4]['y']=-6;
$mask[4][0][5]['x']=5; $mask[4][0][5]['y']=-8;
$mask[4][0][6]['x']=9; $mask[4][0][6]['y']=-7;
$mask[4][0][7]['x']=9; $mask[4][0][7]['y']=1;
$mask[4][0][8]['x']=11; $mask[4][0][8]['y']=1;
$mask[4][0][9]['x']=10; $mask[4][0][9]['y']=3;
$mask[4][0][10]['x']=9; $mask[4][0][10]['y']=5;
$mask[4][0][11]['x']=6; $mask[4][0][11]['y']=8;
$mask[4][0][12]['x']=6; $mask[4][0][12]['y']=5;
$mask[4][0][13]['x']=0; $mask[4][0][13]['y']=5;
$mask[4][0][14]['x']=0; $mask[4][0][14]['y']=3;
$mask[4][0][15]['x']=5; $mask[4][0][15]['y']=-3;
$mask[4][0][16]['x']=4; $mask[4][0][16]['y']=-2;
$mask[4][0][17]['x']=2; $mask[4][0][17]['y']=1;
$mask[4][0][18]['x']=6; $mask[4][0][18]['y']=1;

//Вариант 2
$mask[4][1][0]['x']=0; $mask[4][1][0]['y']=0;
$mask[4][1][1]['x']=4; $mask[4][1][1]['y']=-1;
$mask[4][1][2]['x']=4; $mask[4][1][2]['y']=7;
$mask[4][1][3]['x']=5; $mask[4][1][3]['y']=8;
$mask[4][1][4]['x']=4; $mask[4][1][4]['y']=10;
$mask[4][1][5]['x']=2; $mask[4][1][5]['y']=13;
$mask[4][1][6]['x']=1; $mask[4][1][6]['y']=10;
$mask[4][1][7]['x']=-4; $mask[4][1][7]['y']=10;
$mask[4][1][8]['x']=-4; $mask[4][1][8]['y']=6;
$mask[4][1][9]['x']=-3; $mask[4][1][9]['y']=4;
$mask[4][1][10]['x']=-2; $mask[4][1][10]['y']=3;
$mask[4][1][11]['x']=-1; $mask[4][1][11]['y']=1;
$mask[4][1][12]['x']=0; $mask[4][1][12]['y']=3;
$mask[4][1][13]['x']=1; $mask[4][1][13]['y']=3;
$mask[4][1][14]['x']=1; $mask[4][1][14]['y']=7;
$mask[4][1][15]['x']=-2; $mask[4][1][15]['y']=7;
$mask[4][1][16]['x']=-2; $mask[4][1][16]['y']=6;
$mask[4][1][17]['x']=-1; $mask[4][1][17]['y']=5;
//******************************************************************************

//Шаблон для цифры 5
//******************************************************************************
//Вариант 1
$mask[5][0][0]['x']=0; $mask[5][0][0]['y']=0;
$mask[5][0][1]['x']=5; $mask[5][0][1]['y']=0;
$mask[5][0][2]['x']=6; $mask[5][0][2]['y']=1;
$mask[5][0][3]['x']=6; $mask[5][0][3]['y']=3;
$mask[5][0][4]['x']=2; $mask[5][0][4]['y']=3;
$mask[5][0][5]['x']=5; $mask[5][0][5]['y']=5;
$mask[5][0][6]['x']=6; $mask[5][0][6]['y']=6;
$mask[5][0][7]['x']=6; $mask[5][0][7]['y']=11;
$mask[5][0][8]['x']=4; $mask[5][0][8]['y']=13;
$mask[5][0][9]['x']=-1; $mask[5][0][9]['y']=13;
$mask[5][0][10]['x']=-1; $mask[5][0][10]['y']=10;
$mask[5][0][11]['x']=3; $mask[5][0][11]['y']=10;
$mask[5][0][12]['x']=3; $mask[5][0][12]['y']=8;
$mask[5][0][13]['x']=0; $mask[5][0][13]['y']=8;
$mask[5][0][14]['x']=0; $mask[5][0][14]['y']=3;
$mask[5][0][15]['x']=0; $mask[5][0][15]['y']=1;

//Вариант 2
$mask[5][1][0]['x']=0; $mask[5][1][0]['y']=0;
$mask[5][1][1]['x']=7; $mask[5][1][1]['y']=0;
$mask[5][1][2]['x']=6; $mask[5][1][2]['y']=4;
$mask[5][1][3]['x']=3; $mask[5][1][3]['y']=4;
$mask[5][1][4]['x']=3; $mask[5][1][4]['y']=5;
$mask[5][1][5]['x']=5; $mask[5][1][5]['y']=6;
$mask[5][1][6]['x']=7; $mask[5][1][6]['y']=8;
$mask[5][1][7]['x']=7; $mask[5][1][7]['y']=13;
$mask[5][1][8]['x']=5; $mask[5][1][8]['y']=15;
$mask[5][1][9]['x']=0; $mask[5][1][9]['y']=15;
$mask[5][1][10]['x']=-1; $mask[5][1][10]['y']=12;
$mask[5][1][11]['x']=4; $mask[5][1][11]['y']=11;
$mask[5][1][12]['x']=3; $mask[5][1][12]['y']=9;
$mask[5][1][13]['x']=-1; $mask[5][1][13]['y']=8;
$mask[5][1][14]['x']=0; $mask[5][1][14]['y']=5;
$mask[5][1][15]['x']=0; $mask[5][1][15]['y']=2;
//******************************************************************************


//Шаблон для цифры 6
//******************************************************************************
//Вариант 1
$mask[6][0][0]['x']=0; $mask[6][0][0]['y']=0;
$mask[6][0][1]['x']=4; $mask[6][0][1]['y']=1;
$mask[6][0][2]['x']=3; $mask[6][0][2]['y']=2;
$mask[6][0][3]['x']=2; $mask[6][0][3]['y']=4;
$mask[6][0][4]['x']=6; $mask[6][0][4]['y']=6;
$mask[6][0][5]['x']=5; $mask[6][0][5]['y']=12;
$mask[6][0][6]['x']=4; $mask[6][0][6]['y']=13;
$mask[6][0][7]['x']=-1; $mask[6][0][7]['y']=13;
$mask[6][0][8]['x']=-2; $mask[6][0][8]['y']=12;
$mask[6][0][9]['x']=-2; $mask[6][0][9]['y']=5;
$mask[6][0][10]['x']=-1; $mask[6][0][10]['y']=4;
$mask[6][0][11]['x']=0; $mask[6][0][11]['y']=2;
$mask[6][0][12]['x']=0; $mask[6][0][12]['y']=7;
$mask[6][0][13]['x']=3; $mask[6][0][13]['y']=7;
$mask[6][0][14]['x']=3; $mask[6][0][14]['y']=10;
$mask[6][0][15]['x']=0; $mask[6][0][15]['y']=10;

//Вариант 2
$mask[6][1][0]['x']=0; $mask[6][1][0]['y']=0;
$mask[6][1][1]['x']=4; $mask[6][1][1]['y']=-1;
$mask[6][1][2]['x']=4; $mask[6][1][2]['y']=0;
$mask[6][1][3]['x']=3; $mask[6][1][3]['y']=1;
$mask[6][1][4]['x']=2; $mask[6][1][4]['y']=3;
$mask[6][1][5]['x']=2; $mask[6][1][5]['y']=4;
$mask[6][1][6]['x']=5; $mask[6][1][6]['y']=5;
$mask[6][1][7]['x']=6; $mask[6][1][7]['y']=8;
$mask[6][1][8]['x']=5; $mask[6][1][8]['y']=13;
$mask[6][1][9]['x']=3; $mask[6][1][9]['y']=14;
$mask[6][1][10]['x']=-1; $mask[6][1][10]['y']=14;
$mask[6][1][11]['x']=-3; $mask[6][1][11]['y']=13;
$mask[6][1][12]['x']=-3; $mask[6][1][12]['y']=5;
$mask[6][1][13]['x']=-2; $mask[6][1][13]['y']=4;
$mask[6][1][14]['x']=-1; $mask[6][1][14]['y']=2;
$mask[6][1][15]['x']=0; $mask[6][1][15]['y']=8;
$mask[6][1][16]['x']=2; $mask[6][1][16]['y']=10;
$mask[6][1][17]['x']=0; $mask[6][1][17]['y']=10;
//******************************************************************************

//Шаблон для цифры 7
//******************************************************************************
//Вариант 1
$mask[7][0][0]['x']=0; $mask[7][0][0]['y']=0;
$mask[7][0][1]['x']=8; $mask[7][0][1]['y']=-1;
$mask[7][0][2]['x']=7; $mask[7][0][2]['y']=3;
$mask[7][0][3]['x']=6; $mask[7][0][3]['y']=6;
$mask[7][0][4]['x']=5; $mask[7][0][4]['y']=9;
$mask[7][0][5]['x']=3; $mask[7][0][5]['y']=13;
$mask[7][0][6]['x']=2; $mask[7][0][6]['y']=10;
$mask[7][0][7]['x']=3; $mask[7][0][7]['y']=7;
$mask[7][0][8]['x']=4; $mask[7][0][8]['y']=3;
$mask[7][0][9]['x']=4; $mask[7][0][9]['y']=2;
$mask[7][0][10]['x']=-1; $mask[7][0][10]['y']=2;
$mask[7][0][11]['x']=5; $mask[7][0][11]['y']=13;
$mask[7][0][12]['x']=1; $mask[7][0][12]['y']=-1;
$mask[7][0][13]['x']=7; $mask[7][0][13]['y']=5;
$mask[7][0][14]['x']=0; $mask[7][0][14]['y']=2;


//Вариант 2
$mask[7][1][0]['x']=0; $mask[7][1][0]['y']=0;
$mask[7][1][1]['x']=1; $mask[7][1][1]['y']=-1;
$mask[7][1][2]['x']=8; $mask[7][1][2]['y']=-1;
$mask[7][1][3]['x']=9; $mask[7][1][3]['y']=0;
$mask[7][1][4]['x']=8; $mask[7][1][4]['y']=3;
$mask[7][1][5]['x']=7; $mask[7][1][5]['y']=7;
$mask[7][1][6]['x']=6; $mask[7][1][6]['y']=10;
$mask[7][1][7]['x']=5; $mask[7][1][7]['y']=13;
$mask[7][1][8]['x']=3; $mask[7][1][8]['y']=15;
$mask[7][1][9]['x']=2; $mask[7][1][9]['y']=13;
$mask[7][1][10]['x']=3; $mask[7][1][10]['y']=9;
$mask[7][1][11]['x']=4; $mask[7][1][11]['y']=6;
$mask[7][1][12]['x']=4; $mask[7][1][12]['y']=3;
$mask[7][1][13]['x']=1; $mask[7][1][13]['y']=3;
$mask[7][1][14]['x']=0; $mask[7][1][14]['y']=2;
//******************************************************************************

//Шаблон для цифры 8
//******************************************************************************
//Вариант 1
$mask[8][0][0]['x']=0; $mask[8][0][0]['y']=0;
$mask[8][0][1]['x']=2; $mask[8][0][1]['y']=-1;
$mask[8][0][2]['x']=5; $mask[8][0][2]['y']=0;
$mask[8][0][3]['x']=6; $mask[8][0][3]['y']=2;
$mask[8][0][4]['x']=5; $mask[8][0][4]['y']=6;
$mask[8][0][5]['x']=6; $mask[8][0][5]['y']=12;
$mask[8][0][6]['x']=5; $mask[8][0][6]['y']=13;
$mask[8][0][7]['x']=3; $mask[8][0][7]['y']=14;
$mask[8][0][8]['x']=0; $mask[8][0][8]['y']=13;
$mask[8][0][9]['x']=-1; $mask[8][0][9]['y']=12;
$mask[8][0][10]['x']=0; $mask[8][0][10]['y']=6;
$mask[8][0][11]['x']=-1; $mask[8][0][11]['y']=2;
$mask[8][0][12]['x']=1; $mask[8][0][12]['y']=3;
$mask[8][0][13]['x']=4; $mask[8][0][13]['y']=5;
$mask[8][0][14]['x']=1; $mask[8][0][14]['y']=8;
$mask[8][0][15]['x']=4; $mask[8][0][15]['y']=11;
$mask[8][0][16]['x']=1; $mask[8][0][16]['y']=11;
$mask[8][0][17]['x']=4; $mask[8][0][17]['y']=8;
$mask[8][0][18]['x']=1; $mask[8][0][18]['y']=5;
$mask[8][0][19]['x']=4; $mask[8][0][19]['y']=3;

//Вариант 2
$mask[8][1][0]['x']=0; $mask[8][1][0]['y']=0;
$mask[8][1][1]['x']=4; $mask[8][1][1]['y']=0;
$mask[8][1][2]['x']=5; $mask[8][1][2]['y']=7;
$mask[8][1][3]['x']=6; $mask[8][1][3]['y']=14;
$mask[8][1][4]['x']=5; $mask[8][1][4]['y']=15;
$mask[8][1][5]['x']=2; $mask[8][1][5]['y']=16;
$mask[8][1][6]['x']=0; $mask[8][1][6]['y']=15;
$mask[8][1][7]['x']=-2; $mask[8][1][7]['y']=14;
$mask[8][1][8]['x']=-3; $mask[8][1][8]['y']=11;
$mask[8][1][9]['x']=-2; $mask[8][1][9]['y']=8;
$mask[8][1][10]['x']=-1; $mask[8][1][10]['y']=7;
$mask[8][1][11]['x']=-1; $mask[8][1][11]['y']=1;
$mask[8][1][12]['x']=1; $mask[8][1][12]['y']=4;
$mask[8][1][13]['x']=3; $mask[8][1][13]['y']=4;
$mask[8][1][14]['x']=3; $mask[8][1][14]['y']=5;
$mask[8][1][15]['x']=1; $mask[8][1][15]['y']=5;
$mask[8][1][16]['x']=1; $mask[8][1][16]['y']=10;
$mask[8][1][17]['x']=4; $mask[8][1][17]['y']=10;
$mask[8][1][18]['x']=4; $mask[8][1][18]['y']=12;
$mask[8][1][19]['x']=1; $mask[8][1][19]['y']=12;
//******************************************************************************

//Шаблон для цифры 9
//******************************************************************************
//Вариант 1
$mask[9][0][0]['x']=0; $mask[9][0][0]['y']=0;
$mask[9][0][1]['x']=1; $mask[9][0][1]['y']=-1;
$mask[9][0][2]['x']=5; $mask[9][0][2]['y']=-2;
$mask[9][0][3]['x']=6; $mask[9][0][3]['y']=-1;
$mask[9][0][4]['x']=7; $mask[9][0][4]['y']=0;
$mask[9][0][5]['x']=8; $mask[9][0][5]['y']=4;
$mask[9][0][6]['x']=7; $mask[9][0][6]['y']=8;
$mask[9][0][7]['x']=6; $mask[9][0][7]['y']=9;
$mask[9][0][8]['x']=5; $mask[9][0][8]['y']=11;
$mask[9][0][9]['x']=1; $mask[9][0][9]['y']=13;
$mask[9][0][10]['x']=2; $mask[9][0][10]['y']=11;
$mask[9][0][11]['x']=2; $mask[9][0][11]['y']=8;
$mask[9][0][12]['x']=0; $mask[9][0][12]['y']=7;
$mask[9][0][13]['x']=-1; $mask[9][0][13]['y']=4;
$mask[9][0][14]['x']=2; $mask[9][0][14]['y']=4;
$mask[9][0][15]['x']=3; $mask[9][0][15]['y']=2;
$mask[9][0][16]['x']=5; $mask[9][0][16]['y']=2;
$mask[9][0][17]['x']=5; $mask[9][0][17]['y']=4;

//Вариант 2
$mask[9][1][0]['x']=0; $mask[9][1][0]['y']=0;
$mask[9][1][1]['x']=2; $mask[9][1][1]['y']=-2;
$mask[9][1][2]['x']=4; $mask[9][1][2]['y']=-3;
$mask[9][1][3]['x']=7; $mask[9][1][3]['y']=-2;
$mask[9][1][4]['x']=8; $mask[9][1][4]['y']=-1;
$mask[9][1][5]['x']=9; $mask[9][1][5]['y']=2;
$mask[9][1][6]['x']=9; $mask[9][1][6]['y']=5;
$mask[9][1][7]['x']=8; $mask[9][1][7]['y']=8;
$mask[9][1][8]['x']=7; $mask[9][1][8]['y']=10;
$mask[9][1][9]['x']=6; $mask[9][1][9]['y']=12;
$mask[9][1][10]['x']=3; $mask[9][1][10]['y']=14;
$mask[9][1][11]['x']=2; $mask[9][1][11]['y']=12;
$mask[9][1][12]['x']=3; $mask[9][1][12]['y']=10;
$mask[9][1][13]['x']=1; $mask[9][1][13]['y']=8;
$mask[9][1][14]['x']=0; $mask[9][1][14]['y']=7;
$mask[9][1][15]['x']=-1; $mask[9][1][15]['y']=4;
$mask[9][1][16]['x']=3; $mask[9][1][16]['y']=5;
$mask[9][1][17]['x']=3; $mask[9][1][17]['y']=2;
$mask[9][1][18]['x']=5; $mask[9][1][18]['y']=2;
$mask[9][1][19]['x']=5; $mask[9][1][19]['y']=5;
//******************************************************************************

//--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*
//Ищем в массиве элементы схожие с шаблоном
function test_picture($x,$y,$mass_x)
{
    global $mask; 
    $result=-16;
    $page=0;
    while ($page<sizeof($mask))
    {
        $num=0;
        while ($num<sizeof($mask[$page]))
        {
            $num_arr=$mask[$page][$num];
            $i=0;
            while ($i<sizeof($num_arr))
            {
                if ($mass_x[$x+$num_arr[$i]['x']][$y+$num_arr[$i]['y']]!='1')
                {
                    $i=100;
                } else {$i++;}
            }
            if ($i!=100)
            {
                $num=1000;
                return $page;
            }
            $num++;
        }
        $page++;
    }
    return $result;
}

//функция распознавания капчи
function ocr_image($image_name)
{
$result="";
$ocr_text=array();
$im = ($image_name); //$im = imagecreatefrompng($image_name);
for ($i;$i<70;$i++)
{
    for ($a=0;$a<23;$a++)
    {
        $colors=imagecolorat($im,$i,$a);
        if ($colors==16777215){$img_data[$i][$a]='0';}else{$img_data[$i][$a]='1';}
    }
}
$i=0;
for ($y=0;$y<23;$y++)
{
    for ($x=0;$x<70;$x++)
    {
        if ($img_data[$x][$y]=='1')
        {
            $main_data=test_picture($x,$y,$img_data);
            if ($main_data!=-16)
            {
                $ocr_text[$i]['x']=$x;
                $ocr_text[$i]['y']=$y;
                $ocr_text[$i]['text']=$main_data;
                $i++;
            }
        }
    }
}
//сортируем массив методом пузырьковой сортировки
for ($x=0;$x!=sizeof($ocr_text);$x++)
{
    for ($y=0;$y!=sizeof($ocr_text)-1;$y++)
    {
        if ($ocr_text[$y]['x']>$ocr_text[$y+1]['x'])
        {
            $x_tmp=$ocr_text[$y]['x'];
            $y_tmp=$ocr_text[$y]['y'];
            $text_tmp=$ocr_text[$y]['text'];
            $ocr_text[$y]['x']=$ocr_text[$y+1]['x'];
            $ocr_text[$y]['y']=$ocr_text[$y+1]['y'];
            $ocr_text[$y]['text']=$ocr_text[$y+1]['text'];    
            $ocr_text[$y+1]['x']=$x_tmp;
            $ocr_text[$y+1]['y']=$y_tmp;
            $ocr_text[$y+1]['text']=$text_tmp;
        }
    }
}
//формируем распознанную строку
for ($x=0;$x!=sizeof($ocr_text);$x++)
{
    $result.=$ocr_text[$x]['text'];
}
return $result;
}
?>