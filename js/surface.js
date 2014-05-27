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
	var buildings;											// ������
	var temple;                                             // ����
	var ambientLight, spotLight;                            // ���������� ����

	loadResources();

	/**
	*	��������� ������� � ��������� �� � ������� resources
	*   �� ��������� �������� ��������� ������ init(); � animate();
	*/
	function loadResources() {
		resources = new Resources();

		// �������� ��� ���������
		resources.addTexture('image/skybox/grimmnight_rt.jpg');
		resources.addTexture('image/skybox/grimmnight_lf.jpg');
		resources.addTexture('image/skybox/grimmnight_up.jpg');
		resources.addTexture('image/skybox/grimmnight_dn.jpg');
		resources.addTexture('image/skybox/grimmnight_bk.jpg');
		resources.addTexture('image/skybox/grimmnight_ft.jpg');
		
		// �������� ��� ����
		resources.addTexture('image/floor_trap.jpg');
		resources.addTexture('image/grass.png');
		resources.addTexture('image/wood.jpg');
		resources.addTexture('image/tall.jpg');

		// �������� ��������
		resources.addModel('model/trees/tree1.js');
		resources.addModel('model/trees/tree2.js');
		resources.addModel('model/trees/tree3.js');
		resources.addModel('model/trees/tree4.js');

		// ����
		resources.addModel('model/temple/temple.js');

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
		initLight();
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
		terrain = new Terrain(resources);
		buildings = new Buildings(resources);
	}

	/**
	*	��� �������������� ����
	*/
	function initLight() {
		ambientLight = new THREE.AmbientLight(0x333333);

		spotLight = new THREE.SpotLight(0xCBE9F5, 0.7, 0, Math.PI / 2, 1);
		spotLight.position.set(1.5, 5.5, -7);
		spotLight.target.position.set(0, 0, 0);

		spotLight.shadowCameraNear = 0.1;
		spotLight.shadowCameraFar = 15;
		
		spotLight.shadowMapBias = 0.003885;
		spotLight.shadowMapWidth = 1024;
		spotLight.shadowMapHeight = 1024;
		
		spotLight.castShadow = true;
		spotLight.shadowDarkness = 0.25;
	}

	/**
	*	������� ����� � ���������� � ��� ���, ��� �����
	*/
	function initScene() {
		scene = new THREE.Scene();

		scene.add(controls.getObject()); // ��������� ������ � �����
		scene.add(skyBox.getObject());
		scene.add(terrain.getObject());
		scene.add(buildings.getObject());

		scene.add(ambientLight);
		scene.add(spotLight);
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