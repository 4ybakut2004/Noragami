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

	loadResources();

	/**
	*	Загружает ресурсы и сохраняет их в объекте resources
	*   По окончанию загрузки запускает методы init(); и animate();
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
	*	инициализация холста и мира
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
	}

	/**
	*	Создаем сцену и запихиваем в нее все, что нужно
	*/
	function initScene() {
		scene = new THREE.Scene();

		scene.add(controls.getObject()); // Добавляем камеру в сцену
		scene.add(skyBox.getObject());
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