#pragma strict

class DijkstraEdge{

	var endNode : DijkstraNode;
	var door : GameObject;

	function DijkstraEdge(endNode : DijkstraNode, door : GameObject){
	
		this.endNode = endNode;
		this.door = door;
	}

	function getDoor(){
	
		return door;
	}
	
	function getEndNode(){
	
		return endNode;
	}
}