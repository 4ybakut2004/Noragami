function getPanel(sizeX, sizeZ, texture, repeatX, repeatZ){
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(repeatX, repeatZ);
	texture.anisotropy = 16;
	
	var material = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide, map: texture});
	var geometry = new THREE.PlaneGeometry(sizeX, sizeZ);
	
	var plane = new THREE.Mesh(geometry, material);
	plane.receiveShadow = true;
	return plane;
}

function getBox(){
	var box = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.002, 0.002),
						new THREE.MeshFaceMaterial([
						new THREE.MeshLambertMaterial({color: 0xffffff, overdraw: true}),
						new THREE.MeshLambertMaterial({color: 0xffffff, overdraw: true}),
						new THREE.MeshLambertMaterial({color: 0xffffff, overdraw: true}),
						new THREE.MeshLambertMaterial({color: 0xffffff, overdraw: true}),
						new THREE.MeshLambertMaterial({color: 0xffffff, overdraw: true}),
						new THREE.MeshLambertMaterial({color: 0xffffff, overdraw: true})
				]));
	box.receiveShadow = true;
	box.castShadow = true;
	return box;
}

var Terrain = function(resources) {
	
	var object = new THREE.Object3D();

	var terrain;					// объект пола
	var footpath;					// объект тропински
	var borderLeft;					// объект левого бордюра
	var borderRight;				// объект правого бордюра
	var treesLeft = [];             // массив левых деревьев
	var treesRight = [];            // массив правых деревьев
	var treesCount = 7;
	
	/**
	* все, что относится к инициализации травы
	*/
	terrain = getPanel(10, 10, resources.textures.grass, 40, 40);
	terrain.rotation.x = 3.14 / 2;
	terrain.position.y = -0.2;
	
	/**
	* все, что относится к инициализации тропинки
	*/
	footpath = getPanel(0.5, 5, resources.textures.floor_trap, 5, 40);
	footpath.rotation.x = 3.14 / 2;
	footpath.position.y = -0.198;
	
	/**
	* все, что относится к инициализации бордюров
	*/
	
	borderLeft = getBox();
									
	borderLeft.rotation.y = 3.14 / 2 + 3.14;
	borderLeft.position.y = -0.18;
	borderLeft.position.x = -0.224;
	
	borderRight = getBox();
									
	borderRight.rotation.y = 3.14 / 2 + 3.14;
	borderRight.position.y = -0.18;
	borderRight.position.x = 0.223;

	/**
	* все, что относится к инициализации деревьев
	*/
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
	
	object.add(terrain);
	object.add(footpath);
	object.add(borderLeft);
	object.add(borderRight);
	
	this.getObject = function() {
		return object;
	};
};