#pragma strict
#pragma downcast

import System.Collections.Generic;

public class ShortestPath{

	private var dijkstraNodes : List.<DijkstraNode>;

	function ShortestPath(){
	
		var roomList : Array;
	
		// Map of room position to dijkstra node. Used so that a new node isn't created
		// when it already exists.
		var visitedRooms : Dictionary.<Vector3,DijkstraNode> = new Dictionary.<Vector3,DijkstraNode>();
		dijkstraNodes = new List.<DijkstraNode>();

		// Set up dijkstraNodes;	
    	for(var currGameObject : GameObject in GameObject.FindObjectsOfType(GameObject) as GameObject[]){
    
	        if(currGameObject.name.Contains("Room")){
        
            	addRoom(currGameObject, visitedRooms);
        	}
    	}

		// Set up dijkstraNodes;
    	/*for (var child : Transform in transform){
    
	    	var childGameObject : GameObject = child.gameObject;
	    
    	  	if (childGameObject.name.IndexOf("Room") > -1){
      	
				addRoom(childGameObject, visitedRooms);			
      		}
    	}*/		
	}
	
	private function addRoom(newRoom : GameObject, visitedRooms : Dictionary.<Vector3,DijkstraNode>){

		var newRoomPosition : Vector3 = newRoom.transform.position;
	
		var connectedNodes : List.<DijkstraEdge> = new List.<DijkstraEdge>();
	
		var newRoomNode : DijkstraNode = new DijkstraNode(newRoomPosition, -1);
	
		if(!visitedRooms.ContainsKey(newRoomPosition)){
	
			newRoomNode = new DijkstraNode(newRoomPosition, -1);
			visitedRooms[newRoomPosition] = newRoomNode;
			dijkstraNodes.Add(newRoomNode);
		}
		else{
	
			newRoomNode = visitedRooms[newRoomPosition];
		}
	
		for (var child : Transform in newRoom.transform){
		
			var childGameObject = child.gameObject;
			if(child.name.IndexOf("Doors") > -1){
			
				for(var door : Transform in child.transform){
				
					var doorGameObject = door.gameObject;
		
					var newEdge = getEdge(doorGameObject, visitedRooms);
					
					if(newEdge != null){
					
						newRoomNode.addEdge(newEdge);
					}
				}
			}
		}
	}

	private function getEdge(door : GameObject, visitedRooms : Dictionary.<Vector3,DijkstraNode>){
	
		var thisDoorScript : DoorController = door.GetComponent(DoorController);
		var otherDoorScript = thisDoorScript.targetDoor;
		
		if(otherDoorScript == null){
		
			return null;
		}
		
		// Assumes the room has a doors object which has a door object which has the controller script.
		var targetRoomPosition = otherDoorScript.gameObject.transform.parent.parent.position;
		
		if(visitedRooms.ContainsKey(targetRoomPosition)){
		
			return new DijkstraEdge(visitedRooms[targetRoomPosition], door);
		}
		else{
	
			var newNode : DijkstraNode = new DijkstraNode(targetRoomPosition, -1);
			visitedRooms.Add(targetRoomPosition, newNode);
			dijkstraNodes.Add(newNode);
			
			return new DijkstraEdge(newNode, door);
		}
	}
		
	public function NextDoorTowardEnd(startRoom : GameObject, endRoom : GameObject) {
	
		var startPosition : Vector3 = startRoom.transform.position;
		var endPosition : Vector3 = endRoom.transform.position;
		
		var queue: PriorityQueue = new PriorityQueue();
		
		for(var dijkstraNode : DijkstraNode in dijkstraNodes){
			
			if(dijkstraNode.getRoomPosition() == startPosition){
			
				dijkstraNode.setDistance(0);
				queue.push(dijkstraNode, 0);
			}
			else{
			
				dijkstraNode.setDistance(-1);
			}
			
			dijkstraNode.setPrevious(null);
		}
		
		var lastNode : DijkstraNode = null;
		var currNode : DijkstraNode = null;
		
		while(!queue.empty()){
		
			currNode = queue.pop();
			currNode.setVisited(true);
			
			
			if(currNode.getDistance() == -1){
			
				return null;
			}
			
			if(currNode.getRoomPosition() == endPosition){
			
				lastNode = currNode;
				break;
			}
			
			var connectedNodes : List.<DijkstraEdge> = currNode.getConnectedNodes();
			
			for(var connectedNode : DijkstraEdge in connectedNodes){
			
				if(connectedNode.getEndNode().wasVisited()){
				
					continue;
				}
				
				var connectedNodeDistance = connectedNode.getEndNode().getDistance();
				if(connectedNodeDistance < 0 || currNode.getDistance() + 1 < connectedNode.getEndNode().getDistance()){
				
					connectedNode.getEndNode().setPrevious(new DijkstraPrevious(currNode, connectedNode.getDoor()));
					
					connectedNode.getEndNode().setDistance(currNode.getDistance() + 1);
					
					if(queue.includes(connectedNode.getEndNode())){
									
						queue.decreaseKey(connectedNode.getEndNode(), currNode.getDistance() + 1);				
					}
					else{
					
						queue.push(connectedNode.getEndNode(), currNode.getDistance() + 1);
					}
				}
			}
		}
	
		if(lastNode == null){
		
			return null;
		}
		else{
		
			currNode = lastNode;
			
			if(currNode.getPrevious() == null){
			
				return null;
			}
			
			while(currNode.getPrevious() != null){
			
				lastNode = currNode;
				currNode = currNode.getPrevious().getPreviousNode();
				
				if(currNode.getPrevious() == null){
				
					return lastNode.getPrevious().getDoor();
				}
			}
		}
		
		return null;
	}
};
