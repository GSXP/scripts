#pragma strict

var target : GameObject;
private var cooldownRemaining : float;
private var stats : Stats;
private var behavior : Behavior;

function Start () {
	cooldownRemaining = 0;
	stats = gameObject.GetComponent(Stats);
	behavior = gameObject.GetComponent(Behavior);
}

function Update () {
	// You don't have a target, so no need to attack
	if(target == null)
		return;
	
	if (stats.getAttackSpeed() == 0) {
		// You're not attacking
		return;
	}
	
	if (cooldownRemaining > 0) {
		// You still need to wait. Decrement
		cooldownRemaining -= Time.deltaTime;
		return;
	} else {
		// You're ready to attack. Are you close enough?
		if(Vector3.Distance(transform.position, target.transform.position) <= stats.getAttackRange()) {
			attack();
		}
	}
}

private function attack() {
	target.GetComponent(Combat).hit(gameObject, stats.getAttack());
	// Reset cooldown
	cooldownRemaining = 1 / stats.getAttackSpeed();
	// Is my target dead?
	if(target.GetComponent(Stats).getHealth() <= 0) {
		// No longer my target
		target = null;
		behavior.TargetDead();
	}
}

function hit(attacker : GameObject, damage : int) {
	stats.hurtHealth(damage);
	
	// Inform behavior so it can respond
	behavior.GotHit(attacker);
}