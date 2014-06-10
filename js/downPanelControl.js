/**
* �������� �� �������, ������������ � ������ ����� ������ ������
* @nameAudio - �������� ����� � ���� � ����
*/
var DownPanelControl = function(nameAudio){
	var self = this;
	if(typeof options == 'undefined') options = {};
	var elem = getParam(options.elem, $('#downPanelControl'));		// ������� �� ������� ����������� �������
	var dialogs = getParam(options.elem, $(document));				// ������� �� ������� ����������� �������
	var sound;														// ������ ������, ���������� �� ������������ ������
	var addAdventWindow;											// ������ ������ ���������� ����������
	
	
	this.loadPage = function(){
	
		elem.on('click', '.addAdvent', {event:'downPanelControl:editting'}, callTriger);
		elem.on('click', '.editting', {event:'downPanelControl:addAdvent'}, callTriger);
		elem.on('click', '.avtor', {event:'downPanelControl:avtor'}, callTriger);
		elem.on('click', '.baner', {event:'downPanelControl:baner'}, callTriger);
		dialogs.on('click', '.closeDialog', {event:'document:closeDialog'}, callTriger);
		
		elem.on('downPanelControl:editting', eventClickEditing);
		elem.on('downPanelControl:addAdvent', eventClickAddAdvent);
		elem.on('downPanelControl:avtor', eventClickAvtor);
		elem.on('downPanelControl:baner', eventClickBaner);
		dialogs.on('document:closeDialog', closeDialog);
		
		addAdventWindow = new AddAdventWindow();
		addAdventWindow.loadPage();
		
		sound = new Sound([nameAudio]);
		sound.play();
		sound.setVolume(1);
		
		$( "#slider-range-max" ).slider({
		  range: "max",
		  min: 0,
		  max: 10,
		  value: 1,
		  slide: function( event, ui ) {
			//ui.value - ��� �������� ����� ��������������� ����������
			sound.setVolume(ui.value*0.1);
		  }
		});
		
		$( document ).tooltip();
	}
	
	function closeDialog(e){
		$('.closeDialog').eq($('.closeDialog').index(e.context)).parent().dialog('close');
	}
	
	function eventClickAvtor(){
		$( "#avtor" ).dialog();
	}
	
	function eventClickAddAdvent(){
		$('#addAdvent').dialog({width: 481, height: 306, resizable: false});
	}
	
	function eventClickEditing(){
		$( "#editting" ).dialog();
	}
	
	function eventClickBaner(){
		$( "#baner" ).dialog();
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