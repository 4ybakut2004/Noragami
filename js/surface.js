/**
*	@min - нижняя граница
*	@max - верхняя граница
*	@return - возвращает случайное число из интервала
*/
var getRandomInt = function(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

var surface;												// объект класса Surface	
var downPanelContol;										// объект класса управлением нижним меню

/**
 * Объект холста. Главный объект ThreeJS в данном приложении.
 * В нем происходит создание DOM элемента для отрисовки,
 * создание объектов мира, дальнейшая их отрисовка и обновление.
 */
var Surface = function()
{
	var scene, camera, renderer;							// Экран, камера и рендер
	var controls;											// Объект управления камерой
	var skyBox;												// Объект класса SkyBox
	var prevTime;                                           // Предыдущее время
	var resources;                                          // Ресурсы
	var buildings;											// Здания
	var temple;                                             // Храм
	var ambientLight, spotLight;                            // Рассеянный свет
	var boardLightLeft, boardLightRight;                    // Освещение досок
	var boardSofitLeft, boadrSofitRight;                    // Освещение досок
	var boardsCtrl;                                         // Объект, управляющий досками объявлений

	var numLights = 10;										// Кол-во светлячков
	var lights = [];

	loadResources();

	/**
	*	Загружает ресурсы и сохраняет их в объекте resources
	*   По окончанию загрузки запускает методы init(); и animate();
	*/
	function loadResources() {
		resources = new Resources();

		// текстуры для скайбокса
		resources.addTexture('image/skybox/grimmnight_rt.jpg');
		resources.addTexture('image/skybox/grimmnight_lf.jpg');
		resources.addTexture('image/skybox/grimmnight_up.jpg');
		resources.addTexture('image/skybox/grimmnight_dn.jpg');
		resources.addTexture('image/skybox/grimmnight_bk.jpg');
		resources.addTexture('image/skybox/grimmnight_ft.jpg');
		
		// текстуры для пола
		resources.addTexture('image/floor_trap.jpg');
		resources.addTexture('image/grass.png');

		// Текстуры для досок с объявлениями
		resources.addTexture('image/wood.jpg');
		resources.addTexture('image/tall.jpg');
		resources.addTexture('image/advert.jpg');

		resources.addTexture('image/brick.jpg');

		// модельки деревьев
		resources.addModel('model/trees/tree1.js');
		resources.addModel('model/trees/tree2.js');
		resources.addModel('model/trees/tree3.js');
		resources.addModel('model/trees/tree4.js');

		// храм
		resources.addModel('model/temple/temple.js');

		resources.load(function() {
			init();
			animate();
		});
	}

	/**
	*	инициализация холста и мира
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
	*	Вызывается в цикле для отрисовки и изменения мира
	*/
	function animate() {
		requestAnimationFrame( animate );

		modify();

		// В переменной delta получаем время, за которое выполнилась функция update
		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		// Смещаем объекты на расстояние, зависящее от delta
		update(delta);

		prevTime = time;

		renderer.render( scene, camera );
	}

	/**
	*	Инициализация всего, что связано с камерой и управлением
	*/
	function initControls() {
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 7);

		controls = new THREE.OverviewControls(camera);  // Создаем объект управления камерой
	}

	/**
	*	Инициализация рендерера
	*/
	function initRenderer() {
		renderer = new THREE.WebGLRenderer({'antialias':true});

		// Настраиваем рендерер
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		renderer.physicallyBasedShading = true;
		renderer.shadowMapCullFace = THREE.CullFaceBack;

		// Добавляем DOM элемент на страницу, в котором будет происходить отрисовка
		$(document.body).prepend(renderer.domElement);
	}

	/**
	*	Тут инициализируем объекты мира
	*/
	function initWorldObjects() {
		skyBox = new SkyBox(resources);
		terrain = new Terrain(resources);
		buildings = new Buildings(resources);
		boardsCtrl = new BoardsController(resources);
	}

	/**
	*	Тут инициализируем свет
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
	*	Создаем сцену и запихиваем в нее все, что нужно
	*/
	function initScene() {
		scene = new THREE.Scene();

		scene.add(controls.getObject()); // Добавляем камеру в сцену
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
	*	Здесь обновляем модели. Запихваем сюда все трудоемкие операции.
	*   Время выполнения этой функции будет засекаться для
	*   движений объектов в зависимоисти от тормозов
	*/
	function modify() {

	}

	/**
	*	Тут двигаем все, что зависит от времени выполнения такта (delta)
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

	// Настраиваем камеру в зависимости от размера страницы
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