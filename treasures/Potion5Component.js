#pragma strict

class Potion5Component extends TreasureComponent{

	function Potion5Component(){
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
		GameObject.Find("Sidekick").GetComponent(inventory).addPotion(5);
		super.collect();
	}

}
