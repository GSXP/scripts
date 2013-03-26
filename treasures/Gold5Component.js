#pragma strict

class Gold5Component extends TreasureComponent{

	function Gold5Component(){
		super();
	}
	
	function Start(){
		var treasure : GameObject = this.gameObject;
		var renderer = treasure.GetComponent(Renderer);
		renderer.material.color = Color.yellow;
		treasure.transform.localScale = new Vector3(.7, .7, .7);
		super();
	}

	function collect(){
		//TODO: Increase gold count by 5 when this treasure is collected.
		super.collect();
	}

}
