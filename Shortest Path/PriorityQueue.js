#pragma strict

// Obtained from http://strd6.com/2009/06/priorityqueuejs/  original Author: Daniel X Moore
// Altered by Kevin Murdock. I added decreaseKey and changed it to a class structure.
// I don't think this is the most efficient priority queue implementation.

/**
* @class PriorityQueue manages a queue of elements with priorities. Default
* is highest priority first.
*
* @param [options] If low is set to true returns lowest first.
*/
class PriorityQueue{

	private var contents : List.<PriorityQueueNode>;
	private var sorted : boolean = false;
	
	private var prioritySortLow = function(a : PriorityQueueNode, b : PriorityQueueNode) {
	
		return b.getPriority() - b.getPriority();
	};
	
	/*private var prioritySortHigh = function(a, b) {
	
		return a.getPriority() - b.getPriority();
	};*/
	
	function PriorityQueue(){

	  	contents = new List.<PriorityQueueNode>();
	}
	
	function sort() {
	
	  contents.Sort(prioritySortLow);
	  sorted = true;
	}
	
	/**
	* Removes and returns the next element in the queue.
	* @return The next element in the queue. If the queue is empty returns
	* undefined.
	*
	* @see PrioirtyQueue#top
	*/
	function pop() {
	
		if(!sorted) {
		
			sort();
		}
	
		if(contents.Count > 0){
		
			var element : PriorityQueueNode = contents[0];
			contents.Remove(element);
			
			return element.getDijkstraNode();
		}
		else{
		
			return null;
		}
	}
	
	/**
	* Returns but does not remove the next element in the queue.
	* @return The next element in the queue. If the queue is empty returns
	* undefined.
	*
	* @see PriorityQueue#pop
	*/
	function top() {
	
		if(!sorted) {
		
		    sort();
		}
		
		var element : PriorityQueueNode = contents[contents.Count - 1];
		contents[0];
		
		if(element) {
		
		    return element.getDijkstraNode();
		} 
		else {
		
		    return null;
		}
	}
	
	/**
	* @param object The object to check the queue for.
	* @returns true if the object is in the queue, false otherwise.
	*/
	function includes(dijkstraNode : DijkstraNode) {
	
		for(var i = contents.Count - 1; i >= 0; i--) {
		
		  if(contents[i].getDijkstraNode() === dijkstraNode) {
		  
		    return true;
		  }
		}
		
		return false;
	}
	
	function decreaseKey(dijkstraNode : DijkstraNode, priority : int) {
	
		for(var i : int = contents.Count - 1; i >= 0; i--) {
		
		  if(contents[i].getDijkstraNode() === dijkstraNode) {
		    
		    contents[i].priority = priority;
		    sorted = false;
		  }
		}
	}
	
	/**
	* @returns the current number of elements in the queue.
	*/
	function size() {
	
		return contents.Count;
	}
	
	/**
	* @returns true if the queue is empty, false otherwise.
	*/
	function empty() {
	
		return contents.Count == 0;
	}
	
	/**
	* @param object The object to be pushed onto the queue.
	* @param priority The priority of the object.
	*/
	function push(dijkstraNode : DijkstraNode, priority : int) {
	
		contents.Add(new PriorityQueueNode(priority, dijkstraNode));
		sorted = false;
	}
};
