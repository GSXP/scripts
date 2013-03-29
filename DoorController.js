#pragma strict

import System.Collections.Generic;

var targetDoor : DoorController;

function Awake() {
	// If I'm a door that goes somewhere
	if (targetDoor != null) {	
		// render me
		renderer.enabled = true;
		// allow character to pass over me
		collider.isTrigger = true;
	}
}

// GSXPCamera calls this when it arrives in the new room
function arrived() {
	//print('camera arrived');
}

function OnTriggerEnter(collidee : Collider) {
	var obj = collidee.gameObject;
	
	// get destination position
	var destination_pos : Vector3 = targetDoor.transform.position;
	var starting_pos: Vector3 = this.transform.position;
	var door_width = 4; // estimation
	var door_height = 4; // estimation
	
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
		obj.GetComponent(SidekickMovement).clearTarget();
		Camera.main.GetComponent(GSXPCam).moveToDoor(targetDoor.gameObject);
	} else if(obj.GetComponent(NPCMovement) != null) {
		// it's an npc
		// clear its target now
		obj.GetComponent(NPCMovement).clearTarget();
	}
}