#pragma strict

class Gold20Component extends TreasureComponent{

	function Gold20Component(){
		super();
	}
	
	function Start(){
		var treasure : GameObject = this.gameObject;
		var renderer = treasure.GetComponent(Renderer);
		renderer.material.color = Color.yellow;
		treasure.transform.localScale = new Vector3(1, 1, 1);
		super();
	}

	function collect(){
		//TODO: Increase gold count by 20 when this treasure is collected.
		super.collect();
	}

}
