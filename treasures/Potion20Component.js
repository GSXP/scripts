#pragma strict

class Potion20Component extends TreasureComponent{

	function Potion20Component(){
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
		GameObject.Find("Sidekick").GetComponent(inventory).addPotion(20);
		super.collect();
	}

}
