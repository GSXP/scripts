#pragma strict

var target : Vector3 = Vector3.zero;
var healTexture : Texture;
var fireTexture : Texture;
var iceTexture : Texture;
var healCooldown : double = 0;
var buffCooldown : double = 0;
var spellType : int = 0; // 0 = Heal, 1 = buff/debuff
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

	healType = GameObject.Find("TitleManager").GetComponent(TitleScreen).healType;
	buffType = GameObject.Find("TitleManager").GetComponent(TitleScreen).buffType;
	stats = gameObject.GetComponent(Stats);
	Destroy(GameObject.Find("TitleManager"));
}

// Used to display the target if holding down the mouse button
function OnGUI() {
	if ((Input.GetMouseButton(0) && buffCooldown <= 0) ||
		(Input.GetMouseButton(1) && healCooldown <= 0)) {
		// get relative mouse position
		mousePosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		mousePosition.z = 0;
	
		target = Input.mousePosition;
		var buffTexture = buffType == 0 ? fireTexture : iceTexture;
		var targetTexture = Input.GetMouseButton(1) ? healTexture : buffTexture;
		spellType = Input.GetMouseButton(1) ? 0 : 1; // 0 for heal (left-click), 1 for buff/debuff (right-click)
		target.y = Screen.height - target.y;
		GUI.DrawTexture (Rect (target.x-tScale, target.y-tScale, 2*tScale, 2*tScale),
				targetTexture, ScaleMode.ScaleToFit);
		getClosestObject();
		highlightTarget(mousePosition);
    }
}

function highlightTarget(mousePosition : Vector3) {
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
		for (var Hero : GameObject in GameObject.FindGameObjectsWithTag("Hero")) {
			if (Vector3.Distance (Hero.transform.position, mousePosition) <= stats.getSpellRange()) {
				// find his relative position
				var heroPosition = Camera.main.WorldToScreenPoint(Hero.transform.position);
				// highlight him
				GUI.Box (Rect (heroPosition.x-hScale, Screen.height - heroPosition.y-hScale, 2*hScale, 2*hScale),'');
			}
		}
	}
}

function getClosestObject() {
	target = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	var tempClosest : GameObject;
	var heroClosest : GameObject;
	
	var heroDistance = Mathf.Infinity;
	for (var Hero : GameObject in GameObject.FindGameObjectsWithTag("Hero"))
	{
		var tempHeroDist = Vector3.Distance(Hero.transform.position, target);
		if (tempHeroDist < heroDistance)
		{
			heroDistance = tempHeroDist;
			heroClosest = Hero;
		}
	}
	
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
			Camera.main.WorldToScreenPoint(heroClosest.transform.position);
	targetType = mobDistance < heroDistance ? 0 : 1;
}

function Update () {
	if(healCooldown > 0)
		healCooldown -= Time.deltaTime;
	if(buffCooldown > 0)
		buffCooldown -= Time.deltaTime;
	
	// left click: cast buff/debuff spell
	// right click: cast heal spell
	if ((Input.GetMouseButtonUp(0) && buffCooldown <= 0) ||
		(Input.GetMouseButtonUp(1) && healCooldown <= 0)) {
		// Set cooldown
		if (spellType == 0)
			healCooldown = 3;
		else
			buffCooldown = 3;

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