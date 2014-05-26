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

/**
 * ������ ������. ������� ������ ThreeJS � ������ ����������.
 * � ��� ���������� �������� DOM �������� ��� ���������,
 * �������� �������� ����, ���������� �� ��������� � ����������.
 */
var Surface = function()
{
	var scene, camera, renderer;							// �����, ������ � ������
	var controls;											// ������ ���������� �������
	var skyBox;												// ������ ������ SkyBox
	var prevTime;                                           // ���������� �����
	var resources;                                          // �������

	loadResources();

	/**
	*	��������� ������� � ��������� �� � ������� resources
	*   �� ��������� �������� ��������� ������ init(); � animate();
	*/
	function loadResources() {
		resources = new Resources();

		resources.addTexture('image/skybox/grimmnight_rt.jpg');
		resources.addTexture('image/skybox/grimmnight_lf.jpg');
		resources.addTexture('image/skybox/grimmnight_up.jpg');
		resources.addTexture('image/skybox/grimmnight_dn.jpg');
		resources.addTexture('image/skybox/grimmnight_bk.jpg');
		resources.addTexture('image/skybox/grimmnight_ft.jpg');

		resources.load(function() {
			init();
			animate();
		});
	}

	/**
	*	������������� ������ � ����
	*/
	function init() {
		initControls();
		initRenderer();
		initWorldObjects();
		initScene();

		addEventListeners();

		prevTime = performance.now();
	}

	/**
	*	���������� � ����� ��� ��������� � ��������� ����
	*/
	function animate() {
		requestAnimationFrame( animate );

		modify();

		// � ���������� delta �������� �����, �� ������� ����������� ������� update
		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		// ������� ������� �� ����������, ��������� �� delta
		update(delta);

		prevTime = time;

		renderer.render( scene, camera );
	}

	/**
	*	������������� �����, ��� ������� � ������� � �����������
	*/
	function initControls() {
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 7);

		controls = new THREE.OverviewControls(camera);  // ������� ������ ���������� �������
	}

	/**
	*	������������� ���������
	*/
	function initRenderer() {
		renderer = new THREE.WebGLRenderer({'antialias':true});

		// ����������� ��������
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		renderer.physicallyBasedShading = true;
		renderer.shadowMapCullFace = THREE.CullFaceBack;

		// ��������� DOM ������� �� ��������, � ������� ����� ����������� ���������
		$(document.body).prepend(renderer.domElement);
	}

	/**
	*	��� �������������� ������� ����
	*/
	function initWorldObjects() {
		skyBox = new SkyBox(resources);
	}

	/**
	*	������� ����� � ���������� � ��� ���, ��� �����
	*/
	function initScene() {
		scene = new THREE.Scene();

		scene.add(controls.getObject()); // ��������� ������ � �����
		scene.add(skyBox.getObject());
	}

	/**
	*	����� ��������� ������. ��������� ���� ��� ���������� ��������.
	*   ����� ���������� ���� ������� ����� ���������� ���
	*   �������� �������� � ������������ �� ��������
	*/
	function modify() {

	}

	/**
	*	��� ������� ���, ��� ������� �� ������� ���������� ����� (delta)
	*/
	function update(delta) {
		controls.update(delta);
	}

	function addEventListeners() {
		window.addEventListener( 'resize', onWindowResize, false );
	}

	// ����������� ������ � ����������� �� ������� ��������
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
	}
};

$(document).ready(function() 
{
	surface = new Surface();
	downPanelContol = new DownPanelControl('./audio/end.ogg');
	downPanelContol.loadPage();
});