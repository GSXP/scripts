#pragma strict

// Shared behavioral elements between Hero and Mobs
class NPCBehavior extends IBehavior {
	
	protected var currentTarget : GameObject; // The NPC's current target
	protected var targetPriority : int; // The priority of that target
	protected var combat : Combat; // The NPC's combat component
	protected var movement : NPCMovement; // The NPC's movement component
	protected var stats : Stats; // The NPC's Stats
	protected var moving : boolean;
	protected var stopCount : int;
	protected var patrol : Vector3;
	
	function NPCBehavior(go : GameObject) {
		super(go);
		combat = gameObject.GetComponent(Combat);
		movement = gameObject.GetComponent(NPCMovement);
		stats = gameObject.GetComponent(Stats);
		targetPriority = 4; // 4 is lowest priority (anything is more important than nothing)
		moving = false;
		stopCount = 0;
	}
	
	function GotHit(attacker : GameObject) {
		if (stats.getHealth() > 0) {
			// If I'm still alive, just play the hurt sound
			AudioSource.PlayClipAtPoint(hurtSound, Camera.main.transform.position);
		} else {
			// Otherwise I'M DEAD!!!
			die();
		}
	}

	function CheckSpellRange(target : Vector3, spellType : int, spellVersion : int) {
		var distance = Mathf.Sqrt( (target.x - gameObject.transform.position.x)*(target.x - gameObject.transform.position.x) + (target.y - gameObject.transform.position.y)*(target.y - gameObject.transform.position.y) );
		
		if(stats.getSpellRange() >= distance) { 
			// in range!
			if (spellType == 0)
			{
				if (spellVersion == 0)
					InstaHeal();
				else if (spellVersion == 1)
					HealOverTime();
			}
			else if (spellType == 1)
			{
				if (spellVersion == 0)
					FireSpell();
				else if (spellVersion == 1)
					IceSpell();
			}
		}
		else {
			// nothing to see here . .
			return;
		}
	}
	
	function TargetDead() {
		// Don't have a target
		currentTarget = null;
		targetPriority = 4;
		// Don't follow anything
		movement.clearTarget();
	}
	
	// Only used to simplify assignment and link combat targeting
	// DOESN'T COMPARE AGAINST CURRENT TARGET PRIORITY
	function setTarget(newTarget : GameObject, priority : int) {
		currentTarget = newTarget;
		targetPriority = priority;
		combat.target = currentTarget;
		
		// Don't try to patrol to you're last position, just calc a new one
		moving = false;
	}
	
	function ClearTarget() {
		currentTarget = null;
		targetPriority = 4;
		combat.target = currentTarget;
		movement.clearTarget();
	}
	
	// Makes sure the Movement Componenet always has the most current position of the target
	// Could be better by giving movement the actual game object... but then movement would poll every update instead.
	function Update() {
		if (currentTarget != null) {
			movement.setTarget(currentTarget.transform.position);
		} else if (moving) {
			movement.setTarget(patrol);
			if(movement.target == gameObject.transform.position){
				stopCount++;
				if(stopCount == 100){
					moving = false;
					stopCount = 0;
				}
			}
		} else {
			var newX = super.currentRoom.transform.position.x + (Random.value - .5) * 28;
			var newY = super.currentRoom.transform.position.y + (Random.value - .5) * 12;
			patrol = Vector3(newX, newY, 0);
			moving = true;
		}
	}
	
	//Whenever the character or monster dies, however he dies, this function is called.
  	//It destroys the character/monster from the screen, and, depending on how it's inherited, 
  	//can do other things, like leave behind treasures that can be collected.
  	function die() {
    	AudioSource.PlayClipAtPoint(dieSound, Camera.main.transform.position);
		// Tell the Room I'm a goner
		super.currentRoom.GetComponent(RoomController).OnTriggerExit(gameObject.collider);
		if(gameObject != null) {
        	GameObject.Destroy(gameObject);
    	}
	}

}