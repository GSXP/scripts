#pragma strict

import System.Collections.Generic;

var mobsInThisRoom : List.<GameObject>;
private var heroIsHere : boolean;
private var sidekickIsHere : boolean;

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