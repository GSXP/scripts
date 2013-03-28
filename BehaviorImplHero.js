#pragma strict

// Hero's implementation of behavior
class HeroBehavior extends NPCBehavior {
	// A hit list to remember who to attack next
	private var hitList : HitList;
	private var pathToBoss : ShortestPath;
	private var bossRoom : GameObject;
	
	// special states
	var speedy : double = 0;
	var solid : double = 0;
	
	function HeroBehavior(go : GameObject) {
		super(go);
		hitList = new HitList();
		bossRoom = GameObject.Find("BossRoom");
		pathToBoss = new ShortestPath();
	}
	
	function GotHit(attacker : GameObject) {
		super.GotHit(attacker);
		FoundNewTarget(attacker, 2);
	}
	
	function TargetDead() {
		super.TargetDead();
		// Get the next target from the hit list
		while (hitList.size() > 0) {
			var pt : PriorityTarget = hitList.PopTarget();
			if (pt.target.GetComponent(Behavior).getRoom() == super.currentRoom) {
				// In other words, ignore bad guys on the hitlist that aren't in the same room
				super.setTarget(pt.target, pt.priority);
				return;
			}
		}
		// Hit list is empty... ask the room if there are any baddies left
		if(super.currentRoom.GetComponent(RoomController).mobCount() == 0) {
			pickNextDoor();
		}
	}
	
	function pickNextDoor() {
		
		if (bossRoom != null) {
			pathToBoss = new ShortestPath(); // Resetting shortest path
			var nextDoor : GameObject = pathToBoss.NextDoorTowardEnd(super.currentRoom, bossRoom);
			super.setTarget(nextDoor, 4);
			//Debug.Log("Hero in " + super.currentRoom
			return;
		}
		
		Debug.Log("WARNING! Cannot find BossRoom. Hero picking random door");
		
		// Grab all the doors in this room
		var doors : DoorController[] = super.currentRoom.GetComponentsInChildren.<DoorController>();
		
		// Pick a random one
		var i : int = Random.value * 4;
		
		// start at the random door and cycle around all 4 until you find one that goes somewhere
		var door : DoorController;
		for (var j : int = 0; j < 4; j++) {
			door = doors[(i + j) % 4];
			if (door.targetDoor != null) {
				// This door leads somewhere
				super.setTarget(door.gameObject, 4);			
				return;
			}
		}
		
		// Sanity Check
		Debug.Log("Hero here! I'm in a room with no doors!");
	}
	
	function setRoom(room : GameObject) {
		super.setRoom(room);
		// in a brand new room, do i have a target already?
		if (super.currentTarget != null) {
			// if my target was a door, drop it
			if(super.currentTarget.GetComponent(DoorController) != null)
				super.TargetDead();	// Technically doors cant die but WHATEVER
			else 
				return; // I've got a mob target so don't do anything
		}
		
		// is the room empty? (Should i move on?)
		if(super.currentRoom.GetComponent(RoomController).mobCount() == 0) {
			pickNextDoor();
		}
		
		// Otherwise i'll start patrolling thanks to ImplNPC
	}
	
	function FoundNewTarget(newTarget : GameObject, priority : int) {
		if (super.currentTarget == null) {
			// If I'm not chasing anyone, chase this guy
			super.setTarget(newTarget, priority);
		} else if(super.currentTarget == newTarget) {
			// I've already got this guy targeted!
			return;
		} else {
			// I'm busy now, add him to my hit list
			hitList.AddNewTarget(newTarget, priority);
		}
	}
	
	function Update() {
		super.Update();

		if (speedy > 0) {
			speedy -= Time.deltaTime;
			stats.resetMoveSpeed();
			stats.resetAttackSpeed();
			stats.modMoveSpeed(1.6);
			stats.modAttackSpeed(1.6);
			gameObject.renderer.material.color = Color.red;
		}
		
		else if (solid > 0) {
			solid -= Time.deltaTime;
			stats.setDamageRatio(0.5);
			gameObject.renderer.material.color = Color.black;
		}
		
		else {
			stats.setDamageRatio(1);
			stats.resetMoveSpeed();
			stats.resetAttackSpeed();
			gameObject.renderer.material.color = Color.white;
		}
	}
	
	function FireSpell() {
		speedy = 3; // 3 seconds
		solid = 0; // you can only be one or the other
	}
	
	function IceSpell() {
		solid = 3; // 3 seconds
		speedy = 0; // you can only be one or the other
	}

}