var AddAdventWindow = function(){
	if(typeof options == 'undefined') options = {};
	var elem = getParam(options.elem, $('#addAdvent'));			// Элемент на который подвязываем собятия
		
	this.loadPage = function(){
		elem.on('click', '#buttonAddAdvent', {event:'addAdvent:add'}, callTriger);
		elem.on('click', '#buttonCansel', {event:'addAdvent:cansel'}, callTriger);
		elem.on('click', '#buttonShowAdvent', {event:'addAdvent:showAdvent'}, callTriger);
		
		elem.on('addAdvent:add', eventClickAdd);
		elem.on('addAdvent:cansel', eventClickCansel);
		elem.on('addAdvent:showAdvent', eventClickShowAdvent);
	}
	
	/**
	* просмотр объявление до подачи + после подачи
	*/
	function eventClickShowAdvent(){
		$('#showAdvent').dialog();
	}
	
	/**
	* определяет не превышен ли размер сообщения
	* @return - {*}
	*/
	function errorLength(){
		if($(".advent").val().length > 10){
			$('#errorAdvent').show();
			return false;
		}else{
			$('#errorAdvent').hide();
			return true;
		}
	}
	
	/**
	* добавляет объевление в базу
	*/
	function eventClickAdd(){
		if(errorLength()){
			// можно добавлять объявление
		}
	}
	
	/**
	* закрывает окно
	*/
	function eventClickCansel(){
		$( "#addAdvent" ).dialog('close');
	}
	/**
	 * Вызвать тригер на собятия
	 * e.data.event - Название тригера
	 * @param e event
	 */
	function callTriger(e){
		event_target = $(e.target);
		var params = {
			type: e.data.event,
			target: event_target,
			context: this
		};

		elem.trigger(params);
		return false;
	}

	/**
	 * Вернуть значние. Если значение undefined то возвращаеться дефолтное
	 * @param value
	 * @param defolt
	 * @returns {*}
	 */
	function getParam(value, defolt){
		return typeof value == 'undefined'? defolt: value;
	}
}