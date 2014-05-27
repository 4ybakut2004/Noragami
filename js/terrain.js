function getPanel(sizeX, sizeZ, texture, repeatX, repeatZ){
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(repeatX, repeatZ);
	texture.anisotropy = 16;
	
	var material = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide, map: texture});
	var geometry = new THREE.PlaneGeometry(sizeX, sizeZ);
	
	var plane = new THREE.Mesh(geometry, material);
	return plane;
}

function getBox(sizeX, sizeY, sizeZ, colorMap){
	var box = new THREE.Mesh(new THREE.BoxGeometry(sizeX, sizeY, sizeZ),
						new THREE.MeshFaceMaterial([
						new THREE.MeshLambertMaterial({color: colorMap, overdraw: true}),
						new THREE.MeshLambertMaterial({color: colorMap, overdraw: true}),
						new THREE.MeshLambertMaterial({color: colorMap, overdraw: true}),
						new THREE.MeshLambertMaterial({color: colorMap, overdraw: true}),
						new THREE.MeshLambertMaterial({color: colorMap, overdraw: true}),
						new THREE.MeshLambertMaterial({color: colorMap, overdraw: true})
				]));
	return box;
}

function getBoxTexture(sizeX, sizeY, sizeZ, colorMap){
	var box = new THREE.Mesh(new THREE.BoxGeometry(sizeX, sizeY, sizeZ),
						new THREE.MeshFaceMaterial([
						new THREE.MeshLambertMaterial({map: colorMap, overdraw: true}),
						new THREE.MeshLambertMaterial({map: colorMap, overdraw: true}),
						new THREE.MeshLambertMaterial({map: colorMap, overdraw: true}),
						new THREE.MeshLambertMaterial({map: colorMap, overdraw: true}),
						new THREE.MeshLambertMaterial({map: colorMap, overdraw: true}),
						new THREE.MeshLambertMaterial({map: colorMap, overdraw: true})
				]));
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
	terrain.receiveShadow = true;
	
	/**
	* все, что относится к инициализации тропинки
	*/
	footpath = getPanel(0.5, 5, resources.textures.floor_trap, 5, 40);
	footpath.rotation.x = 3.14 / 2;
	footpath.position.y = -0.198;
	footpath.receiveShadow = true;
	
	/**
	* все, что относится к инициализации бордюров
	*/
	
	borderLeft = getBox(5.0, 0.002, 0.002, 0xffffff);
									
	borderLeft.rotation.y = 3.14 / 2 + 3.14;
	borderLeft.position.y = -0.18;
	borderLeft.position.x = -0.224;
	borderLeft.receiveShadow = true;
	
	borderRight = getBox(5.0, 0.002, 0.002, 0xffffff);
									
	borderRight.rotation.y = 3.14 / 2 + 3.14;
	borderRight.position.y = -0.18;
	borderRight.position.x = 0.223;
	borderRight.receiveShadow = true;

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
	
	texture = resources.textures.tall;
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(2, 5);
	texture.anisotropy = 16;
	
	geometry = new THREE.CylinderGeometry( 0.005, 0.005, 0.25);
	material = new THREE.MeshLambertMaterial( {map: texture} );
	
	var cylinderLeft = new THREE.Mesh( geometry, material );
	cylinderLeft.position.z = -0.30;
	cylinderLeft.position.x = -0.3;
	cylinderLeft.position.y = -0.1;
	cylinderLeft.receiveShadow = true;
	cylinderLeft.castShadow = true;
	object.add(cylinderLeft);
	
	var cylinderRight = new THREE.Mesh( geometry, material );
	cylinderRight.position.z = -0.30;
	cylinderRight.position.x = 0.3;
	cylinderRight.position.y = -0.1;
	cylinderRight.receiveShadow = true;
	cylinderRight.castShadow = true;
	object.add(cylinderRight);
	
	texture = resources.textures.wood;
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(2, 5);
	texture.anisotropy = 16;
	
	var panelAdventLeft = getBoxTexture(0.12, 0.15, 0.01, texture);
	panelAdventLeft.position.z = -0.30;
	panelAdventLeft.position.x = -0.3;
	panelAdventLeft.rotation.y = 3.14/2.5;
	panelAdventLeft.castShadow = true;
	panelAdventLeft.receiveShadow = true;
	object.add(panelAdventLeft);
	
	var panelAdventRight = getBoxTexture(0.12, 0.15, 0.01, texture);
	panelAdventRight.position.z = -0.30;
	panelAdventRight.position.x = 0.3;
	panelAdventRight.rotation.y = -3.14/2.5;
	panelAdventLeft.castShadow = true;
	panelAdventLeft.receiveShadow = true;
	object.add(panelAdventRight);
	
	object.add(terrain);
	object.add(footpath);
	object.add(borderLeft);
	object.add(borderRight);
	
	this.getObject = function() {
		return object;
	};
};