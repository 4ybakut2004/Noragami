var Firefiles = function(resources){

	var fireflies;					// параметры светл€чков
	var engine;						// прив€зка светл€чков
	
	this.initFireflies = function (scene) {
		fireflies = {
			positionStyle  : Type.CUBE,
			positionBase   : new THREE.Vector3( 0, 0.0, -1.2 ),
			positionSpread : new THREE.Vector3( 1.4, 0.8, 1.0 ),

			velocityStyle  : Type.CUBE,
			velocityBase   : new THREE.Vector3( 0, 0, 0 ),
			velocitySpread : new THREE.Vector3( 0.06, 0.02, 0.06 ), 
			
			particleTexture : resources.textures.spark,

			sizeBase   : 0.03,
			sizeSpread : 0.15,
			opacityTween : new Tween([0.0, 1.0, 1.1, 2.0, 2.1, 3.0, 3.1, 4.0, 4.1, 5.0, 5.1, 6.0, 6.1],
									 [0.2, 0.2, 1.0, 1.0, 0.2, 0.2, 1.0, 1.0, 0.2, 0.2, 1.0, 1.0, 0.2] ),				
			colorBase   : new THREE.Vector3(0.30, 1.0, 0.6), // H,S,L
			colorSpread : new THREE.Vector3(0.03, 0.0, 0.0),

			particlesPerSecond : 10,
			particleDeathAge   : 6.1,		
			emitterDeathAge    : 60
		}
		
		engine = new ParticleEngine();
		engine.setValues( fireflies );
		engine.initialize(scene);
	}
	
	this.update = function(delta){
		engine.update(delta * 0.5);
	}
}