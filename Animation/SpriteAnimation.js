#pragma strict

public class SpriteAnimation{

	var sprite : Sprite;
	var leftAnimation : UVAnimation;
	var rightAnimation : UVAnimation;
	var stoppedLeftAnimation : UVAnimation;
	var stoppedRightAnimation : UVAnimation;
	var currentFaceDirection : Vector3;
	
	function SpriteAnimation(newSprite : Sprite){
	
		this.sprite = newSprite;
	}	
	
	function playAnimation(faceDirection : Vector3){
	
		if(faceDirection == Vector3.right){
	
			currentFaceDirection = faceDirection;	
			playRightAnimation();
		}
		else if(faceDirection == Vector3.left){
		
			playLeftAnimation();
		}
	}
	
	function stop(){
	
		Debug.Log("gets to spriteAnimation.stop");
		Debug.Log("currentFaceDirection: " + currentFaceDirection);
		if(currentFaceDirection == Vector3.right){
		
			Debug.Log("spriteAnimation stops right");
			playStoppedRightAnimation();
		}
		else if(currentFaceDirection == Vector3.left){
		
			Debug.Log("spriteAnimation stops left");
			playStoppedLeftAnimation();
		}
	}
	
	function playStoppedLeftAnimation(){
	
		sprite.PlayAnim(stoppedLeftAnimation);
	}
	
	function playStoppedRightAnimation(){
		
		sprite.PlayAnim(stoppedRightAnimation);
	}

	function playLeftAnimation(){
	
		currentFaceDirection = Vector3.left;
		this.sprite.PlayAnim(leftAnimation);
	}
	
	function playRightAnimation(){
	
		currentFaceDirection = Vector3.right;
		this.sprite.PlayAnim(rightAnimation);
	}
	
	function setLeftAnimation(leftAnimation : UVAnimation){

		this.leftAnimation = leftAnimation;
	}
	
	function setRightAnimation(rightAnimation : UVAnimation){
	
		this.rightAnimation = rightAnimation;
	}
	
	function setStoppedLeftAnimation(stoppedLeftAnimation : UVAnimation){
	
		this.stoppedLeftAnimation = stoppedLeftAnimation;
	}
	
	function setStoppedRightAnimation(stoppedRightAnimation : UVAnimation){
	
		this.stoppedRightAnimation = stoppedRightAnimation;
	}
};