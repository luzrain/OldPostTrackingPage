
//Проверяет, поддерживается ли локальное хранилище
function isLocalStorageAvailable() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}


function readHistory() {
	return massiv = localStorage.massivHistory ? JSON.parse(localStorage.massivHistory) : []; //Чтение массива из localstorage
}

function addHistoryElement(e) {
	var massiv = readHistory();
	if(massiv.indexOf(e) == -1) { //Если данного номера ещё нет в массиве
		massiv.unshift(e); //Добавляем новый элемент в начало масива
	}

	//Если элементов в массиве больше, чем n, удаляем последний элемент
	if(massiv.length > 12) {
		massiv.pop();
	}

	localStorage.massivHistory = JSON.stringify(massiv); //Запись массива в localstorage
}


function removeHistoryElement(e) {
	var massiv = readHistory();

	var index = massiv.indexOf(e); //Поиск индекса по значению
	massiv.splice(index, 1); //удаляем значение из массива

	localStorage.massivHistory = JSON.stringify(massiv); //Запись массива в localstorage
}


function showhistory() {
	if(isLocalStorageAvailable() && readHistory().length>0) {
		var width = $('#input_track').outerWidth();
		var height = $('#input_track').outerHeight();
		var position = $('#input_track').position();

		$('#searchHistory>ul').empty();
		
		readHistory().forEach(function(element) {
			$('#searchHistory>ul').append('<li>'+element+'</li>');
		});


		$('#searchHistory').width(width).show();
		$('#searchHistory').offset({top:position.top+height, left:position.left})
	}
}

$(function() {

	var indextmp = 0;

	$('#input_track').dblclick(function(){
		showhistory();
	});

	$('#input_track').focusout(function(){
		if (!$('#searchHistory').is(':hover')) {
			$('#searchHistory').hide();	
		}
	});

	$('#input_track').keydown(function(e){
		if(e.keyCode== 46){
			//нажата клавиша delete
			var del = $('#searchHistory li').eq(indextmp).html();
			removeHistoryElement(del);
		}
		$('#searchHistory').hide();
	});

	//Клик на сохраненном элементе
	$('#searchHistory').on('click', 'li', function() {
		var saved = $(this).html();
		window.location.hash = saved;
		$('#input_track').val(saved).focus();
		$('#searchHistory').hide();
	});

	//Наведение мыши на элемент
	$('#searchHistory').on('mouseenter', 'li', function() {
		indextmp = $(this).index();
	});





	//Клик на кнопке "очистить историю"
	$('#searchHistory>span').click(function() {
		$('#searchHistory').hide();
		localStorage.clear(); //Очистка локального хранилища
	});


	




});