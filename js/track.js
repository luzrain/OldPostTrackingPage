

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







function show_error(text) {
	$('#searchProgress').hide();
	$('#searchResult').show();
    $('#searchErr').show().html(text);
}


function show_TrackDetail(jsondata) {

	//Вывод информации об отправлении
	if (russian_format(jsondata.Item.Barcode))
		$('#trackinfo_tracktype').html('Внутрироссийский почтовый идентификатор:');
	else
		$('#trackinfo_tracktype').html('Международный почтовый идентификатор:');

	$('#trackinfo_part1').html(jsondata.Item.Barcode);

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





	//Вывод истории отправления
	$('#trackresult_rows').html('');
	for (var index = 0; index < jsondata.Operations.length; index++) {
		var operation = jsondata.Operations[index];

		$('#trackresult_rows').append(
			"<tr>" +
			"<td>" + (operation.Name || "") + "</td>" +
			"<td>" + (operation.Date || "") + "</td>" +
			"<td>" + (operation.PostOfficeZIP || "") + "</td>" +
			"<td>" + (operation.PostOffice || "") + "</td>" +
			"<td>" + (operation.Attribute || "") + "</td>" +
			"<td>" + (operation.Weight || "") + "</td>" +
			"<td>" + (operation.Value || "") + "</td>" +
			"<td>" + (operation.Payment || "") + "</td>" +
			"<td>" + (operation.AddressToZIP || "") + "</td>" +
			"<td>" + (operation.AddressTo || "") + "</td>" +
			"</tr>"
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
	
	$('#trackinfo').hide();
	$('#trackresult').hide();
	$('#searchResult').hide();
	$('#searchErr').hide();
	$('#searchProgress').show();
	$('#trackresult_rows').html('');


	if (!russian_format(track) && !international_format(track)) {
		show_error('Почтовый идентификатор в неправильном формате.');
		return false;
    }

    addHistoryElement(track); //Добавляем трек в историю

	jqxhr = $.get('php/OperationHistory.php?id='+track);

	jqxhr.done(function(result) {



		if(result.Status=='Exception' || result.Status=='Timeout') {
			show_error('База данных временно недоступна, повторите запрос позже.');
		} else if(result.Status=='Success') {
			//Обрабатываем ответ

			if(result.Item.Barcode!=null) { //Если трек номер есть в базе
				$('#searchProgress').hide();
				$('#trackinfo').show();
				$('#searchResult').show();
				$('#trackresult').show();
				show_TrackDetail(result);
			} else {
				show_error('Информация о почтовом отправлении не найдена.');
			}

		} else {
			show_error('Внутренняя ошибка: "'+result.Status+'"');
		}
	});

	jqxhr.fail(function() {
		show_error('Ошибка запроса!');
	});

}


$(function() {

	$('#search_button').click(function(){
		search();
	});
	$("#input_track").keypress(function(e){
		if(e.keyCode==13){
			//нажата клавиша enter
			search();
		}
	});


	hashchange();
	$(window).bind('hashchange', hashchange);


	$('#clear_button').click(function() {
		$('#input_track').val('');
		window.location.hash = '';
		jqxhr.abort();
		$('#trackinfo').hide();
		$('#trackresult').hide();
		$('#searchResult').hide();
		$('#searchErr').hide();
		$('#searchProgress').hide();
	});











});
