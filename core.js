
/*================================ Обработка интерфейса ================================*/

//Проверка трек номера на валидность
function isValidTrackingNumber(e){var t=/^[0-9]{14}$/.test(e),n=/^SL[0-9]{9}RU$/.test(e),i=/^[R|V|C|E|L|U|Z][A-Z][0-9]{9}[A-Z]{2}$/.test(e)||n,r=0;if(t){for(var a=0;a<e.length;a+=2)r+=3*parseInt(e[a],10),a<12&&(r+=parseInt(e[a+1],10));var o=r%10,s=o?10-r%10:0;return parseInt(e[13],10)===s}if(i){for(var p=[8,6,4,2,3,5,9,7],a=2;a<10;a++)r+=parseInt(e[a],10)*p[a-2];var s=11-r%11;return 10===s?s=0:11===s&&(s=5),parseInt(e[10],10)===s}return!1}


var jqxhr;


//Нормализация даты
function FormatDate(datestring) {
	date = datestring.toString().split("T")[0].split('-');
	date = date[2]+'.'+date[1]+'.'+date[0];
	time = datestring.toString().split("T")[1].substr(0,5);
	return (date + ' ' + time);
}


//Очистка страницы
function clear_page() {
	$('#result_print').hide();
	$('#ErrorMessageBox').hide();
	$('#trackresult_rows').html('');
	$("#input_track").removeClass('inputerror');
}


//Вывод сообщения
function ShowMessage(title, txt) {
	clear_page();
	$('#ErrorMessageBox .err_title').html(title);
	$('#ErrorMessageBox .err_txt').html(txt);
	$('#ErrorMessageBox').show();
}


//Вывод информации об отправлении
function show_TrackDetail(jsondata) {
	
	clear_page();
	$('#result_print').show();
	
	//Чтение json структуры
	TrackData = jsondata.list[0].trackingItem;
	
	//Заголовок, информация о посылке
	$('#trackinfo #tracktitle').removeClass('arrived').html(TrackData.title);
	
	//Детальная информация (под заголовком)
	$('#trackinfo #trackstatus').html(TrackData.commonStatus);
	
	//Вывод информации об отправлении
	$('#trackdetail').html('<table>' +
		'<tr><td>Трек номер: </td><td>'+TrackData.barcode+'</td></tr>' +
		'<tr><td>Индекс получателя: </td><td><span class="index_detail index-'+TrackData.indexTo+'">'+TrackData.indexTo+'</span></td></tr>' +
		'<tr><td>Отправитель: </td><td>'+(TrackData.sender || 'Нет данных')+'</td></tr>' +
		'<tr><td>Получатель: </td><td>'+(TrackData.recipient || 'Нет данных')+'</td></tr>' +
		'<tr><td>Вес: </td><td>'+TrackData.weight/1000 + ' кг.</td></tr>' +
		'<tr style="display:none;"><td>Объявленная ценность: </td><td>'+TrackData.insurance+' р.</td></tr>' +
		'<tr style="display:none;"><td>Наложенный платеж: </td><td>'+TrackData.cashOnDelivery + ' р.</td></tr>' +
	'</table>');
	
	if (TrackData.insurance != null)		$('#trackdetail tr:eq(5)').show();
	if (TrackData.cashOnDelivery != null)	$('#trackdetail tr:eq(6)').show();
	if (TrackData.hasBeenGiven != null)		$('#trackinfo #tracktitle').addClass('arrived');
	
	
	//Вывод истории отправления
	Operations = TrackData.trackingHistoryItemList;
	Operations_length = Operations.length-1;
	num = 1;
	for (var i = Operations_length; i >= 0; i--) {
		var CurrentOperation = Operations[i];
		$('#trackresult_rows').append('<tr>' +
			'<td>' + (num++) + '</td>' +
			'<td style="text-align: left;">' + (CurrentOperation.humanStatus || '') + '</td>' +
			'<td>' + (FormatDate(CurrentOperation.date) || '') + '</td>' +
			'<td>' + ('<span class="index_detail index-'+CurrentOperation.index+'">' + (CurrentOperation.index || '') + '</span>' || '') + '</td>' +
			'<td style="text-align: right;">' + (CurrentOperation.cityName || '') + '</td>' +
			'<td style="text-align: left;">' + (CurrentOperation.description || '') + '</td>' +
			'<td>' + (CurrentOperation.weight/1000 || '') + '</td>' +
		'</tr>');
	}


}





//Поиск трек номера
function search() {

	var track = $.trim($('#input_track').val());
	window.location.hash = track;
	
	clear_page();
	
	ShowMessage('<div>Поиск...</div><div class="loaderimage"></div>', '');

	if (!isValidTrackingNumber(track)) {
		ShowMessage('Результат поиска', 'Неправильный трек-номер.');
		$("#input_track").addClass('inputerror');
		return false;
    }

    addHistoryElement(track); //Добавляем трек в историю
	
	var jqxhr = $.post('getinfo.php', {barcode: track});
	
	jqxhr.done(function(result) {

		//Обработка ошибок в ответе .php
		if (result.LocalError) { //Локальная ошибка в .php
			ShowMessage('Ошибка в ответе скрипта', result.LocalError);
			return false;
		} else if (result.error) { //Если получена ошибка от сервера почты
			ShowMessage('Ошибка в ответе сервера почты', result.error.description);
			return false;
		} else if(result.list.length == 0) { //Ингода сервер почты возвращает ответ нулевой длины, обрабатываем такой ответ, как ошибку
			ShowMessage('Результат поиска', 'База данных временно недоступна.');
			return false;
		} else if (result.list[0].formF22Params == null) { //Если информации о посылке с таким трек-номером нету
			ShowMessage('Результат поиска', 'Информация о почтовом отправлении '+track+' не найдена.');
			return false;
		}

		show_TrackDetail(result);

	});
	
	jqxhr.fail(function() {
		ShowMessage('Ошибка при отправке запроса', 'Не удалось выполнить запрос.');
	});

}


//Поиск информации о почтовом отделении пои ндексу
function SearchPostAdress(index) {
	
	var jqxhr = $.post('getinfo.php', {zipcode: index});
	
	jqxhr.done(function(result) {
		if (result.LocalError) { //Локальная ошибка в .php
			$('#indexdetail').html('<span style="color:#e84132;">Error: '+result.LocalError+'</span>');
		}else if (result.office) {
			adress = '<b>' + result.office.postalCode + ', ' + result.office.region + ', ' + result.office.settlement + '</b><br>Адрес отделения: <b>' +
			result.office.addressSource	+ '</b><br>Телефон отделения: <b>+7 (' + result.office.phones[0].phoneTownCode + ') ' + result.office.phones[0].phoneNumber + '</b>';	
			$('#indexdetail').html(adress);
			$('.index-'+index).data('adress', adress);
		} else {
			$('#indexdetail').html('Нет данных');
			$('.index-'+index).data('adress', 'Нет данных');
		}
	});

	jqxhr.fail(function() {
		$('#indexdetail').html('<span style="color:#e84132;">Error: Request failed</span>');
	});
	
	jqxhr.always(function() {
		$('.index-'+index).data('loading', false);
	});
	
	
}


$(function() {
	
	//Отрисовка всплывающего окна с информацией об отделении
	$('body').prepend('<div id="indexdetail"></div>');
	
	//Отрисовка выпадающего списка и историей
	$('body').prepend('<div id="searchHistory" style="display:none;"><ul></ul><span title="Нажмите &#34;Delete&#34; на выбранном номере, чтобы удалить только его.">Очистить историю</span></div>');
	
	//Обработка изменения в поле ввода трек номера
	$("#input_track").on('input', function() {
		$("#input_track").removeClass('inputerror');
	});
	
	
	$('#mem_count').attr('title', 'Количество сохраненных трек номеров.\nДля вызова истории сделайте двойной клик\nпо полю ввода или нажмите кнопку "вниз".');
	$('#mem_count').html(readHistory().length); //Обновление счетчика сохраненных треков
	
	//Наведение мышкой на индекс (для отображения адреса отделения)
	$('body').on('mouseenter', '.index_detail', function(e){
		index = $(this).html();

		//Если у индекса уже сохранен адрес, выводим его
		if ( $(this).data('adress') ) {
			$('#indexdetail').html( $(this).data('adress') );
		} else { //Иначе подгружаем (если адрес уже не загружается)
			$('#indexdetail').html('Загрузка...');
			if ( !$(this).data('loading') ) {
				$('.index-'+index).data('loading', true);
				SearchPostAdress(index);
			}
		}

		//Чтобы всплывающая информация об отделении не выходила за экран
		if ( $('#indexdetail').width() + e.pageX > document.documentElement.clientWidth )
			xx = document.documentElement.clientWidth - $('#indexdetail').width() - 20;
		else
			xx = e.pageX + 10;
		$('#indexdetail').css('top', e.pageY + 15).css('left', xx).show();
		
	});
	
	
	//Скрытие всплывающего окна с информацией об отделении
	$('#trackdetail, #trackresult').on('mouseleave', '.index_detail', function(){
		$('#indexdetail').hide();
	});
	

	//Нажатие кнопки поиска
	$('#search_button').click(function(){
		if( $('#input_track').val() == '' ) {
			clear_page();
			$('#input_track').focus();
		} else {
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
	
	
	//Обработка хеша в строке при загрузке
	hashstr = window.location.hash.substr(1);
	if(hashstr.length>=13 && hashstr.length <=14) {
		$('#input_track').val(hashstr);
		search();
	}

	
	//Обработка изменения хеша в строке
	$(window).bind('hashchange', function hashchange() {
		hashstr = window.location.hash.substr(1);
		if(hashstr.length>=13 && hashstr.length <=14 && hashstr!=$('#input_track').val()) {
			$('#input_track').val(hashstr);
			search();
		}
	});


});










/*================================ Работа с localstorage для хранения последних трек номеров ================================*/

//Проверяет, поддерживается ли локальное хранилище
function isLocalStorageAvailable() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

//Чтение данных из localstorage
function readHistory() {
	return localStorage.ArrayHistory ? JSON.parse(localStorage.ArrayHistory) : []; //Чтение массива из localstorage
}

//Добавить трек номер в LocalStorage
function addHistoryElement(e) {
	var tracknums = readHistory();
	//Если данного номера ещё нет в массиве, добавляем новый элемент в начало масива
	if(tracknums.indexOf(e) == -1) tracknums.unshift(e); //Добавляем новый элемент в начало масива
	//Если элементов в массиве больше, чем n, удаляем последний элемент
	if(tracknums.length > 16) tracknums.pop();
	//Запись массива в LocalStorage
	localStorage.ArrayHistory = JSON.stringify(tracknums);
	$('#mem_count').html(tracknums.length); //Обновление счетчика сохраненных треков
}

//Удалить трек номер из LocalStorage
function removeHistoryElement(e) {
	var tracknums = readHistory();
	var index = tracknums.indexOf(e); //Поиск индекса по значению
	tracknums.splice(index, 1); //удаляем значение из массива
	localStorage.ArrayHistory = JSON.stringify(tracknums); //Запись массива в localstorage
	$('#mem_count').html(tracknums.length); //Обновление счетчика сохраненных треков
}

//Показать блок с историей
function showhistory() {
	if(isLocalStorageAvailable()) {
		var width = $('#input_wrapper').outerWidth();
		var height = $('#input_wrapper').outerHeight();
		var position = $('#input_wrapper').position();
		$('#searchHistory > ul').empty();
		if(readHistory().length>0) {
			readHistory().forEach(function(element) {
				$('#searchHistory > ul').append('<li class="num-'+element+'">'+element+'</li>');
			});
		} else {
			$('#searchHistory > ul').append('<div class="nothing">Нет сохраненных номеров.</div>');
		}
		$('#searchHistory').width(width).show();
		$('#searchHistory').offset({top:position.top+height, left:position.left});
	}
}


function HistoryChoise() {
	num = $('#searchHistory li.dropselected').html();
	$('#input_track').val(num).focus();
	window.location.hash = num;
}

$(function() {

	var selected = 0; //Выбранный элемент истории
	
	//Двойной клик на поле ввода трек номера (открывает окно истории)
	$('#input_track').dblclick(function(){
		showhistory();
	});
	
	//Скрытие окна истории при потере фукуса со строки ввода
	$('#input_track').focusout(function(){
		if (!$('#searchHistory').is(':hover')) {
			$('#searchHistory').hide();
			selected = 0;
		}
	});
	
	//Скрытие окна истории при клике по сообщению об отсутствии сохнаненных трек номеров
	$('#searchHistory').on('click', '.nothing', function() {
		$('#searchHistory').hide();
	});
	
	//Удаление элемента истории по нажатию "Delete"
	$('#input_track').keydown(function(e){
		if(e.keyCode == 46) {
			//нажата клавиша delete
			
			if( $('#searchHistory').is(':visible') ) {
				tracknum = $('#searchHistory li.dropselected').html();
				removeHistoryElement(tracknum);
				$('#searchHistory').hide();
			}

		} else if(e.keyCode == 13) {
			//нажата клавиша enter
		
			if( $('#searchHistory').is(':visible') ) {
				HistoryChoise();
				$('#searchHistory').hide();
				search();
			} else {
				search();
			}
			
		} else if(e.keyCode == 40) {
			//нажата клавиша "стрелка вниз"
			
			if( !$('#searchHistory').is(':visible') ) {
				showhistory();
				selected = 0;
			} else {
				if(readHistory().length>0) {
					$('#searchHistory li').removeClass('dropselected');
					$('#searchHistory li:eq('+(selected++)+')').addClass('dropselected');
					if (selected >= readHistory().length) selected = 0;
					HistoryChoise();
				}
			}
			
			
		} else if(e.keyCode == 38) {
			//нажата клавиша "стрелка вверх"
			
			if( readHistory().length>0 && $('#searchHistory').is(':visible') ) {
				if(!$('#searchHistory li.dropselected').length) selected = 1; //Чтобы выбор стрелками работал корректно

				$('#searchHistory li').removeClass('dropselected');
				
				if (selected <= 0) selected = readHistory().length;
				$('#searchHistory li:eq('+(--selected-1)+')').addClass('dropselected');
				
				HistoryChoise();
			}

		} else {
			$('#searchHistory').hide();
		}
		
		
		
	});
	
	//Клик на сохраненном элементе
	$('#searchHistory').on('click', 'li', function() {
		HistoryChoise();
		$('#searchHistory').hide();
		search();
	});
	
	//Наведение мыши на элемент
	$('#searchHistory').on('mouseover', 'li', function() {
		selected = $(this).index()+1;
		$('#searchHistory li').removeClass('dropselected');
		$(this).addClass('dropselected');
	});
	

	//Наведение мыши на "очистить историю"
	$('#searchHistory').on('mouseover', 'span', function() {
		selected = 0;
		$('#searchHistory li').removeClass('dropselected');
	});
	
	//Клик на кнопке "очистить историю"
	$('#searchHistory > span').click(function() {
		$('#searchHistory').hide();
		if (confirm('Очистить историю?')) {
			$('#searchHistory').hide();
			localStorage.clear(); //Очистка локального хранилища
			$('#mem_count').html(0); //Обновление счетчика сохраненных треков
			$('#input_track').val('');
			window.location.hash = '';
		}
	});




});


