#pragma strict

var face : Vector3 = Vector3.down;
var spriteAnimation : SpriteAnimation = null;
var spriteFacingLeft = false;
var stopped = true;

// Called by a Movement script. movement contains the delta movement.
function moved(movement : Vector3) {

	var newFace : Vector3;
	if (movement.x == 0 && movement.y == 0){

		if(face != Vector3.zero){
		
			if(spriteAnimation.sprite != null){
			
				spriteAnimation.stop();
			}		
		}
		stopped = true;	
	}
	else{
	
		
		if(movement.x < 0 && (!spriteFacingLeft || stopped)){
		
			if(spriteAnimation.sprite != null){
				
				spriteAnimation.playLeftAnimation();
			}
			spriteFacingLeft = true;
		}
		else if(movement.x > 0 && spriteFacingLeft || stopped){
		
			if(spriteAnimation.sprite != null){
			
				spriteAnimation.playRightAnimation();
			}
			spriteFacingLeft = false;
		}
		
		if (Mathf.Abs(movement.x) < Mathf.Abs(movement.y)) {
			// More Vertical Movement
			if (movement.y > 0) {
				newFace = Vector3.up;
			} else {
				newFace = Vector3.down;
			}
		} else {
			// More Horizontal Movement
			if (movement.x > 0) {
				newFace = Vector3.right;
			} else { 
				newFace = Vector3.left;
			}
		}
		
		stopped = false;
	}
	// If object changed face directions, make the necessary updates
	if (newFace != face) {
		changeFace(newFace);
	}
}

function changeFace(newFace : Vector3) {
	
	face = newFace;
	// Notify sprites and sight change here
}
