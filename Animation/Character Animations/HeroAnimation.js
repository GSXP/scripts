#pragma strict

private var rightRunAnimation : UVAnimation = new UVAnimation();
private var leftRunAnimation : UVAnimation = new UVAnimation();
private var stoppedLeftAnimation : UVAnimation = new UVAnimation();
private var stoppedRightAnimation : UVAnimation = new UVAnimation();

private var spriteManagerScript : SpriteManager;
private var playerSprite : Sprite;

var faceDirectionScript : FaceDirection;
var animationFPS = 10;

private var spriteAnimation : SpriteAnimation = null;

function Start () {

	var spriteManagerGameObject:GameObject = GameObject.Find("HeroSpriteManager");
	spriteManagerScript = spriteManagerGameObject.GetComponent("LinkedSpriteManager") as SpriteManager;
	
	var spriteWorldWidth : double = 1.3;
	var spriteWorldHeight : double = 1.3;
	// Width of hero on original image * width of texture / width of original image
	var width : float = 975 / 4f;
	// Height of hero on original image * height of texture / height of original image
	var height : float = 737 / 4f;
	var xOnTexture : int = 0;
	var yOnTexture : int = height;
	
	playerSprite = spriteManagerScript.AddSprite(gameObject, spriteWorldWidth, spriteWorldHeight, xOnTexture, yOnTexture, width, height, false);

	var startPosUV = spriteManagerScript.PixelCoordToUVCoord(xOnTexture, yOnTexture);
	var spriteSize = spriteManagerScript.PixelSpaceToUVSpace(width, height);
	leftRunAnimation.BuildUVAnim(startPosUV, spriteSize, 4, 2, 7, animationFPS);
	leftRunAnimation.loopCycles = -1;
	
	stoppedLeftAnimation.BuildUVAnim(startPosUV, spriteSize, 1, 1, 1, animationFPS);
	stoppedLeftAnimation.loopCycles = -1;
	
	startPosUV = spriteManagerScript.PixelCoordToUVCoord(xOnTexture, yOnTexture + height * 2);
	rightRunAnimation.BuildUVAnim(startPosUV, spriteSize, 4, 2, 7, animationFPS);
	rightRunAnimation.loopCycles = -1;
	
	stoppedRightAnimation.BuildUVAnim(startPosUV, spriteSize, 1, 1, 1, animationFPS);
	stoppedRightAnimation.loopCycles = -1;
	
	playerSprite.AddAnimation(rightRunAnimation);
	playerSprite.AddAnimation(leftRunAnimation);
	playerSprite.PlayAnim(leftRunAnimation);
	
	spriteAnimation = new SpriteAnimation(playerSprite);
	
	spriteAnimation.setLeftAnimation(leftRunAnimation);
	spriteAnimation.setRightAnimation(rightRunAnimation);
	
	spriteAnimation.setStoppedLeftAnimation(stoppedLeftAnimation);
	spriteAnimation.setStoppedRightAnimation(stoppedRightAnimation);
	
	faceDirectionScript = gameObject.GetComponent(FaceDirection);
	faceDirectionScript.spriteAnimation = this.spriteAnimation;
}



function Update () {

}