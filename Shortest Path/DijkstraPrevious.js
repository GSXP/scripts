#pragma strict

class DijkstraPrevious{

	var previousNode : DijkstraNode;
	var door : GameObject;

	function DijkstraPrevious(previousNode : DijkstraNode, door : GameObject){
	
		this.previousNode = previousNode;
		this.door = door;
	}

	function getDoor(){
	
		return door;
	}
	
	function getPreviousNode(){
	
		return previousNode;
	}
}