#pragma strict

class Gold1Component extends TreasureComponent{

	function Gold1Component(){
		super();
	}
	
	function Start(){
		var treasure : GameObject = this.gameObject;
		var renderer = treasure.GetComponent(Renderer);
		renderer.material.color = Color.yellow;
		treasure.transform.localScale = new Vector3(.4, .4, .4);
		super();
	}

	function collect(){
		//TODO: Increase gold count by 1 when this treasure is collected.
		super.collect();
	}

}
