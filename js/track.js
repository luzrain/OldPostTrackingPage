

//Проверка трек номера на валидность
function isValidTrackingNumber(e){var t=/^[0-9]{14}$/.test(e),n=/^SL[0-9]{9}RU$/.test(e),i=/^[R|V|C|E|L|U|Z][A-Z][0-9]{9}[A-Z]{2}$/.test(e)||n,r=0;if(t){for(var a=0;a<e.length;a+=2)r+=3*parseInt(e[a],10),a<12&&(r+=parseInt(e[a+1],10));var o=r%10,s=o?10-r%10:0;return parseInt(e[13],10)===s}if(i){for(var p=[8,6,4,2,3,5,9,7],a=2;a<10;a++)r+=parseInt(e[a],10)*p[a-2];var s=11-r%11;return 10===s?s=0:11===s&&(s=5),parseInt(e[10],10)===s}return!1}

var jqxhr; //ajax запрос


function russian_format(id) {
    return id.match(/\d{14}/) != null;
}

function international_format(id) {
    return id.match(/[a-z]{2}\d{9}[a-z]{2}/i) != null;
}




function notnull(v) {
	return (v!=null && v!='');
}



function FormatDate(datestring) {
	date = datestring.toString().split("T")[0].split('-');
	date = date[2]+'.'+date[1]+'.'+date[0];
	time = datestring.toString().split("T")[1].substr(0,5);
	return (date + ' ' + time);
}




function clear_page() {
	$('#tracktitle').html('');
	$('#trackstatus').html('');
	$('#trackinfo').hide();
	$('#trackresult').hide();
	$('#searchResult').hide();
	$('#searchErr').hide();
	$('#trackresult_rows').html('');
	$('#trackdetail .d_ins').hide();
	$('#trackdetail .d_cashon').hide();
	$('#trackinfo .arrived').hide();
}




function show_error(text) {
	clear_page();
	$('#searchResult').show().html('Результат поиска');
    $('#searchErr').show().html(text);
}


function show_TrackDetail(jsondata) {

	clear_page();


	$('#trackinfo').show();
	//$('#searchResult').show().html('Результат поиска');
	$('#trackresult').show();


	data = jsondata.list[0].trackingItem;


/*
	//Вывод информации об отправлении
	if (russian_format(jsondata.list[0].trackingItem.barcode))
		$('#trackinfo_tracktype').html('Внутрироссийский почтовый идентификатор:');
	else
		$('#trackinfo_tracktype').html('Международный почтовый идентификатор:');

	$('#trackinfo_part1').html(jsondata.list[0].trackingItem.barcode);

	

	if (notnull(jsondata.Item.AddressFrom)) {
		var tmp = jsondata.Item.AddressFrom;
		if(notnull(jsondata.Item.ComplexItem)) tmp += '<br>'+jsondata.Item.ComplexItem;
		if(notnull(jsondata.Item.MailRank)) tmp += '<br>'+jsondata.Item.MailRank;
		if(notnull(jsondata.Item.PostMark)) tmp += '<br>'+jsondata.Item.PostMark;
		$('#trackinfo_part2').html(tmp);
	} else {
		$('#trackinfo_part2').html('Нет данных');
	}

	if (notnull(jsondata.Item.Sender))
		$('#trackinfo_part3').html(jsondata.Item.Sender);
	else
		$('#trackinfo_part3').html('Нет данных');

	if (notnull(jsondata.Item.Recipient))
		$('#trackinfo_part4').html(jsondata.Item.Recipient);
	else
		$('#trackinfo_part4').html('Нет данных');

	*/



	$('#trackinfo #tracktitle').html(data.title);
	$('#trackinfo #trackstatus').append(data.commonStatus );

	$('#trackdetail .val1').html(data.barcode);
	$('#trackdetail .val2').html('<span class="index_detail">'+data.indexTo+'</span>');
	$('#trackdetail .val3').html(data.sender || 'Нет данных');
	$('#trackdetail .val4').html(data.recipient || 'Нет данных');
	$('#trackdetail .val5').html(data.weight/1000 + ' кг.');
	$('#trackdetail .val6').html(data.insurance + ' р.');
	$('#trackdetail .val7').html(data.cashOnDelivery + ' р.');

	if (data.insurance != null) $('#trackdetail .d_ins').show();
	if (data.cashOnDelivery != null) $('#trackdetail .d_cashon').show();
	if (data.hasBeenGiven != null) $('#trackinfo .arrived').show();



	//Вывод истории отправления
	list = data.trackingHistoryItemList;
	list_length = list.length-1;
	num = 1;
	for (var index = list_length; index >= 0; index--) {
		var operation =list[index];

		$('#trackresult_rows').append(
			'<tr>' +
			'<td>' + num++ + '</td>' +
			'<td>' + (operation.humanStatus || '') + '</td>' +
			'<td>' + (FormatDate(operation.date) || "") + '</td>' +
			'<td>' + ('<span class="index_detail">'+operation.index+'</span>' || '') + '</td>' +
			'<td>' + (operation.cityName || '') + '</td>' +
			'<td>' + (operation.description || '') + '</td>' +
			'<td>' + (operation.weight/1000 || '') + '</td>' +
			'</tr>'
		);
	}


}


function hashchange() {
	hashstr = window.location.hash.substring(1,15);
	if(window.location.hash.substring(1) != hashstr.length) window.location.hash = hashstr;
	if(hashstr.length>1 && hashstr!=$('#input_track').val()) {
		$('#input_track').val(hashstr);
		search(hashstr);
	}
}


function search() {

	var track = $('#input_track').val();
	track = $.trim(track);
	window.location.hash = track;
	
	clear_page();
	$('#searchResult').show().html('<div>Поиск...</div><img src="img/loader-horizontal.gif" alt="LOADER">');
	$('#trackresult_rows').html('');


	if (!isValidTrackingNumber(track)) {
		show_error('Неправильный трек-номер');
		return false;
    }

    addHistoryElement(track); //Добавляем трек в историю

	jqxhr = $.getJSON('php/TrackData.php?id='+track);



	jqxhr.done(function(result) {


		if (result.LocalError) {
			show_error('Невозможно подключиться к базе!');
			return false;
		}

		else if(result.list.length == 0) {
			show_error('База данных временно недоступна.');
			return false;
		}

		else if (result.list[0].formF22Params == null) {
			show_error('Информация о почтовом отправлении не найдена.');
			return false;
		}



		show_TrackDetail(result);

	});

	jqxhr.fail(function() {
		show_error('Ошибка запроса!');
	});

}


$(function() {


	//Обработка наведения на индекс
	$('#trackdetail, #trackresult').on('mouseenter', '.index_detail', function(e){
		index = $(this).html();
		thisthis = $(this);



		//Если у индекса сохранен адрес выводим его
		if ( $(this).data('adress') ) {
			$('#trackadress').html( $(this).data('adress') );
		} else { //Иначе подгружаем
			$('#trackadress').html( 'loading...' );


				jqxhr2 = $.getJSON('php/IndexData.php?id='+index);

				jqxhr2.done(function(result) {

					if (result.office) {
						adress = '<b>' + result.office.postalCode + ', ' + result.office.region + ', ' + result.office.settlement + '</b><br>Адрес отделения: <b>' +
						result.office.addressSource	+ '</b><br>Телефон отделения: <b>+7 (' + result.office.phones[0].phoneTownCode + ') ' + result.office.phones[0].phoneNumber + '</b>';

						$('#trackadress').html( adress );
						thisthis.data('adress', adress);
					} else {
						$('#trackadress').html( 'Нет данных' );
						thisthis.data('adress', 'Нет данных');
					}


				});

				jqxhr2.fail(function() {
					alert(2);
				});




		}

		

		//Чтобы всплывающая информация об отделении не выходила за экран
		if ( $('#trackadress').width() + e.pageX > document.documentElement.clientWidth ) {
			xx = document.documentElement.clientWidth - $('#trackadress').width() - 20;
		} else {
			xx = e.pageX + 10;
		}

		$('#trackadress').css('top', e.pageY + 15);
		$('#trackadress').css('left', xx);

		$('#trackadress').show();
	});

	$('#trackdetail, #trackresult').on('mouseleave', '.index_detail', function(){
		$('#trackadress').hide();
	});
	


	//Нажатие кнопки поиска
	$('#search_button').click(function(){
		search();
	});

	//Нажатие enter
	$("#input_track").keypress(function(e){
		if(e.keyCode==13){
			//нажата клавиша enter
			search();
		}
	});

	//Нажатие кнопки очистки
	$('#clear_button').click(function() {
		$('#input_track').val('');
		window.location.hash = '';
		jqxhr.abort();
		clear_page();
	});

	//Обработка изменения в поле ввода трек номера
	$("#input_track").on('input', function() {
		clear_page();
	});

	//Обработка хеша в строке при загрузке
	hashchange();

	//Обработка изменения хеша в строке
	$(window).bind('hashchange', hashchange);













});
