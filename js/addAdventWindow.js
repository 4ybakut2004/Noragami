var AddAdventWindow = function(){
	if(typeof options == 'undefined') options = {};
	var elem = getParam(options.elem, $('#addAdvent'));			// ������� �� ������� ����������� �������
		
	this.loadPage = function(){
		elem.on('click', '#buttonAddAdvent', {event:'addAdvent:add'}, callTriger);
		elem.on('click', '#buttonCansel', {event:'addAdvent:cansel'}, callTriger);
		elem.on('click', '#buttonShowAdvent', {event:'addAdvent:showAdvent'}, callTriger);
		
		elem.on('addAdvent:add', eventClickAdd);
		elem.on('addAdvent:cansel', eventClickCansel);
		elem.on('addAdvent:showAdvent', eventClickShowAdvent);
	}
	
	/**
	* �������� ���������� �� ������ + ����� ������
	*/
	function eventClickShowAdvent(){
		$('#showAdvent').dialog();
	}
	
	/**
	* ���������� �� �������� �� ������ ���������
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
	* ��������� ���������� � ����
	*/
	function eventClickAdd(){
		if(errorLength()){
			// ����� ��������� ����������
		}
	}
	
	/**
	* ��������� ����
	*/
	function eventClickCansel(){
		$( "#addAdvent" ).dialog('close');
	}
	/**
	 * ������� ������ �� �������
	 * e.data.event - �������� �������
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
	 * ������� �������. ���� �������� undefined �� ������������� ���������
	 * @param value
	 * @param defolt
	 * @returns {*}
	 */
	function getParam(value, defolt){
		return typeof value == 'undefined'? defolt: value;
	}
}