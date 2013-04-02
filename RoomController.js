#pragma strict

import System.Collections.Generic;

var mobsInThisRoom : List.<GameObject>;
private var heroIsHere : boolean;
private var sidekickIsHere : boolean;
private var shortestPath : ShortestPath;

function Awake() {
	mobsInThisRoom = new List.<GameObject>();
	heroIsHere = false;
	sidekickIsHere = false;
}

function isHeroHere() {
	return heroIsHere;
}

function isSidekickHere() {
	return sidekickIsHere;
}

function mobCount() : int {
	return mobsInThisRoom.Count;
}

function OnTriggerEnter(objCollider : Collider) {
	var object : GameObject = objCollider.gameObject;
	switch (object.name) {
		case "Hero":
			if (heroIsHere) return;
			heroIsHere = true;
			break;
		case "Mob":
			if(mobsInThisRoom.Contains(object)) return;
			mobsInThisRoom.Add(object);
			break;
		case "Sidekick":
			if (sidekickIsHere) return;
			sidekickIsHere = true;
			break;
	}
	
	object.GetComponent(Behavior).setRoom(gameObject);
	HighlightPathToHero();
}

function OnTriggerExit(objCollider : Collider) {
	switch (objCollider.name) {
		case "Hero":
			heroIsHere = false;
			break;
		case "Mob":
			mobsInThisRoom.Remove(objCollider.gameObject);
			break;
		case "Sidekick":
			sidekickIsHere = false;
			break;
	}
}

// used to direct player toward a lost hero (different room)
function HighlightPathToHero() {
	// determine rooms occupied by hero/sidekick
	var	heroRoom : GameObject = GameObject.Find('Hero').GetComponent(Behavior).getRoom();
	var	sidekickRoom : GameObject = GameObject.Find('Sidekick').GetComponent(Behavior).getRoom();
	// are they in the same room?
	var inSameRoom = (heroRoom == sidekickRoom) ? true : false;
	if (!inSameRoom) { // different rooms
		shortestPath = new ShortestPath();
		if (sidekickRoom && heroRoom) {
			// find next door (from sidekick room to hero room)
			var nextDoor = shortestPath.NextDoorTowardEnd(sidekickRoom, heroRoom);
			sidekickRoom.transform.Find('Doors/North').renderer.material.color = Color.black;
			sidekickRoom.transform.Find('Doors/East').renderer.material.color = Color.black;
			sidekickRoom.transform.Find('Doors/South').renderer.material.color = Color.black;
			sidekickRoom.transform.Find('Doors/West').renderer.material.color = Color.black;
			if (nextDoor) {
				// highlight next door
				nextDoor.renderer.material.color = Color.green;
			}
		}
	}
	else { // same room
		if (sidekickRoom) {
			sidekickRoom.transform.Find('Doors/North').renderer.material.color = Color.black;
			sidekickRoom.transform.Find('Doors/East').renderer.material.color = Color.black;
			sidekickRoom.transform.Find('Doors/South').renderer.material.color = Color.black;
			sidekickRoom.transform.Find('Doors/West').renderer.material.color = Color.black;
		}
	}
}
