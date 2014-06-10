var Buildings = function(resources) {

	var object = new THREE.Object3D();

	var temple; 						// Храм
	var fence; 							// Забор

	init();

	function init() {
		temple = resources.models.temple;
		temple.scale.x = temple.scale.y = temple.scale.z = 0.0022;
		temple.position.z = -1.1;
		temple.position.y = -0.24;
		temple.position.x = 0.045;
		temple.rotation.x = -3.14/1.98;
		temple.castShadow = true;

		object.add(temple);
		
		fence = getPanelWithMapHeight(6, 0.5, resources.textures.brick, 20, 1, 0x000000,resources.textures.brick_normal, resources.textures.brick_height);
		fence.position.x = 0;
		fence.position.z = -2.5;
		fence.castShadow = true;
		object.add(fence);
		
		fence = getPanelWithMapHeight(3, 0.5, resources.textures.brick, 10, 1, 0x000000,resources.textures.brick_normal, resources.textures.brick_height);
		fence.position.x = -2.5;
		fence.position.z = -2;
		fence.rotation.y = 3.14/2;
		fence.castShadow = true;
		object.add(fence);
		
		fence = getPanelWithMapHeight(3, 0.5, resources.textures.brick, 10, 1, 0x000000,resources.textures.brick_normal, resources.textures.brick_height);
		fence.position.x = 2.5;
		fence.position.z = -2;
		fence.rotation.y = 3.14/2;
		fence.castShadow = true;
		object.add(fence);
	}

	
	this.getObject = function() {
		return object;
	};
};