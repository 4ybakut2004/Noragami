var BoardsController = function(resources) {

	var object = new THREE.Object3D();

	var boardLeft, boardRight;      // доски с объявлениями

	init();

	function init() {
		initBoards();

		object.add(boardLeft.getObject());
		object.add(boardRight.getObject());
	}

	function initBoards() {
		boardLeft = new Board(resources);
		boardLeft.getObject().position.z = -0.3;
		boardLeft.getObject().position.x = -0.3;
		boardLeft.getObject().position.y = -0.1;
		boardLeft.getObject().rotation.y = 3.14/2.5;

		boardLeft.addAdvert();
		boardLeft.addAdvert();
		boardLeft.addAdvert();
		boardLeft.addAdvert();
		boardLeft.addAdvert();

		boardRight = new Board(resources);
		boardRight.getObject().position.z = -0.3;
		boardRight.getObject().position.x = 0.3;
		boardRight.getObject().position.y = -0.1;
		boardRight.getObject().rotation.y = -3.14/2.5;

		boardRight.addAdvert();
		boardRight.addAdvert();
		boardRight.addAdvert();
		boardRight.addAdvert();
		boardRight.addAdvert();
	}

	this.getObject = function() {
		return object;
	};

};