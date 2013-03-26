#pragma strict

var target : Vector3 = Vector3.zero;
var fireTexture : Texture;
var iceTexture : Texture;
var spellType : int = 0;
var targetType : int = 0;
private var tScaleMob : int = 120;
private var tScaleHero : int = 60;

private var rightMouseDown : boolean = false;

// Used to display the target if holding down the mouse button
function OnGUI() {
	if (Input.GetMouseButton(0)) {
		target = Input.mousePosition;
		var targetTexture = spellType == 0 ? fireTexture : iceTexture;
		target.y = Screen.height - target.y;
		var tScale = targetType == 0 ? tScaleMob : tScaleHero;
		GUI.DrawTexture (Rect (target.x-tScale, target.y-tScale, 2*tScale, 2*tScale),
				targetTexture, ScaleMode.ScaleToFit);
    }
}

function Update () {
	// Toggle spell type
	if (Input.GetKeyDown(KeyCode.E)) {
		spellType = (spellType + 1) % 2;
	}
	
	// Toggle target type
	if (Input.GetKeyDown(KeyCode.R)) {
		targetType = (targetType + 1) % 2;
	}
	
	// left click: cast current spell (0 = fire, 1 = ice)
	if (Input.GetMouseButtonUp(0)) {
		target = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		target.z = 0;
		// This requires that all enemies have the tag 'Mob'
		if (targetType == 0)
			for(var Mob : GameObject in GameObject.FindGameObjectsWithTag("Mob"))
			    Mob.GetComponent(Behavior).CheckSpellRange(target, spellType);
		if (targetType == 1)
			for(var Hero : GameObject in GameObject.FindGameObjectsWithTag("Hero"))
			    Hero.GetComponent(Behavior).CheckSpellRange(target, spellType);
	}
}