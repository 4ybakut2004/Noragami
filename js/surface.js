/**
*	@min - ������ �������
*	@max - ������� �������
*	@return - ���������� ��������� ����� �� ���������
*/
var getRandomInt = function(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

var surface;												// ������ ������ Surface	
var downPanelContol;										// ������ ������ ����������� ������ ����

var Surface = function()
{
	var max = 1000;											// ��� ��������� ���������� � ���� ������. ������� �� �������� ���������� max.
	var borders = new THREE.Vector4(-1.0, -1.0, 1.2, 1.0); 	// ������� ����
	var scene, camera, renderer;							// �����, ������ � ������
	var skyBox;												// ������ ������ SkyBox
	var clock = new THREE.Clock();							// ������� �������	
	
	/**
	*	������������� ��������
	*/
	var loadPage = function(){
		scene = new THREE.Scene(); 
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.0001, 7);
		renderer = new THREE.WebGLRenderer({'antialias':true}); 	
		
		renderer.setSize(window.innerWidth, window.innerHeight); 
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		renderer.physicallyBasedShading = true;
		renderer.shadowMapCullFace = THREE.CullFaceBack;
		renderer.autoClear = false;
		
	    $(document.body).append(renderer.domElement);
		
	    skyBox = new SkyBox(loader);
		scene.add(skyBox.getMesh());
		
		$(window).bind( 'resize', onWindowResize);
		$(window).bind( 'mousedown', onDocumentMouseDown);
		$(window).bind('keydown', onDocumentKeyDown);
	};
	
	var render = function(){
		var delta = clock.getDelta() * 1000.0;
		
		renderer.setViewport( 0, 0, w, h );
		renderer.render( scene, camera );
	}
}

$(document).ready(function() 
{
	// �������� ��������� ��� ������
	if(!Detector.webgl)
	{
		var errorElement = document.getElementById("GLerror");
		errorElement.style.display = "block";
		Detector.addGetWebGLMessage({parent: errorElement});
		return;
	}
	
	surface = new Surface();
	downPanelContol = new DownPanelControl();
	downPanelContol.loadPage();
});