function getPanel(sizeX, sizeZ, texture, repeatX, repeatZ, specular){
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(repeatX, repeatZ);
	texture.anisotropy = 16;

	if(!specular) {
		specular = 0x000000;
	}
	
	var material = new THREE.MeshPhongMaterial( { map: texture, shininess: 75, specular: specular, wrapAround: true, metal: true, side: THREE.DoubleSide } );
	var geometry = new THREE.PlaneGeometry(sizeX, sizeZ);
	
	var plane = new THREE.Mesh(geometry, material);
	return plane;
}

/**
 * options = {
 *     sizeX: "ширина",
 *     sizeY: "высота",
 *     sizeZ: "глубина",
 *     color: "цвет",
 *     texture: "текстура"	
 * };
 */
function getBox(options) {

	var materialOptions = {
		color: options.color,
		map: options.texture,
		overdraw: true
	};

	var box = new THREE.Mesh(new THREE.BoxGeometry(options.sizeX, options.sizeY, options.sizeZ),
						new THREE.MeshFaceMaterial([
						new THREE.MeshLambertMaterial(materialOptions),
						new THREE.MeshLambertMaterial(materialOptions),
						new THREE.MeshLambertMaterial(materialOptions),
						new THREE.MeshLambertMaterial(materialOptions),
						new THREE.MeshLambertMaterial(materialOptions),
						new THREE.MeshLambertMaterial(materialOptions)
				]));
	return box;
}