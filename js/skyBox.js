var SkyBox = function() {
    var tex1 = THREE.ImageUtils.loadTexture('image/skybox/grimmnight_rt.jpg');
	var tex2 = THREE.ImageUtils.loadTexture('image/skybox/grimmnight_lf.jpg');
	var tex3 = THREE.ImageUtils.loadTexture('image/skybox/grimmnight_up.jpg');
	var tex4 = THREE.ImageUtils.loadTexture('image/skybox/grimmnight_dn.jpg');
	var tex5 = THREE.ImageUtils.loadTexture('image/skybox/grimmnight_bk.jpg');
	var tex6 = THREE.ImageUtils.loadTexture('image/skybox/grimmnight_ft.jpg');

	var skyBox = new THREE.Mesh(new THREE.BoxGeometry(6, 6, 6, 7, 7, 7),
								new THREE.MeshFaceMaterial([
										new THREE.MeshBasicMaterial({map: tex1, overdraw: true}),
										new THREE.MeshBasicMaterial({map: tex2, overdraw: true}),
										new THREE.MeshBasicMaterial({map: tex3, overdraw: true}),
										new THREE.MeshBasicMaterial({map: tex4, overdraw: true}),
										new THREE.MeshBasicMaterial({map: tex5, overdraw: true}),
										new THREE.MeshBasicMaterial({map: tex6, overdraw: true})
									]));

	skyBox.scale.x = - 1;
	skyBox.rotation.y = 3.14 / 2 + 3.14;

	this.getObject = function() {
		return skyBox;
	};

	this.update = function(position) {
		skyBox.position.x = position.x;
		skyBox.position.y = position.y;
		skyBox.position.z = position.z;
	};
};