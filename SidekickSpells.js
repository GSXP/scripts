#pragma strict

var target : Vector3 = Vector3.zero;
var healTexture : Texture;
var fireTexture : Texture;
var iceTexture : Texture;
var spellType : int = 0; // 0 = Heal, 1 = Buff/Debuff
var healType : int = 0; // 0 = Insta-heal, 1 = Heal over time
var buffType : int = 0; // 0 = Fire, 1 = Ice
var targetType : int = 0; // 0 = Mob, 1 = Hero
var closestObjectLocation : Vector3 = Vector3.zero;
var stats : Stats;
private var tScale : int = 120;
private var hScale : int = 45;

private var rightMouseDown : boolean = false;
private var mousePosition : Vector3 = Vector3.zero;

function Start() {
	stats = gameObject.GetComponent(Stats);
}

// Used to display the target if holding down the mouse button
function OnGUI() {
	if (Input.GetMouseButton(0)) {
		// get relative mouse position
		mousePosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		mousePosition.z = 0;

		target = Input.mousePosition;
		var buffTexture = buffType == 0 ? fireTexture : iceTexture;
		var targetTexture = spellType == 0 ? healTexture : buffTexture;
		target.y = Screen.height - target.y;
		GUI.DrawTexture (Rect (target.x-tScale, target.y-tScale, 2*tScale, 2*tScale),
				targetTexture, ScaleMode.ScaleToFit);
		getClosestObject();
		
		// highlight all objects that will be affected by spell-cast
		if (targetType == 0) { // Mob targeted
			for (var Mob : GameObject in GameObject.FindGameObjectsWithTag("Mob")) {
				// make sure he is within spell range
				if (Vector3.Distance (Mob.transform.position, mousePosition) <= stats.getSpellRange()) {
					// find his relative position
					var mobPosition = Camera.main.WorldToScreenPoint(Mob.transform.position);
					// highlight him
					GUI.Box (Rect (mobPosition.x-hScale, Screen.height - mobPosition.y-hScale, 2*hScale, 2*hScale),'');
				}
			}
		}
		else { // Hero Targeted
			// make sure he is within spell range
			if (Vector3.Distance (GameObject.Find('Hero').transform.position, mousePosition) <= stats.getSpellRange()) {
				// find his relative position
				var heroPosition = Camera.main.WorldToScreenPoint(GameObject.Find('Hero').transform.position);
				// highlight him
				GUI.Box (Rect (heroPosition.x-hScale, Screen.height - heroPosition.y-hScale, 2*hScale, 2*hScale),'');
			}
		}
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
	
	// left click: cast current spell (0 = heal, 1 = buff/debuff)
	if (Input.GetMouseButtonUp(0)) {
		var spellVersion = spellType == 0 ? healType : buffType;
		target = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		target.z = 0;
		// This requires that all enemies have the tag 'Mob'
		if (targetType == 0)
			for (var Mob : GameObject in GameObject.FindGameObjectsWithTag("Mob"))
			    Mob.GetComponent(Behavior).CheckSpellRange(target, spellType, spellVersion);
		if (targetType == 1)
			for (var Hero : GameObject in GameObject.FindGameObjectsWithTag("Hero"))
			    Hero.GetComponent(Behavior).CheckSpellRange(target, spellType, spellVersion);
			    
		closestObjectLocation = Vector3.zero;
	}
}