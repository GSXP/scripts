#pragma strict

class CooldownRestoreComponent extends TreasureComponent{

	function CooldownRestoreComponent(){
		super();
	}
	
	function Start(){
		var treasure : GameObject = this.gameObject;
		var renderer = treasure.GetComponent(Renderer);
		renderer.material.color = Color.blue;
		treasure.transform.localScale = new Vector3(1, 1, 1);
		super();
	}

	function collect(){
		//TODO: Restore active cooldowns when this treasure is collected.
		super.collect();
	}

}
