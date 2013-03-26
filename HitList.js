#pragma strict

import System.Collections.Generic;

class HitList {
	var list : List.<PriorityTarget>;
	
	function HitList() {
		list = new List.<PriorityTarget>();
	}
	
	function AddNewTarget(target : GameObject, priority : int) {
		// First, check if this target is already on the hitlist
		for each (var pTarget in list) {
			// If the target was already on the list
			if (pTarget.target.GetInstanceID() == target.GetInstanceID()) {
				// And he's on the list for doing something worse than now
				if (pTarget.priority > priority) {
					// No worries. He's on the list. He'll get his dues.
					return;
				} else {
					// He's already on the list but now he's in more/equal trouble
					list.Remove(pTarget);
					break;
				}
			}
		}
		
		var priorityTarget : PriorityTarget = new PriorityTarget(target, priority);
		for(var i : int = 0; i < list.Count; i++) {
			if (list[i].priority >= priority) {
				list.Insert(i, priorityTarget);
				return;
			}
		}
		list.Add(priorityTarget);
	}
	
	function PopTarget() {
		var pt : PriorityTarget = list[0];
		list.RemoveAt(0);
		return pt;
	}
	
	function size() {
		return list.Count;
	}
}


private class PriorityTarget {
	var target : GameObject;
	var priority : int;
	function PriorityTarget(t : GameObject, p : int) {
		target = t;
		priority = p;
	}
}