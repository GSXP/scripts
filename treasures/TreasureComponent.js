#pragma strict

import System.Collections.Generic;

class TreasureComponent extends MonoBehaviour{

	function TreasureComponent(){
		super();
	}

	function Start() {
		// render me
		renderer.enabled = true;
		// allow character to pass over me
		collider.isTrigger = true;
	}

	function OnTriggerEnter(collidee : Collider) {
		var obj = collidee.gameObject;
		
		if (obj.name == "Sidekick") {
			collect();
		}
	}
	
	function collect(){
		GameObject.Destroy(gameObject);
	}
	
}