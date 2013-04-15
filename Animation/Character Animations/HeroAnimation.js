#pragma strict

private var rightRunAnimation : UVAnimation = new UVAnimation();
private var leftRunAnimation : UVAnimation = new UVAnimation();
private var stoppedLeftAnimation : UVAnimation = new UVAnimation();
private var stoppedRightAnimation : UVAnimation = new UVAnimation();
private var attackLeftAnimation : UVAnimation = new UVAnimation();
private var attackRightAnimation : UVAnimation = new UVAnimation();

private var spriteManagerScript : SpriteManager;
private var heroSprite : Sprite;

var faceDirectionScript : FaceDirection;
var animationSpeed = 10;

private var spriteAnimation : SpriteAnimation = null;

var spriteXScale : double;
var spriteYScale : double;
var yOffset : double;

function Start () {

	var spriteManagerGameObject:GameObject = GameObject.Find("HeroSpriteManager");
	spriteManagerScript = spriteManagerGameObject.GetComponent("LinkedSpriteManager") as SpriteManager;
	
	/*// Width of hero on original image * width of texture / width of original image
	var width : float = 975 / 4f;
	// Height of hero on original image * height of texture / height of original image
	var height : float = 737 / 4f;
	var xOnTexture : int = 0;
	var yOnTexture : int = height;*/
	
	// Width of hero on original image * width of texture / width of original image
	var width : float = 1241 * 2048 / 6144f;
	// Height of hero on original image * height of texture / height of original image
	var height : float = 890 * 2048 / 8192f;
	var xOnTexture : int = 0;
	var yOnTexture : int = height * 5;
	
	heroSprite = spriteManagerScript.AddSprite(gameObject, spriteXScale, spriteYScale, xOnTexture, yOnTexture
			, width, height, new Vector3(0, yOffset, 0), false);

	/*var startPosUV = spriteManagerScript.PixelCoordToUVCoord(xOnTexture, yOnTexture);
	var spriteSize = spriteManagerScript.PixelSpaceToUVSpace(width, height);
	leftRunAnimation.BuildUVAnim(startPosUV, spriteSize, 4, 2, 7, animationSpeed);
	leftRunAnimation.loopCycles = -1;*/
	
	var startPosUV = spriteManagerScript.PixelCoordToUVCoord(xOnTexture, yOnTexture);
	var spriteSize = spriteManagerScript.PixelSpaceToUVSpace(width, height);
	leftRunAnimation.BuildUVAnim(startPosUV, spriteSize, 4, 2, 8, animationSpeed);
	leftRunAnimation.loopCycles = -1;
	
	/*stoppedLeftAnimation.BuildUVAnim(startPosUV, spriteSize, 1, 1, 1, animationSpeed);
	stoppedLeftAnimation.loopCycles = -1;
	
	startPosUV = spriteManagerScript.PixelCoordToUVCoord(xOnTexture, yOnTexture + height * 2);
	rightRunAnimation.BuildUVAnim(startPosUV, spriteSize, 4, 2, 7, animationSpeed);
	rightRunAnimation.loopCycles = -1;
	
	stoppedRightAnimation.BuildUVAnim(startPosUV, spriteSize, 1, 1, 1, animationSpeed);
	stoppedRightAnimation.loopCycles = -1;
	
	heroSprite.AddAnimation(rightRunAnimation);
	heroSprite.AddAnimation(leftRunAnimation);
	heroSprite.PlayAnim(leftRunAnimation);*/
	
	xOnTexture = width * 2;
	startPosUV = spriteManagerScript.PixelCoordToUVCoord(xOnTexture, yOnTexture);
	stoppedLeftAnimation.BuildUVAnim(startPosUV, spriteSize, 1, 1, 1, animationSpeed);
	stoppedLeftAnimation.loopCycles = -1;
	
	xOnTexture = 0;
	yOnTexture = height * 7;
	startPosUV = spriteManagerScript.PixelCoordToUVCoord(xOnTexture, yOnTexture);
	rightRunAnimation.BuildUVAnim(startPosUV, spriteSize, 4, 2, 8, animationSpeed);
	rightRunAnimation.loopCycles = -1;
	
	xOnTexture = width * 2;
	startPosUV = spriteManagerScript.PixelCoordToUVCoord(xOnTexture, yOnTexture);
	stoppedRightAnimation.BuildUVAnim(startPosUV, spriteSize, 1, 1, 1, animationSpeed);
	stoppedRightAnimation.loopCycles = -1;
	
	xOnTexture = 0;
	yOnTexture = height;
	startPosUV = spriteManagerScript.PixelCoordToUVCoord(xOnTexture, yOnTexture);
	attackLeftAnimation.BuildUVAnim(startPosUV, spriteSize, 4, 2, 8, animationSpeed);
	attackLeftAnimation.loopCycles = -1;
	
	yOnTexture = height * 3;
	startPosUV = spriteManagerScript.PixelCoordToUVCoord(xOnTexture, yOnTexture);
	attackRightAnimation.BuildUVAnim(startPosUV, spriteSize, 4, 2, 8, animationSpeed);
	attackRightAnimation.loopCycles = -1;
	
	heroSprite.AddAnimation(rightRunAnimation);
	heroSprite.AddAnimation(leftRunAnimation);
	heroSprite.AddAnimation(stoppedRightAnimation);
	heroSprite.AddAnimation(stoppedLeftAnimation);
	heroSprite.AddAnimation(attackRightAnimation);
	heroSprite.AddAnimation(attackLeftAnimation);
	heroSprite.PlayAnim(leftRunAnimation);
	
	spriteAnimation = new SpriteAnimation(heroSprite);
	
	spriteAnimation.setLeftAnimation(leftRunAnimation);
	spriteAnimation.setRightAnimation(rightRunAnimation);
	
	spriteAnimation.setStoppedLeftAnimation(stoppedLeftAnimation);
	spriteAnimation.setStoppedRightAnimation(stoppedRightAnimation);
	
	spriteAnimation.setAttackLeftAnimation(attackLeftAnimation);
	spriteAnimation.setAttackRightAnimation(attackRightAnimation);
	
	faceDirectionScript = gameObject.GetComponent(FaceDirection);
	faceDirectionScript.spriteAnimation = this.spriteAnimation;
	
	var combatScript = gameObject.GetComponent(Combat);
	combatScript.attackAnimationScript = this.spriteAnimation;
}



function Update () {

}

function OnDestroy(){

	spriteManagerScript.RemoveSprite(heroSprite);	
}