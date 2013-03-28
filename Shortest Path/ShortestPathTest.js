#pragma strict

var startRoom : GameObject;
var endRoom : GameObject;

var alreadyRan = false;

function Update () {

	if(!alreadyRan){
	
		alreadyRan = true;

		var shortestPath : ShortestPath = new ShortestPath();
		
		print("Shortest path test start room: " + startRoom.transform.position + " endRoom: " + endRoom.transform.position);
		var door : GameObject = shortestPath.NextDoorTowardEnd(startRoom, endRoom);
		
		print("Next door position: " + door.transform.position.x + "," + door.transform.position.y
				+ "," + door.transform.position.z);

		print("Shortest path: " + door.name + " from room: " + door.transform.parent.parent.name);
	}
}