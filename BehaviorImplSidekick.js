#pragma strict

// Sidekick's implementation of behavior
class SidekickBehavior extends IBehavior {
	
	private var combat : Combat;
	private var stats : Stats;
	private var heroBehavior : Behavior;
	
	function SidekickBehavior(go : GameObject) {
		super(go);
		combat = gameObject.GetComponent(Combat);
		stats = gameObject.GetComponent(Stats);
		heroBehavior = GameObject.Find("Hero").GetComponent(Behavior);
	}
	
	function GotHit(attacker : GameObject) {
		// Tell the hero I just got attacked!
		heroBehavior.FoundNewTarget(attacker, 1);
		// Play sounds and die if necessary
		if (stats.getHealth() > 0) {
			AudioSource.PlayClipAtPoint(hurtSound, Camera.main.transform.position);
		} else {
			AudioSource.PlayClipAtPoint(dieSound, Camera.main.transform.position);
			GameObject.Destroy(gameObject);
		}
	}
	
	function CheckSpellRange(target : Vector3, spellType : int, spellVersion : int) {
		if (spellType == 0)
		{
			if (spellVersion == 0)
				InstaHeal();
			else if (spellVersion == 1)
				HealOverTime();
		}
		else {
			// nothing to see here . .
			return;
		}
	}
	
	function InstaHeal() {
		stats.healHealth(7);
	}
	
	// We'll need to make the cooldown on these longer....
	function HealOverTime() {
		stats.healOverTime(1, 10);
	}
	
}