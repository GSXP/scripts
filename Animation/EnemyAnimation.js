#pragma strict

private var spriteManagerScript : SpriteManager;
private var enemySprite : Sprite;

function Start () {

	var spriteManagerGameObject:GameObject = GameObject.Find("EnemySpriteManager");
	spriteManagerScript = spriteManagerGameObject.GetComponent("LinkedSpriteManager") as SpriteManager;
	
	var animVars : EnemyAnimationVars = spriteManagerGameObject.GetComponent("EnemyAnimationVars") as EnemyAnimationVars;
	
	// Width of enemy on original image * width of texture / width of original image
	var width : float = 491;
	// Height of enemy on original image * height of texture / height of original image
	var height : float = 491;
	var xOnTexture : int = 0;
	var yOnTexture : int = height;
	
	enemySprite = spriteManagerScript.AddSprite(gameObject, animVars.spriteXScale, animVars.spriteYScale, xOnTexture, yOnTexture
			, width, height, new Vector3(0, animVars.yOffset, 0), false);
}

function Update () {

}

function OnDestroy(){

	spriteManagerScript.RemoveSprite(enemySprite);
}