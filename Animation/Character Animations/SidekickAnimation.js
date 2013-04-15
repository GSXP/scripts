#pragma strict

#pragma strict

private var spriteManagerScript : SpriteManager;
private var sidekickSprite : Sprite;

var spriteXScale : double;
var spriteYScale : double;
var yOffset : double;

function Start () {

	var spriteManagerGameObject:GameObject = GameObject.Find("SidekickSpriteManager");
	spriteManagerScript = spriteManagerGameObject.GetComponent("LinkedSpriteManager") as SpriteManager;
	
	// Width of enemy on original image * width of texture / width of original image
	var width : float = 256;
	// Height of enemy on original image * height of texture / height of original image
	var height : float = 256;
	var xOnTexture : int = 0;
	var yOnTexture : int = height;
	
	sidekickSprite = spriteManagerScript.AddSprite(gameObject, spriteXScale, spriteYScale, xOnTexture, yOnTexture
			, width, height, new Vector3(0, yOffset, 0), false);
}

function Update () {

}

function OnDestroy(){

	spriteManagerScript.RemoveSprite(sidekickSprite);
}