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

function getPanelWithMapHeight(sizeX, sizeZ, texture, repeatX, repeatZ, specular, mapNormal, mapHeight){
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(repeatX, repeatZ);
	texture.anisotropy = 16;

	mapHeight.wrapS = THREE.RepeatWrapping;
	mapHeight.wrapT = THREE.RepeatWrapping;
	mapHeight.repeat.set(repeatX, repeatZ);
	mapHeight.anisotropy = 16;
	
	mapNormal.wrapS = THREE.RepeatWrapping;
	mapNormal.wrapT = THREE.RepeatWrapping;
	mapNormal.repeat.set(repeatX, repeatZ);
	mapNormal.anisotropy = 16;
	
	if(!specular) {
		specular = 0x000000;
	}
	
	var material = new THREE.MeshPhongMaterial( { map: texture, bumpMap: mapHeight, bumpScale: 0.5, normalMap: mapNormal, shininess: 75, specular: specular, wrapAround: true, metal: true, side: THREE.DoubleSide } );
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
		bumpMap: options.bumpMap, 
		bumpScale: options.bumpScale, 
		normalMap: options.normalMap, 
		shininess: options.shininess, 
		specular: options.specular, 
		wrapAround: options.wrapAround,
		metal: options.metal, 
		side: options.side
	};

	var box = new THREE.Mesh(new THREE.BoxGeometry(options.sizeX, options.sizeY, options.sizeZ),
						new THREE.MeshFaceMaterial([
						new THREE.MeshPhongMaterial(materialOptions),
						new THREE.MeshPhongMaterial(materialOptions),
						new THREE.MeshPhongMaterial(materialOptions),
						new THREE.MeshPhongMaterial(materialOptions),
						new THREE.MeshPhongMaterial(materialOptions),
						new THREE.MeshPhongMaterial(materialOptions)
				]));
	return box;
}