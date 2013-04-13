#pragma strict

var gold : int ;
var potion : int;

function Start () {
	gold = 0;
	potion = 10;
}

function Update () {
	if (Input.GetKeyDown("space")){
	//if (Input.GetButtonDown("potion")) {
		print("use potion");
		usePotion();
	}
}

function addGold(goldToAdd :int ){
	gold += goldToAdd;
	print("gold total:"+gold+"\n");
}

function goldTotal(){
	return gold;
}

function potionTotal(){
	return potion;
}

function addPotion(potiondToAdd :int ){
	potion += potiondToAdd;
	print("potion total:"+potion+"\n");
}

function usePotion(){
	if(potion <0){
		return;
	}
	
	var sidekick : GameObject = GameObject.Find("Sidekick");
	var curHp : int = sidekick.GetComponent(Stats).getHealth(); 
	var maxHp : int = sidekick.GetComponent(Stats).getMaxHealth();  
	
	if(curHp < maxHp){
		if( (maxHp - curHp) > potion){
			sidekick.GetComponent(Stats).healHealth(potion);
			potion = 0;
		}else{
			sidekick.GetComponent(Stats).healHealth((maxHp - curHp));
			potion -= (maxHp - curHp);
		}
		return;
	}
	
	var hero : GameObject = GameObject.Find("Hero");
	curHp = hero.GetComponent(Stats).getHealth(); 
	maxHp = hero.GetComponent(Stats).getMaxHealth();  
	
	if(hero.GetComponent(Stats))
	
	if(curHp < maxHp){
		if( (maxHp - curHp) > potion){
			hero.GetComponent(Stats).healHealth(potion);
			potion = 0;
		}else{
			hero.GetComponent(Stats).healHealth((maxHp - curHp));
			potion -= (maxHp - curHp);
		}
		return;
	}
	
}