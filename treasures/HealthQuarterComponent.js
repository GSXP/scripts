#pragma strict

class HealthQuarterComponent extends TreasureComponent{

	function HealthQuarterComponent(){
		super();
	}
	
	function Start(){
		var treasure : GameObject = this.gameObject;
		var renderer = treasure.GetComponent(Renderer);
		renderer.material.color = Color.red;
		treasure.transform.localScale = new Vector3(.4, .4, .4);
		super();
	}

	function collect(){
		//TODO: Increase health by 1/4 of maximum when this treasure is collected.
		super.collect();
	}

}
