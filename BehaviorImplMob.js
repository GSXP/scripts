#pragma strict

// Mob's implementation of behavior
class MobBehavior extends NPCBehavior {
	
	// special states
	var timeSinceTarget : double = 0;
	var onFire : double = 0;
	var frozen : double = 0;

	function MobBehavior(go : GameObject) {
		super(go);
		// Used this to spice things up while sight/patrolling is unimplemented
		//super.setTarget(GameObject.Find("Sidekick"), 3);
	}
	
	function GotHit(attacker : GameObject) {
		super.GotHit(attacker);
		if (1 < super.targetPriority) {
			// Which should always be true, because no one else can hit you besides the hero
			this.FoundNewTarget(attacker, 1);
		}
	}
	
	function TargetDead() {
		super.TargetDead();
		// Freak out! I Just killed a hero or sidekick! (unless for some reason I was targeting another mob)
	}
	
	function FoundNewTarget(newTarget : GameObject, priority : int) {
		if (priority >= super.targetPriority) {
			// Whatever it is, it isn't more important than what I'm targeting now
			return;
		}
		// Otherwise, it's more important
		super.setTarget(newTarget, priority);
	}
	
	function CheckAggroRange() {
		var sidekick = GameObject.Find("Sidekick");
		var hero = GameObject.Find("Hero");
		
		// don't check for aggro 'during' door transitions
		if (sidekick) {
			AggroTarget(sidekick);
		}
		if (hero) {
			AggroTarget(hero);
		}
	}
	
	function AggroTarget(target : GameObject){
		var target_position = target.transform.position;
		var distance = Mathf.Sqrt( (target_position.x - gameObject.transform.position.x)*(target_position.x - gameObject.transform.position.x) + (target_position.y - gameObject.transform.position.y)*(target_position.y - gameObject.transform.position.y) );
		
		if(super.stats.getSightRange() >= distance) { 
			// in range!
			super.setTarget(target, 3);
		}
		else {
			// nothing to see here . .
			return;
		}
	}
	
	function Update() {
		// See if hero or sidekick is visible
		CheckAggroRange();
		
		// on fire behavior
		if (onFire > 0) {
			onFire -= Time.deltaTime;
			timeSinceTarget -= Time.deltaTime;
			gameObject.renderer.material.color = Color.yellow;
			
			// run away from hero
			var HeroVector = (GameObject.Find("Hero").transform.position - gameObject.transform.position);
			var angle = Mathf.Atan(HeroVector.y / HeroVector.x) + Mathf.PI;
			if(HeroVector.x < 0) {
				angle = angle + Mathf.PI;
			}
			angle = angle + (Random.value - 0.5) * Mathf.PI;
			if(timeSinceTarget < 0)
			{
				timeSinceTarget = 0.25;
				super.movement.setTarget(gameObject.transform.position + Vector3(Mathf.Cos(angle) * 2, Mathf.Sin(angle) * 2, 0));
			}
		}
		
		// frozen behavior
		else if (frozen > 0) {
			gameObject.renderer.material.color = Color.cyan;
			frozen -= Time.deltaTime;
			// just frozen, so it should just sit there....
			// Clear the target
			super.ClearTarget();
		}
		
		// normal behavior
		else {
			gameObject.renderer.material.color = Color.blue;
			// NPCBehavior will move me closer to my target if I have one
			super.Update();
		}
	}
	
	function FireSpell() {
		if (onFire > 0) {
			onFire = 0;
		}
		else {
			// visibily aflame
			onFire = 3;
			frozen = 0; // you can only be one or the other
		}
	}
	
	function IceSpell() {
		if (frozen > 0) {
			frozen = 0;
		}
		else {
			frozen = 3;
			onFire = 0; // you can only be one or the other
		}
	}

	function die() {
	    var pos = gameObject.transform.position;
	    dropTreasure(pos);
		super.die();
	}
  
	function dropTreasure(pos : Vector3) {
		var maker : TreasureMaker = new TreasureMaker();
		maker.makeRandomTreasure(pos);
	}


}