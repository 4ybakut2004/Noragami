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
	var boardLightLeft, boardLightRight;                    // ��������� �����
	var boardSofitLeft, boadrSofitRight;                    // ��������� �����
	var boardsCtrl;                                         // ������, ����������� ������� ����������

	var numLights = 10;										// ���-�� ����������
	var lights = [];

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

		// �������� ��� ����� � ������������
		resources.addTexture('image/wood.jpg');
		resources.addTexture('image/tall.jpg');
		resources.addTexture('image/advert.jpg');

		resources.addTexture('image/brick.jpg');

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
		boardsCtrl = new BoardsController(resources);
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

		boardLightLeft = new THREE.SpotLight(0xffffff, 1.3, 0, Math.PI / 9, 1);
		boardLightLeft.position.set(-0.09, -0.1, -0.15);
		boardLightLeft.target.position.set(-0.3, 0.0, -0.3);

		boardLightRight = new THREE.SpotLight(0xffffff, 1.5, 0, Math.PI / 9, 1);
		boardLightRight.position.set(0.09, -0.1, -0.15);
		boardLightRight.target.position.set(0.3, 0.0, -0.3);
	}

	function initLights() {
		var distance = 0.12;

		for ( var i = 0; i < numLights; i ++ ) {
			var light = new THREE.PointLight( 0xffffff, 1.1, distance );
			light.color.setRGB( 0.2, 1.0, 0.2 );
			scene.add( light );
			lights.push( light );
		}

		var geometry = new THREE.SphereGeometry( 0.003, 0.003, 0.003);

		for ( var i = 0; i < numLights; i ++ ) {
			var light = lights[ i ];

			var material = new THREE.MeshBasicMaterial();
			material.color = light.color;

			var emitter = new THREE.Mesh( geometry, material );
			light.position.z = -0.2;
			emitter.position = light.position;

			scene.add( emitter );
		}
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
		scene.add(boardsCtrl.getObject());

		scene.add(ambientLight);
		scene.add(spotLight);
		scene.add(boardLightLeft);
		scene.add(boardLightRight);

		initLights();
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
		var time = Date.now() * 0.00015;
		for ( var i = 0, il = lights.length; i < il; i ++ ) {
			var light = lights[ i ];
			if ( i > 0 ) {
				x = Math.sin( time + i * 1.7 ) * 0.8;
				y = Math.cos( time + i * 1.5 ) * 0.16;
				z = Math.cos( time + i * 1.3 ) * 0.5 - 1;
			} else {
				x = Math.sin( time * 3 ) * 0.2;
				y = -0.03;
				z = Math.cos( time * 3 ) * 0.35 + 0.01 - 1;
			}
			light.position.set( x, y, z );
		}
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