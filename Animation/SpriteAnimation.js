#pragma strict

public class SpriteAnimation{

	var sprite : Sprite;
	private var leftAnimation : UVAnimation;
	private var rightAnimation : UVAnimation;
	private var stoppedLeftAnimation : UVAnimation;
	private var stoppedRightAnimation : UVAnimation;
	private var attackLeftAnimation : UVAnimation;
	private var attackRightAnimation : UVAnimation;
	private var currentFaceDirection : Vector3;
	private var attacking : boolean;
	private var stopped : boolean;
	
	function SpriteAnimation(newSprite : Sprite){
	
		this.sprite = newSprite;
		this.currentFaceDirection = Vector3.left;
		stopped = true;
		attacking = false;
	}	
	
	function notifyDirection(direction : Vector3){
	
		var tempCurrentFaceDirection = currentFaceDirection;
		if(stopped){
		
			tempCurrentFaceDirection = Vector3.zero;
		}
		
		if(direction != tempCurrentFaceDirection){
		
			if(attacking){
				
				if(direction == Vector3.left){
				
					playLeftAttackAnimation();
					currentFaceDirection = direction;
					stopped = false;
				}
				else if(direction == Vector3.right){
				
					playRightAttackAnimation();
					currentFaceDirection = direction;
					stopped = false;
				}
				else if(direction == Vector3.zero){
				
					stopped = true;
				}
			}
			else{
			
				if(direction == Vector3.zero){
				
					
					if(currentFaceDirection == Vector3.left){
					
						playStoppedLeftAnimation();
					}
					else if (currentFaceDirection == Vector3.right){
						
						playStoppedRightAnimation();
					}
					
					stopped = true;
				}
				else if(direction == Vector3.left){
				
					currentFaceDirection = Vector3.left;
					playLeftAnimation();
					stopped = false;
				}
				else if(direction == Vector3.right){
				
					currentFaceDirection = Vector3.right;
					playRightAnimation();
					stopped = false;
				}
			}
		}
	}
	
	function startAttacking(){
	
		attacking = true;
		if(currentFaceDirection == Vector3.right){
		
			playRightAttackAnimation();
		}
		else if(currentFaceDirection == Vector3.left){
		
			playLeftAttackAnimation();
		}
	}
	
	function stopAttacking(){
	
		attacking = false;
		if(stopped){
		
			if(currentFaceDirection == Vector3.left){
			
				playStoppedLeftAnimation();
			}
			else if(currentFaceDirection == Vector3.right){
			
				playStoppedRightAnimation();
			}
		}
		else{
			
			if(currentFaceDirection == Vector3.left){
			
				playLeftAnimation();
			}
			else if(currentFaceDirection == Vector3.right){
			
				playRightAnimation();
			}
		}
	}
	
	function isAttacking(){

		return attacking;
	}
	
	function playStoppedLeftAnimation(){
		
		sprite.PlayAnim(stoppedLeftAnimation);
	}
	
	function playStoppedRightAnimation(){
		
		sprite.PlayAnim(stoppedRightAnimation);
	}

	function playLeftAnimation(){
	
		this.sprite.PlayAnim(leftAnimation);
	}
	
	function playRightAnimation(){
	
		this.sprite.PlayAnim(rightAnimation);
	}
	
	function playLeftAttackAnimation(){
	
		this.sprite.PlayAnim(attackLeftAnimation);
	}
	
	function playRightAttackAnimation(){
	
		this.sprite.PlayAnim(attackRightAnimation);
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
	
	function setAttackLeftAnimation(attackLeftAnimation : UVAnimation){
	
		this.attackLeftAnimation = attackLeftAnimation;
	}
	
	function setAttackRightAnimation(attackRightAnimation : UVAnimation){
	
		this.attackRightAnimation = attackRightAnimation;
	}
};