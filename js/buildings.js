var Buildings = function(resources) {

	var object = new THREE.Object3D();

	var temple; // Храм

	init();

	function init() {
		temple = resources.models.temple;
		temple.scale.x = temple.scale.y = temple.scale.z = 0.0022;
		temple.position.z = -1.1;
		temple.position.y = -0.24;
		temple.position.x = 0.045;
		temple.rotation.x = -3.14/1.98;
		temple.castShadow = true;
		temple.receiveShadow = true;

		object.add(temple);
	}

	this.getObject = function() {
		return object;
	};
};