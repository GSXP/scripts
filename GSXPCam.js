#pragma strict

var speed : float = 1;
var door : GameObject;
private var cameraDest : Vector3;

function moveToDoor(newDoor : GameObject) {
	door = newDoor;
	// Set the camera's destination (door -> doors -> room -> position)
	cameraDest = door.transform.parent.parent.position;
	// But maintain the same z
	cameraDest.z = camera.transform.position.z;
}

function Update() {
	// If we're not going anywhere, don't do anything
	if (door == null)
		return;
	
	// Move towards the room with the door
	transform.position = Vector3.MoveTowards(transform.position, cameraDest, speed);
	if (transform.position == cameraDest) {
		arrived();
	}
}

// Let the door holding the sidekick know that we've arrived
function arrived() {
	door.GetComponent(DoorController).arrived();
	door = null;
	Time.timeScale = 1;
}
