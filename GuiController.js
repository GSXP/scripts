#pragma strict

var guiHeight : float;

// Valid values are top and bottom. Was going to make an object for an enum,
// but apparently the only way to do that in unity is to create a new script.
var orientation : String;

var healthLeftTexture : Texture2D;
var healthMissingTexture : Texture2D;

var healthBarWidth : float;
var sidekick : GameObject;
var hero : GameObject;
var spellIcons : Texture[];

var vertHealthGap : float;
var horMargin : int;
var horGap : int;
var originY : int ;

function Start () {

	orientation = "TOP";
	guiHeight = Screen.height / 10;
	
	healthBarWidth = Screen.width / 4 - 20;

	sidekick = GameObject.Find("Sidekick");
	hero = GameObject.Find("Hero");
	
	vertHealthGap = (guiHeight - 20) / 3;
  	horMargin = 10;
  	horGap = 10;  	
  	originY = 0;

}

function Update () {

}

function OnGUI(){
	guiHeight = Screen.height / 10;
  	if(guiHeight < 20){
  		guiHeight = 20;
  	}
  	vertHealthGap = (guiHeight - 20) / 3;
  	  	
  	if(orientation == "BOTTOM"){  	
  		originY = Screen.height - guiHeight;	
  	}
  	
  	GUI.Box(new Rect(0, originY, Screen.width, guiHeight), "");
  	
  	GUI.Box(new Rect(Screen.width - guiHeight, originY, guiHeight, guiHeight), "Map");
  	
      		
	drawSidekickHelth();
    drawHeroHelth();
    
    var startX : int = horMargin + healthBarWidth;
    var numGaps : int = spellIcons.length - 1;
    var spellGap : int = 10;
    var spellHeight : int = guiHeight - 20;
    var currX = Screen.width / 2 - (numGaps * spellGap) / 2 - (spellIcons.length * spellHeight) / 2;
 	for(var spell in spellIcons){
 	
 		GUI.Button(new Rect(currX, originY + 10, spellHeight, spellHeight), spell);
 		currX += spellHeight + spellGap;
 	}
}

function max(a : int, b : int){
	return a > b ? a : b;
}

function drawSidekickHelth(){
	if( sidekick != null){
		var SKcurrHealth : float = sidekick.GetComponent(Stats).getHealth() ;
		var SKmaxHealth : float = sidekick.GetComponent(Stats).getMaxHealth();
		var SidekickHealthLeftWidth : float = SKcurrHealth / SKmaxHealth * healthBarWidth;
		  	
		// Draw background of SideKicks health bar.
		GUI.DrawTextureWithTexCoords(Rect(horMargin, originY + vertHealthGap, healthBarWidth, 10), healthMissingTexture, Rect(0, 0, (1.0 * SidekickHealthLeftWidth), 1.0), false);
	    		
		// Draw health left on health bar.
		GUI.DrawTextureWithTexCoords(Rect(horMargin, originY + vertHealthGap, SidekickHealthLeftWidth, 10), healthLeftTexture , Rect(0, 0, (1.0 * healthBarWidth), 1.0), false);
    }else{
   		GUI.DrawTextureWithTexCoords(Rect(horMargin, originY + vertHealthGap, healthBarWidth, 10), healthMissingTexture, Rect(0, 0, 0, 1.0), false);
    }
}


function drawHeroHelth(){
	if( hero != null){
		var HcurrHealth : float = hero.GetComponent(Stats).getHealth() ;
		var HmaxHealth : float = hero.GetComponent(Stats).getMaxHealth();
	 	var HeroHealthLeftWidth : float = HcurrHealth / HmaxHealth * healthBarWidth;
	
		// Draw background of Heros health bar.  		
	 	GUI.DrawTextureWithTexCoords(Rect(horMargin, originY + vertHealthGap * 2 + 10, healthBarWidth, 10), healthMissingTexture,  Rect(0, 0, (1.0 * HeroHealthLeftWidth), 1.0), false);
	 
		// Draw mana left on mana bar.
		GUI.DrawTextureWithTexCoords(Rect(horMargin, originY + vertHealthGap * 2 + 10, HeroHealthLeftWidth, 10),  healthLeftTexture, Rect(0, 0, (1.0 * healthBarWidth), 1.0), false);
    }else{
	 	GUI.DrawTextureWithTexCoords(Rect(horMargin, originY + vertHealthGap * 2 + 10, healthBarWidth, 10), healthMissingTexture,  Rect(0, 0, 0, 1.0), false);
    }
}