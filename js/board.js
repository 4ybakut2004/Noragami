var Board = function(resources) {

	var object = new THREE.Object3D();

	var trunk;          // Столбик
	var board;          // Сама доска
	var adverts = [];   // Массив с объявлениями

	// Предустановленные позиции объявлений
	var advertsPositions = [
		new THREE.Vector3(-0.04, 0.135, 0.0053),
		new THREE.Vector3(-0.02, 0.065, 0.0053),
		new THREE.Vector3(0.0, 0.135, 0.0053),
		new THREE.Vector3(0.02, 0.065, 0.0053),
		new THREE.Vector3(0.04, 0.135, 0.0053),
	];

	init();

	function init() {
		trunk = createTrunk();
		board = createBoard();

		object.add(trunk);
		object.add(board);
	}

	function createTrunk() {
		var texture = resources.textures.tall.clone();
		texture.needsUpdate = true;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(2, 5);
		texture.anisotropy = 16;

		var geometry = new THREE.CylinderGeometry( 0.005, 0.005, 0.25);
		var material = new THREE.MeshLambertMaterial( {map: texture} );

		var mesh = new THREE.Mesh( geometry, material );
		mesh.receiveShadow = true;
		mesh.castShadow = true;

		return mesh;
	}

	function createBoard() {
		var texture = resources.textures.wood.clone();
		texture.needsUpdate = true;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(2, 5);
		texture.anisotropy = 16;

		var box = getBox({
			sizeX: 0.12,
			sizeY: 0.15,
			sizeZ: 0.01,
			texture: texture
		});

		box.position.y = 0.1;
		box.castShadow = true;
		box.receiveShadow = true;
		
		return box;
	}

	this.addAdvert = function() {
		// Достаем количество объявлений
		var advertsCount = adverts.length;
		// Смотрим, сколько максимум
		var maxAdverts = advertsPositions.length;

		var coords;

		// Создаем объявляшку
		var advert = createAdvert();
		var deleted;

		// Если доска переполнена, отрываем старое объявление и смещаем все в его сторону
		if(advertsCount >= maxAdverts) {
			deleted = adverts.shift();
			object.remove(deleted);
			advertsCount--;

			// Смещаем объвяления
			for(var i = 0; i < advertsCount; i++) {
				adverts[i].position.x = advertsPositions[i].x;
				adverts[i].position.y = advertsPositions[i].y;
				adverts[i].position.z = advertsPositions[i].z;
			}
		}

		// Настраиваем координаты объявления
		advert.position.x = advertsPositions[advertsCount].x;
		advert.position.y = advertsPositions[advertsCount].y;
		advert.position.z = advertsPositions[advertsCount].z;

		object.add(advert);
		adverts.push(advert);

		return deleted;
	};

	function createAdvert() {
		var texture = resources.textures.advert.clone();
		texture.needsUpdate = true;

		var advert = getPanel(0.03, 0.06, texture, 1.0, 1.0);
		advert.receiveShadow = true;

		return advert;
	}

	this.getObject = function() {
		return object;
	};
};