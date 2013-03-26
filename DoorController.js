#pragma strict

import System.Collections.Generic;

var targetDoor : DoorController;
// Make this a list if multiple objects can come through at once
private var inboundObjects : List.<GameObject>;

function Start() {
	// If I'm a door that goes somewhere
	if (targetDoor != null) {	
		// render me
		renderer.enabled = true;
		// allow character to pass over me
		collider.isTrigger = true;
		// Prepare inbound queue
		inboundObjects = new List.<GameObject>();
	}
}

// Allows doors to tell each other that someone is coming so they don't get stuck in a teleporting loop
function incoming(object : GameObject) {
	inboundObjects.Add(object);
}

// GSXPCamera calls this when it arrives in the new room
function arrived() {
	for each (var object in inboundObjects) {
		if (object.name == "Sidekick") {
			object.SetActive(true);
			return;
		}
	}
	
	// Sanity Check
	print("Hey you called arrived on a door but the sidekick isn't here!");
}

function OnTriggerEnter(collidee : Collider) {
	var obj = collidee.gameObject;
	
	if (inboundObjects.Contains(obj)) {
		// Whatever just entered came from another door, so don't send it back
		//return;
	}
	
	// get destination position
	targetDoor.incoming(obj.gameObject);
	var destination_pos : Vector3 = targetDoor.transform.position;
	var starting_pos: Vector3 = this.transform.position;
	var door_width = 4; // estimation
	var door_height = 3; // estimation
	
	// determine which direction we're teleporting
	var x_offset : double = 0;
	var y_offset : double = 0;
	if (starting_pos.x > destination_pos.x) { // moving west
		x_offset = -door_width;
	}
	else if (starting_pos.x < destination_pos.x) { // moving east
		x_offset = door_width;
	}
	else if (starting_pos.y > destination_pos.y) { // moving north
		y_offset = -door_height;
	}
	else if (starting_pos.y < destination_pos.y) { // moving south
		y_offset = door_height;
	}
	
	// Otherwise, teleport to the targetdoor
	obj.transform.position.x = destination_pos.x + x_offset;
	obj.transform.position.y = destination_pos.y + y_offset;
	
	// If it's the sidekick, have the camera follow
	if (obj.name == "Sidekick") {
		Time.timeScale = 0;
		obj.SetActive(false);
		obj.GetComponent(SidekickMovement).clearTarget();
		Camera.main.GetComponent(GSXPCam).moveToDoor(targetDoor.gameObject);
	} else if(obj.GetComponent(NPCMovement) != null) {
		// it's an npc
		// clear it's target now
		obj.GetComponent(NPCMovement).clearTarget();
	}
}

function OnTriggerExit(obj : Collider) {
	inboundObjects.Remove(obj.gameObject);
}