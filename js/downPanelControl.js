/**
* отвечает за события, иницилизацию и прочие штуки нижней панели
* @nameAudio - название трека и путь к нему
*/
var DownPanelControl = function(nameAudio){
	var self = this;
	if(typeof options == 'undefined') options = {};
	var elem = getParam(options.elem, $('#downPanelControl'));		// Элемент на который подвязываем собятия
	var sound;														// Объект класса, отвечающий за проигрывание музыки
	var addAdventWindow;											// Объект класса добавления объявления
	
	this.loadPage = function(){
	
		elem.on('click', '.addAdvent', {event:'downPanelControl:editting'}, callTriger);
		elem.on('click', '.editting', {event:'downPanelControl:addAdvent'}, callTriger);
		elem.on('click', '.avtor', {event:'downPanelControl:avtor'}, callTriger);
		elem.on('click', '.baner', {event:'downPanelControl:baner'}, callTriger);
		
		elem.on('downPanelControl:editting', eventClickEditing);
		elem.on('downPanelControl:addAdvent', eventClickAddAdvent);
		elem.on('downPanelControl:avtor', eventClickAvtor);
		elem.on('downPanelControl:baner', eventClickBaner);
		
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
			//ui.value - это значение будет устанавливаться громкостью
			sound.setVolume(ui.value*0.1);
		  }
		});
		
		$( document ).tooltip();
	}
	
	function eventClickAvtor(){
		$( "#avtor" ).dialog();
	}
	
	function eventClickAddAdvent(){
		$( "#addAdvent" ).dialog();
	}
	
	function eventClickEditing(){
		$( "#editting" ).dialog();
	}
	
	function eventClickBaner(){
		$( "#baner" ).dialog();
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