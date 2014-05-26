THREE.OverviewControls = function ( camera ) {

	// Направления движения камеры
	var RotationDirections = {
		left: 0,
		right: 1
	};

	var scope = this; // Необходимо для доступа к окружению из обработчиков событий

	camera.rotation.set( 0, 0, 0 );

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var yawObject = new THREE.Object3D();
	yawObject.position.y = 0;
	yawObject.add( pitchObject );

	var PI_2 = Math.PI / 2;

	var rotationSpeed = 0.01;
	var rotationDirection = RotationDirections.left;
	var rotationLimit = Math.PI / 30;

	this.getObject = function () {

		return yawObject;

	};

	this.update = function (delta) {
		var dr = rotationSpeed * delta;

		switch(rotationDirection) {
			case RotationDirections.left:
				yawObject.rotation.y += dr;

				if(yawObject.rotation.y > rotationLimit) {
					yawObject.rotation.y = rotationLimit;
					rotationDirection = RotationDirections.right;
				}

				break;

			case RotationDirections.right:
				yawObject.rotation.y -= dr;

				if(yawObject.rotation.y < - rotationLimit) {
					yawObject.rotation.y = - rotationLimit;
					rotationDirection = RotationDirections.left;
				}

				break;
		} 
	};

};