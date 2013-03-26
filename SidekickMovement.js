#pragma strict

private var stats : Stats;
private var charController : CharacterController;
private var face : FaceDirection;

private var hasTarget : boolean = false;
private var target : Vector3 = Vector3.zero;
private var rightMouseDown : boolean = false;

function Start() {
	stats = gameObject.GetComponent(Stats);
	charController = gameObject.GetComponent(CharacterController);
	face = gameObject.GetComponent(FaceDirection);
}

// Used by doors so sidekick doesn't continue trying to move towards door's center after teleport
function clearTarget() {
	hasTarget = false;
}

function Update () {
	
	// hold right mouse to move
	if (Input.GetMouseButtonDown(1)) {
		rightMouseDown = true;
	}
	if (Input.GetMouseButtonUp(1)) {
		rightMouseDown = false;
	}

	var move : Vector3 = Vector3.zero;
	// Check if right-clicked to move
	if(rightMouseDown) {
		target = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		target.z = 0;
		hasTarget = true;
	}
	// Move towards target (if there is one)
	if(hasTarget) {
		move = Vector3.MoveTowards(transform.position, target, stats.getMoveSpeed() * Time.deltaTime) - transform.position;
		charController.Move(move);
		if (transform.position == target)
			hasTarget = false;
	}
	// Check keyboard movement
	var horizontal = Input.GetAxis("Horizontal");
	var vertical = Input.GetAxis("Vertical");
	if (horizontal!=0 || vertical !=0) {
		hasTarget = false;
		move = Vector3(horizontal, vertical, -transform.position.z);
		move *= stats.getMoveSpeed() * Time.deltaTime;
		charController.Move(move);
	}
	// If moved, update face
	if (move != Vector3.zero)
		face.moved(move);
}