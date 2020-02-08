
//Проверка трек номера на валидность
function isValidTrackingNumber(e){var t=/^[0-9]{14}$/.test(e),n=/^SL[0-9]{9}RU$/.test(e),i=/^[R|V|C|E|L|U|Z][A-Z][0-9]{9}[A-Z]{2}$/.test(e)||n,r=0;if(t){for(var a=0;a<e.length;a+=2)r+=3*parseInt(e[a],10),a<12&&(r+=parseInt(e[a+1],10));var o=r%10,s=o?10-r%10:0;return parseInt(e[13],10)===s}if(i){for(var p=[8,6,4,2,3,5,9,7],a=2;a<10;a++)r+=parseInt(e[a],10)*p[a-2];var s=11-r%11;return 10===s?s=0:11===s&&(s=5),parseInt(e[10],10)===s}return!1}

var xhr;

document.addEventListener('DOMContentLoaded', function() {
	
	//Отрисовка всплывающего окна с информацией об отделении
	var index_float = document.createElement('div');
	index_float.id = 'zipcode-float';
	document.getElementsByTagName('body')[0].appendChild(index_float);
	
	//Отрисовка выпадающего списка и историей
	var search_history = document.createElement('div');
	search_history.id = 'search-history';
	search_history.innerHTML = '<ul></ul><span title="Нажмите &#34;Delete&#34; на выбранном номере, чтобы удалить только его.">Очистить историю</span>';
	document.getElementsByTagName('body')[0].appendChild(search_history);
	
	//Обработка изменения в поле ввода трек номера
	document.addEventListener('input', function() {
		document.getElementById('barcode-number').classList.remove('input-error');
	});
	
	//Обновление счетчика сохраненных треков
	var saved_barcodes = JSON.parse(localStorage.ArrayHistory || '[]');
	document.getElementById('mem-counter').setAttribute('title', 'Количество сохраненных трек номеров.\nДля вызова истории сделайте двойной клик\nпо полю ввода или нажмите кнопку "вниз".');
	document.getElementById('mem-counter').innerHTML = saved_barcodes.length;
	
	//Наведение мышкой на индекс (для отображения адреса отделения)
	document.addEventListener('mouseover', function(e) {
		if(!e.target.classList.contains('index_detail')) return;
		
		var zipcode = parseInt(e.target.innerHTML);
		var zip_data_saved = sessionStorage.getItem('zip-' + zipcode);
		var x_offset;
		
		if(zip_data_saved) {
			document.getElementById('zipcode-float').innerHTML = zip_data_saved;
		} else {
			document.getElementById('zipcode-float').innerHTML = 'Загрузка...';
			doZipSearch(zipcode, function(zipcode, details) {
				document.getElementById('zipcode-float').innerHTML = details;
				sessionStorage.setItem('zip-' + zipcode, details);
			});
		}
		
		document.getElementById('zipcode-float').style.display = 'block';
		
		//Чтобы всплывающая информация об отделении не выходила за экран
		if ( document.getElementById('zipcode-float').offsetWidth + e.pageX > document.documentElement.clientWidth ) {
			x_offset = document.documentElement.clientWidth - document.getElementById('zipcode-float').offsetWidth - 20;
		} else {
			x_offset = e.pageX + 10;
		}
		
		document.getElementById('zipcode-float').style.top = e.pageY + 15 + 'px';
		document.getElementById('zipcode-float').style.left = x_offset + 'px';
	});
	
	//Скрытие всплывающего окна с информацией об отделении
	document.addEventListener('mouseout', function(e) {
		if(!e.target.classList.contains('index_detail')) return;		
		document.getElementById('zipcode-float').style.display = 'none';
	});

	//Нажатие кнопки поиска
	document.getElementById('button-search').addEventListener('click', function() {
		if(document.getElementById('barcode-number').value == '') {
			clearPage();
			document.getElementById('barcode-number').focus();
		} else {
			doSearch();
		}
	});
	
	//Нажатие кнопки очистки
	document.getElementById('button-clear').addEventListener('click', function() {
		document.getElementById('barcode-number').value = '';
		window.location.hash = '';
		clearPage();
		xhr.abort();
	});
	
	//Обработка изменения хеша в строке
	window.addEventListener('hashchange', function() {
		var barcode = document.getElementById('barcode-number').value;
		var hashstr = window.location.hash.substr(1, 14);
		if(hashstr.length > 1 && hashstr != barcode) {
			document.getElementById('barcode-number').value = hashstr;
			doSearch();
		}
	});
	
	//Обработка хеша в строке при загрузке
	hashstr = window.location.hash.substr(1, 14);
	if(hashstr.length > 1) {
		document.getElementById('barcode-number').value = hashstr;
		doSearch();
	}
});


//Нормализация даты
function formatDate(datestring) {
	var date = datestring.toString().split("T")[0].split('-');
	var date = date[2] + '.' + date[1] + '.' + date[0];
	var time = datestring.toString().split("T")[1].substr(0,5);
	return date + ' ' + time;
}

//Очистка страницы
function clearPage() {	
	document.getElementById('table_box').style.display = 'none';
	document.getElementById('error_box').style.display = 'none';
	document.getElementById('table_result-rows').innerHTML = '';
	//document.getElementById('barcode-number').classList.remove('input-error');
}

//Вывод сообщения
function showMessage(title, text) {
	clearPage();
	document.getElementById('error_box-title').innerHTML = title;
	document.getElementById('error_box-text').innerHTML = text;
	document.getElementById('error_box').style.display = 'block';
}

//Вывод информации об отправлении
function showTrackDetail(jsondata) {
	
	clearPage();
	document.getElementById('table_box').style.display = 'block';
	
	//Чтение json структуры
	var TrackData = jsondata.list[0].trackingItem;
	
	//Заголовок, информация о посылке	
	document.getElementById('track-title').classList.remove('arrived');
	document.getElementById('track-title').innerHTML = TrackData.title;
	
	//Детальная информация (под заголовком)
	document.getElementById('track-status').innerHTML = TrackData.commonStatus;
	
	//Вывод информации об отправлении
	
	document.getElementById('details-barcode').innerHTML = TrackData.barcode;
	document.getElementById('details-indexto').innerHTML = TrackData.indexTo === null ? 'Нет данных' : '<span class="index">'+TrackData.indexTo+'</span>';
	document.getElementById('details-sender').innerHTML = TrackData.sender === null ? 'Нет данных' : TrackData.sender;
	document.getElementById('details-recipient').innerHTML = TrackData.recipient === null ? 'Нет данных' : TrackData.recipient; 
	document.getElementById('details-weight').innerHTML = TrackData.weight/1000 + ' кг.';
	document.getElementById('details-insurance').innerHTML = TrackData.insurance+ ' р.';
	document.getElementById('details-cashondelivery').innerHTML = TrackData.cashOnDelivery + ' р.';
	
	if (TrackData.insurance === null) {
		document.getElementById('details-insurance').closest('tr').style.display = 'none';
	}
	
	if (TrackData.cashOnDelivery === null) {
		document.getElementById('details-cashondelivery').closest('tr').style.display = 'none';
	}
	
	if (TrackData.hasBeenGiven === true)	{
		document.getElementById('track-title').classList.add('arrived');
	}
	
	//Вывод истории отправления
	var operations_count = TrackData.trackingHistoryItemList.length - 1;
	var num = 1;
	var html = '';
	for (var i = operations_count; i >= 0; i--) {
		var operation = TrackData.trackingHistoryItemList[i];
		html += '<tr>';
		html += '	<td>' + (num++) + '</td>';
		html += '	<td class="left">' + (operation.humanStatus || '') + '</td>';
		html += '	<td>' + formatDate(operation.date) + '</td>';
		html += '	<td><span class="index">' + (operation.index || '') + '</span></td>';
		html += '	<td class="right">' + (operation.cityName || '') + '</td>';
		html += '	<td class="left">' + (operation.description || '') + '</td>';
		html += '	<td>' + (operation.weight/1000 || '') + '</td>';
		html += '</tr>';
	}
	
	document.getElementById('table_result-rows').innerHTML = html;
	
	var indexes = document.getElementsByClassName('index');
	for (var i=0; i<indexes.length; i++) {
		var index_num = parseInt(indexes[i].innerHTML);
		if(String(index_num).length == 6) {
			indexes[i].classList.add('index_detail');
		}
	}
}

//Поиск трек номера
function doSearch() {
	
	clearPage();
	showMessage('<div>Поиск...</div><div class="loaderimage"></div>', '');
	
	var barcode = document.getElementById('barcode-number').value.trim();
	
	window.location.hash = barcode;
	
	//Проверка на валидность трек номера
	if (!isValidTrackingNumber(barcode)) {
		document.getElementById('barcode-number').classList.add('input-error');
		return showMessage('Результат поиска', 'Неправильный трек-номер');
	}
	
	//Добавляем трек в историю
    addHistoryElement(barcode);
	
	xhr = new XMLHttpRequest();
	xhr.open('POST', 'getinfo.php');
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	xhr.send(JSON.stringify({barcode: barcode}));
	xhr.responseType = 'json';
	
	xhr.onload = function() {
		if (xhr.status != 200) {
			return showMessage('Ошибка', xhr.status + ' - ' + xhr.statusText);
		} else {
			//Ошибка в ответе от почты
			if (xhr.response.error) {
				return showMessage('Ошибка', xhr.response.error.description);
			}
			
			//Ингода сервер почты возвращает ответ нулевой длины, обрабатываем такой ответ, как ошибку
			if (xhr.response.list.length == 0) {
				return showMessage('Результат поиска', 'База данных временно недоступна.');
			}
			
			//Если информации о посылке с таким трек-номером нету
			if (xhr.response.list[0].trackingItem.trackingHistoryItemList.length == 0) {
				return showMessage('Результат поиска', 'Информация о почтовом отправлении ' + barcode + ' не найдена');
			}
			
			return showTrackDetail(xhr.response);
		}
	};
	
	xhr.onerror = function() {
		return showMessage('Ошибка', 'Запрос не удался.');
	};
}

//Поиск информации о почтовом отделении по индексу
function doZipSearch(zipcode, cb) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'getinfo.php');
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	xhr.send(JSON.stringify({zipcode: zipcode}));
	xhr.responseType = 'json';
	
	xhr.onload = function() {
		if (xhr.status != 200) {
			cb(zipcode, '<span style="color:#e84132;">' + xhr.status + ' - ' + xhr.statusText + '</span>');
		} else if (xhr.response.office) {
			let details = '<b>' + xhr.response.office.postalCode + ', ' + xhr.response.office.region + ', ' + xhr.response.office.settlement + '</b><br>Адрес отделения: <b>' + xhr.response.office.addressSource	+ '</b><br>Телефон отделения: <b>+7 (' + xhr.response.office.phones[0].phoneTownCode + ') ' + xhr.response.office.phones[0].phoneNumber + '</b>';
			cb(zipcode, details);
		} else {
			cb(zipcode, 'Нет данных');
		}
	};
	
	xhr.onerror = function() {
		cb(zipcode, '<span style="color:#e84132;">Запрос не удался.</span>');
	};
}


/*================================ Работа с localstorage для хранения последних трек номеров ================================*/

//Добавить трек номер в LocalStorage
function addHistoryElement(e) {
	var saved_barcodes = JSON.parse(localStorage.ArrayHistory || '[]');
	
	//Если данного номера ещё нет в массиве, добавляем новый элемент в начало масива
	if(saved_barcodes.indexOf(e) == -1) {
		saved_barcodes.unshift(e);
	}
	
	//Если элементов в массиве больше, чем n, удаляем последний элемент
	if(saved_barcodes.length > 20) {
		saved_barcodes.pop();
	}
	
	//Запись массива в LocalStorage
	localStorage.ArrayHistory = JSON.stringify(saved_barcodes);
	
	//Обновление счетчика сохраненных треков
	document.getElementById('mem-counter').innerHTML = saved_barcodes.length
}

//Удалить трек номер из LocalStorage
function removeHistoryElement(e) {
	var saved_barcodes = JSON.parse(localStorage.ArrayHistory || '[]');
	
	//Поиск индекса по значению
	var barcode = saved_barcodes.indexOf(e);
	
	//удаляем значение из массива
	saved_barcodes.splice(barcode, 1);
	
	//Запись массива в localstorage
	localStorage.ArrayHistory = JSON.stringify(saved_barcodes);
	
	//Обновление счетчика сохраненных треков
	document.getElementById('mem-counter').innerHTML = saved_barcodes.length
}

//Показать блок с историей
function showHistory() {
	if(!('localStorage' in window)) return;
	
	var saved_barcodes = JSON.parse(localStorage.ArrayHistory || '[]');
	
	var $search_history = document.getElementById('search-history');
	var $input_wrapper = document.getElementById('input_wrapper');
	
	$search_history.querySelector('ul').innerHTML = '';
	if(saved_barcodes.length > 0) {
		saved_barcodes.forEach(function(el) {
			$search_history.querySelector('ul').innerHTML += '<li>' + el + '</li>';
		});
	} else {
		$search_history.querySelector('ul').innerHTML += '<div class="nothing">Нет сохраненных номеров.</div>';
	}
	
	$search_history.style.width = $input_wrapper.offsetWidth + 'px';
	$search_history.style.top = $input_wrapper.offsetTop + $input_wrapper.offsetHeight + 'px';
	$search_history.style.left = $input_wrapper.offsetLeft + 'px';
	$search_history.style.display = 'block';
}


function historyChoise() {
	var barcode = document.getElementById('search-history').querySelector('li.dropselected').innerHTML;
	document.getElementById('barcode-number').value = barcode;
	document.getElementById('barcode-number').focus();
	window.location.hash = barcode;
}

document.addEventListener('DOMContentLoaded', function() {
	var $search_history = document.getElementById('search-history');
	var $barcode_number = document.getElementById('barcode-number');

	var selected_num = 0; //Выбранный элемент истории
	
	//Двойной клик на поле ввода трек номера (открывает окно истории)
	$barcode_number.addEventListener('dblclick', showHistory);
	
	//Скрытие окна истории при потере фукуса со строки ввода	
	$barcode_number.addEventListener('focusout', function() {
		if ($search_history.querySelector(':hover') == null) {
			$search_history.style.display = 'none';
			selected_num = 0;
		}
	});
	
	//Скрытие окна истории при клике по сообщению об отсутствии сохнаненных трек номеров	
	$search_history.addEventListener('click', function(e) {
		if(!e.target.classList.contains('nothing')) return;
		$search_history.style.display = 'none';
	});
	
	//Удаление элемента истории по нажатию "Delete"
	$barcode_number.addEventListener('keydown', function(e) {
		
		var saved_barcodes = JSON.parse(localStorage.ArrayHistory || '[]');
		var is_search_history_visible = !!$search_history.offsetLeft;
		
		//delete
		if(e.keyCode == 46 && is_search_history_visible) {
			let $selected = $search_history.querySelector('li.dropselected');
			if($selected) {
				e.preventDefault();
				removeHistoryElement($selected.innerHTML);
				$search_history.style.display = 'none';
			}
		
		//enter
		} else if(e.keyCode == 13) {
			if(is_search_history_visible) {
				historyChoise();
				$search_history.style.display = 'none';
			}
			doSearch();
			
		//стрелка вниз
		} else if(e.keyCode == 40) {
			if(!is_search_history_visible) {
				showHistory();
				selected_num = 0;
			} else {
				if(saved_barcodes.length > 0) {					
					if(++selected_num > saved_barcodes.length) {
						selected_num = 1;
					}
					
					let lis = $search_history.querySelectorAll('li');
					for(var i = 0; i < lis.length; i++) {
						lis[i].classList.remove('dropselected');
					}
					
					$search_history.querySelectorAll('li')[selected_num-1].classList.add('dropselected');
					historyChoise();
				}
			}
		
		//стрелка вверх
		} else if(e.keyCode == 38 && saved_barcodes.length > 0 && is_search_history_visible) {						
			if (--selected_num < 1) {
				selected_num = saved_barcodes.length;
			}
			
			let lis = $search_history.querySelectorAll('li');
			for(var i = 0; i < lis.length; i++) {
				lis[i].classList.remove('dropselected');
			}
			
			$search_history.querySelectorAll('li')[selected_num-1].classList.add('dropselected');
			historyChoise();
		
		//any other key
		} else {
			$search_history.style.display = 'none';
		}
	});
	
	//Клик на сохраненном элементе
	$search_history.addEventListener('click', function(e) {
		if(e.target.tagName != 'LI') return;
		$search_history.style.display = 'none';
		historyChoise();
		doSearch();
	});
	
	//Наведение мыши на элемент
	$search_history.addEventListener('mouseover', function(e) {
		if(e.target.tagName != 'LI') return;
		let getIndex = function(el) {
			if (!el) return -1;
			var i = 0;
			do { i++; } while (el = el.previousElementSibling);
			return i;
		}
		
		selected_num = getIndex(e.target);
		
		let lis = $search_history.querySelectorAll('li');
		for(var i = 0; i < lis.length; i++) {
			lis[i].classList.remove('dropselected');
		}
		
		e.target.classList.add('dropselected');
	});
	
	//Наведение мыши на "очистить историю"
	$search_history.addEventListener('mouseover', function(e) {
		if(e.target.tagName != 'SPAN') return;
		selected = 0;
		let lis = $search_history.querySelectorAll('li');
		for(var i = 0; i < lis.length; i++) {
			lis[i].classList.remove('dropselected');
		}
	});
	
	//Клик на кнопке "очистить историю"
	$search_history.addEventListener('click', function(e) {
		if(e.target.tagName != 'SPAN') return;
		$search_history.style.display = 'none';
		if(!confirm('Очистить историю?')) return;
		
		$search_history.style.display = 'none';
		localStorage.clear(); //Очистка локального хранилища
		document.getElementById('mem-counter').innerHTML = 0; //Обновление счетчика сохраненных треков
		$barcode_number.value = '';
		window.location.hash = '';
	});
});
