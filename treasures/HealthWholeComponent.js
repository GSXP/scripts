#pragma strict

class HealthWholeComponent extends TreasureComponent{

	function HealthWholeComponent(){
		super();
	}
	
	function Start(){
		var treasure : GameObject = this.gameObject;
		var renderer = treasure.GetComponent(Renderer);
		renderer.material.color = Color.red;
		treasure.transform.localScale = new Vector3(1, 1, 1);
		super();
	}

	function collect(){
		//TODO: Increase health to maximum when this treasure is collected.
		super.collect();
	}

}
