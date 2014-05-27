var Terrain = function(resources) {
	
	var object = new THREE.Object3D();

	var terrain;					// объект пола
	var footpath;					// объект тропинки
	var borderLeft;					// объект левого бордюра
	var borderRight;				// объект правого бордюра
	var treesLeft = [];             // массив левых деревьев
	var treesRight = [];            // массив правых деревьев
	var treesCount = 7;

	init();

	function init() {
		initGrass();
		initFootPath();
		initBorders();
		initTrees();
		
		object.add(terrain);
		object.add(footpath);
		object.add(borderLeft);
		object.add(borderRight);
	}
	
	/**
	* все, что относится к инициализации травы
	*/
	function initGrass() {
		terrain = getPanel(10, 10, resources.textures.grass, 40, 40);
		terrain.rotation.x = 3.14 / 2;
		terrain.position.y = -0.2;
		terrain.receiveShadow = true;
	}
	
	/**
	* все, что относится к инициализации тропинки
	*/
	function initFootPath() {
		footpath = getPanel(0.5, 5, resources.textures.floor_trap, 5, 40, 0x777777);
		footpath.rotation.x = 3.14 / 2;
		footpath.position.y = -0.198;
		footpath.receiveShadow = true;
	}
	
	/**
	* все, что относится к инициализации бордюров
	*/
	function initBorders() {
		borderLeft = getBox({
			sizeX: 5.0, 
			sizeY: 0.002,
			sizeZ: 0.002,
			color: 0xffffff
		});
										
		borderLeft.rotation.y = 3.14 / 2 + 3.14;
		borderLeft.position.y = -0.18;
		borderLeft.position.x = -0.224;
		borderLeft.receiveShadow = true;
		
		borderRight = getBox({
			sizeX: 5.0, 
			sizeY: 0.002,
			sizeZ: 0.002,
			color: 0xffffff
		});
										
		borderRight.rotation.y = 3.14 / 2 + 3.14;
		borderRight.position.y = -0.18;
		borderRight.position.x = 0.223;
		borderRight.receiveShadow = true;
	}

	/**
	* все, что относится к инициализации деревьев
	*/
	function initTrees() {
		for(var i = 0; i < treesCount * 2; i++) {
			var treeNumber = getRandomInt(1, 4);
			var tree = resources.models["tree" + treeNumber].clone();
			tree.castShadow = true;

			tree.scale.x = 0.06;
			tree.scale.y = 0.06;
			tree.scale.z = 0.06;

			tree.position.y = -0.2;
			tree.position.z = - (i % treesCount) * 1.5 / treesCount - 0.4;

			if(i < treesCount) {
				tree.position.x = -0.5;
				treesLeft.push(tree);
			}
			else {
				tree.position.x = 0.5;
				treesRight.push(tree);
			}

			object.add(tree);
		}
	}
	
	this.getObject = function() {
		return object;
	};
};