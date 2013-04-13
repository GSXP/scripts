#pragma strict

class TreasureMaker{

	function TreasureMaker(){
	
	}
	
	function makeGold1(position : Vector3){
		var treasure : GameObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
		treasure.transform.position = position;
		treasure.AddComponent("Gold1Component");
		return treasure;
	}
	
	function makeGold5(position : Vector3){
		var treasure : GameObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
		treasure.transform.position = position;
		treasure.AddComponent("Gold5Component");
		return treasure;
	}
	
	function makeGold20(position : Vector3){
		var treasure : GameObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
		treasure.transform.position = position;
		treasure.AddComponent("Gold20Component");
		return treasure;
	}
	
	function makePotion5(position : Vector3){
		var treasure : GameObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
		treasure.transform.position = position;
		treasure.AddComponent("Potion5Component");
		return treasure;
	}
	
	function makePotion20(position : Vector3){
		var treasure : GameObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
		treasure.transform.position = position;
		treasure.AddComponent("Potion20Component");
		return treasure;
	}
	
	function makeCooldownRestore(position : Vector3){
		var treasure : GameObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
		treasure.transform.position = position;
		treasure.AddComponent("CooldownRestoreComponent");
		return treasure;
	}
	
	function makeRandomTreasure(position : Vector3){
	
		var randNum : int = Random.value * 99;
		
		if(randNum < 40)
			return makeGold1(position);
		if(randNum < 60)
			return makeGold5(position);
		if(randNum < 70)
			return makeGold20(position);
		if(randNum < 85)
			return makePotion5(position);
		if(randNum < 95)
			return makePotion20(position);
		else
			return makeCooldownRestore(position);
	
	}

}
