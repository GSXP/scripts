#pragma strict

import System.Collections.Generic;

class DijkstraNode{

	var previous : DijkstraPrevious;
	
	var roomPosition : Vector3;
	
	var connectedNodes : List.<DijkstraEdge>;
	
	var visited : boolean;
	
	var distance : int;
	
	function DijkstraNode(roomPosition : Vector3){
	
		this.roomPosition = roomPosition;
		previous = null;
		this.distance = -1;
		this.connectedNodes = new List.<DijkstraEdge>();
		visited = false;
	}
	
	function DijkstraNode(roomPosition : Vector3, distance : int){
	
		this.roomPosition = roomPosition;
		previous = null;
		this.distance = distance;
		this.connectedNodes = new List.<DijkstraEdge>();
		visited = false;
	}
	
	function addEdge(newEdge : DijkstraEdge){
	
		connectedNodes.Add(newEdge);
	}

	function getRoomPosition(){
	
		return roomPosition;
	}
	
	function getConnectedNodes(){
	
		return connectedNodes;
	}
	
	function getDistance(){
	
		return distance;
	}
	
	function setDistance(distance : int){
	
		this.distance = distance;	
	}
	
	function getPrevious(){
	
		return previous;
	}
	
	function setPrevious(previous : DijkstraPrevious){
	
		this.previous = previous;	
	}
	
	function wasVisited() : boolean{
	
		return visited;
	}
	
	function setVisited(visited : boolean){
	
		this.visited = visited;
	}	
}

