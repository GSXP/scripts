#pragma strict

var target : Vector3 = Vector3.zero;
var fireTexture : Texture;
var iceTexture : Texture;
var spellType : int = 0;
var targetType : int = 0; // 0 = Mob, 1 = Hero
var closestObjectLocation : Vector3 = Vector3.zero;
private var tScale : int = 120;
private var hScale : int = 45;

private var rightMouseDown : boolean = false;

// Used to display the target if holding down the mouse button
function OnGUI() {
	if (Input.GetMouseButton(0)) {
		target = Input.mousePosition;
		var targetTexture = spellType == 0 ? fireTexture : iceTexture;
		target.y = Screen.height - target.y;
		GUI.DrawTexture (Rect (target.x-tScale, target.y-tScale, 2*tScale, 2*tScale),
				targetTexture, ScaleMode.ScaleToFit);
		getClosestObject();
		closestObjectLocation.y = Screen.height - closestObjectLocation.y;
		GUI.Box (Rect (closestObjectLocation.x-hScale, closestObjectLocation.y-hScale, 2*hScale, 2*hScale),'');
    }
}

function getClosestObject() {
	target = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	var tempClosest : GameObject;
	var HeroObject = GameObject.FindGameObjectWithTag("Hero");
	var heroDistance = Vector3.Distance(HeroObject.transform.position, target);
	
	var mobDistance = Mathf.Infinity;
	for (var Mob : GameObject in GameObject.FindGameObjectsWithTag("Mob"))
	{
		var tempDist = Vector3.Distance(Mob.transform.position, target);
		if (tempDist < mobDistance)
		{
			mobDistance = tempDist;
			tempClosest = Mob;
		}
	}

	closestObjectLocation = mobDistance < heroDistance ? 
			Camera.main.WorldToScreenPoint(tempClosest.transform.position) : 
			Camera.main.WorldToScreenPoint(HeroObject.transform.position);
	targetType = mobDistance < heroDistance ? 0 : 1;
}

function Update () {
	// Toggle spell type
	if (Input.GetKeyDown(KeyCode.E)) {
		spellType = (spellType + 1) % 2;
	}
	
	// left click: cast current spell (0 = fire, 1 = ice)
	if (Input.GetMouseButtonUp(0)) {
		target = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		target.z = 0;
		// This requires that all enemies have the tag 'Mob'
		if (targetType == 0)
			for (var Mob : GameObject in GameObject.FindGameObjectsWithTag("Mob"))
			    Mob.GetComponent(Behavior).CheckSpellRange(target, spellType);
		if (targetType == 1)
			for (var Hero : GameObject in GameObject.FindGameObjectsWithTag("Hero"))
			    Hero.GetComponent(Behavior).CheckSpellRange(target, spellType);
			    
		closestObjectLocation = Vector3.zero;
	}
}