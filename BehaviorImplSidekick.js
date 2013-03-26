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
}