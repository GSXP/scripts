#pragma strict

class PriorityQueueNode{

	var priority : int;
	var dijkstraNode : DijkstraNode;

	function PriorityQueueNode(priority : int, dijkstraNode : DijkstraNode){
	
		this.priority = priority;
		this.dijkstraNode = dijkstraNode;
	}
	
	function setPriority(priority : int){
	
		this.priority = priority;
	}
	
	function getPriority(){
	
		return priority;
	}
	
	function setDijkstraNode(dijkstraNode : DijkstraNode){
	
		this.dijkstraNode = dijkstraNode;
	}
	
	function getDijkstraNode(){
	
		return dijkstraNode;
	}
};