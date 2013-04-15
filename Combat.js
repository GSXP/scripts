#pragma strict

var target : GameObject;
var attackAnimationScript : SpriteAnimation;
private var cooldownRemaining : float;
private var stats : Stats;
private var behavior : Behavior;
private var animateAttacking = false;

function Start () {
	cooldownRemaining = 0;
	stats = gameObject.GetComponent(Stats);
	behavior = gameObject.GetComponent(Behavior);
}

function Update () {


	// You don't have a target, so no need to attack
	if(target == null){
	
		if(attackAnimationScript != null && attackAnimationScript.isAttacking()){
		
			attackAnimationScript.stopAttacking();
			animateAttacking = false;
		}	

		return;
	}
	
	if (stats.getAttackSpeed() == 0) {
		// You're not attacking
		if(attackAnimationScript != null && attackAnimationScript.isAttacking()){
		
			attackAnimationScript.stopAttacking();
			animateAttacking = false;
		}

		return;
	}

	var distance = Vector3.Distance(transform.position, target.transform.position);
	if(distance > stats.getAttackRange()){
	
		if(attackAnimationScript != null && animateAttacking){
		
			animateAttacking = false;
			attackAnimationScript.stopAttacking();
		}
	}	
	else if(!animateAttacking){
		
		attackAnimationScript.startAttacking();			
		animateAttacking = true;			
	}
	
	if (cooldownRemaining > 0) {
	
		// You still need to wait. Decrement
		cooldownRemaining -= Time.deltaTime;
		return;
	} else {
		// You're ready to attack. Are you close enough?
		if(distance <= stats.getAttackRange()) {
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