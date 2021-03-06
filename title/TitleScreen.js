#pragma strict

public var titleBanner : Texture2D;

// Spell types to pass into the actual game portion
public var healType : int; // 0 for insta-heal, 1 for heal over time
public var buffType : int; // 0 for fire, 1 for ice

private var stage : int;
private var fadein : boolean;
private var timeLeft : float;
private var bannerX : float;
private var bannerY : float;
private var music : AudioSource;

function Start () {
	stage = 0;
	alpha = 0;
	fadein = true;
	timeLeft = 3;
	bannerX = Screen.width / 2 - 256;
	bannerY = Screen.height / 2 - 64;
	DontDestroyOnLoad(this);
}

function Update () {
	if(Input.GetButtonDown("Fire1")) {
		if(stage < 6) {
			bannerY = targetY;
			stage = 6;
		} else if (stage == 7 || stage == 8) {
			stage = 9;
		}
	}
	if (stage == 11) {
		Application.LoadLevel(1);
	}
}

function OnGUI() {	
	switch (stage) {
	case 0: stage0(); break;
	case 1: stage1(); break;
	case 2: stage2(); break;
	case 3: stage3(); break;
	case 4: stage4(); break;
	case 5: stage5(); break;
	case 6: stage6(); break;
	case 7: stage7(); break;
	case 8: stage8(); break;
	case 9: stage9(); break;
	case 10: stage10(); break;
	}
}

private var wait0 : float = 2;
function stage0() {
	wait0 -= Time.deltaTime;
	if (wait0 <= 0) {
		++stage;
	}
}

private var fadeStep : float = .7;
private var fadeTimeLeft : float = fadeStep;
private var alpha : float = 0;
function stage1() {
	fadeTimeLeft -= Time.deltaTime;
	if (fadeTimeLeft <= 0) {
		fadeTimeLeft = fadeStep;
		alpha += .2;
		if (alpha >= 1)
			++stage;
	}
	
	GUI.color.a = alpha;
	GUI.DrawTexture(Rect(bannerX,bannerY,512,128),titleBanner);
	GUI.color.a = 1;
}

private var wait2 : float = 3;
function stage2() {
	wait2 -= Time.deltaTime;
	if (wait2 <= 0) ++stage;
	GUI.DrawTexture(Rect(bannerX,bannerY,512,128),titleBanner);
}

private var targetY = Screen.height / 4 - 64;
function stage3() {
	bannerY -= 20 * Time.deltaTime;
	if(bannerY <= targetY) {
		bannerY = targetY;
		++stage;
	}
	GUI.DrawTexture(Rect(bannerX,bannerY,512,128),titleBanner);
}

private var wait4 : float = 2;
function stage4() {
	wait4 -= Time.deltaTime;
	if (wait4 <= 0) ++stage;
	GUI.DrawTexture(Rect(bannerX,bannerY,512,128),titleBanner);
}

private var wait5 : float = 0;
private var maxWait5 : float = .75;
function stage5() {
	// fade in menu
	GUI.DrawTexture(Rect(bannerX,bannerY,512,128),titleBanner);
	wait5 += Time.deltaTime;
	GUI.color.a = wait5 / maxWait5;
	if (wait5 >= maxWait5) ++stage;
	drawChoice("Instant Heal", "Heal Over Time");
	GUI.color.a = 1;
}

function stage6() {
	// menu
	GUI.DrawTexture(Rect(bannerX,bannerY,512,128),titleBanner);
	var pressed : int = drawChoice("Instant Heal", "Heal Over Time");
	if (pressed != 0) {
		healType = pressed-1;
		++stage;
	}
}

private var wait7 : float = 0;
private var maxWait7 : float = .75;
function stage7() {
	// fade out menu
	GUI.DrawTexture(Rect(bannerX,bannerY,512,128),titleBanner);
	wait7 += Time.deltaTime;
	GUI.color.a = (maxWait7 - wait7) / maxWait7;
	if (wait7 >= maxWait7) ++stage;
	drawChoice("Instant Heal", "Heal Over Time");
	GUI.color.a = 1;
}

private var wait8 : float = 0;
private var maxWait8 : float = .75;
function stage8() {
	// fade in menu
	GUI.DrawTexture(Rect(bannerX,bannerY,512,128),titleBanner);
	wait8 += Time.deltaTime;
	GUI.color.a = wait8 / maxWait8;
	if (wait8 >= maxWait8) ++stage;
	drawChoice("Fire", "Ice");
	GUI.color.a = 1;
}

function stage9() {
	// menu
	GUI.DrawTexture(Rect(bannerX,bannerY,512,128),titleBanner);
	var pressed : int = drawChoice("Fire", "Ice");
	if (pressed != 0) {
		buffType = pressed-1;
		++stage;
	}
}

private var wait10 : float = 0;
private var maxWait10 : float = 2;
function stage10() {
	wait10 += Time.deltaTime;
	GUI.color.a = (maxWait10 - wait10) / maxWait10;
	GUI.DrawTexture(Rect(bannerX,bannerY,512,128),titleBanner);
	if (wait10 >= maxWait10) ++stage;
	drawChoice("Fire", "Ice");
	GUI.color.a = 1;
}

private var buttonWidth : float = 120;
private var buttonHeight : float = 100;
private var buttonPadding : float = 10;
function drawChoice(choice1 : String, choice2 : String) : int {
	var result : int = 0;
	if(GUI.Button(Rect(Screen.width / 2 - buttonWidth - buttonPadding, Screen.height / 2, buttonWidth, buttonHeight), choice1))
		result = 1;	
	if(GUI.Button(Rect(Screen.width / 2 + buttonPadding, Screen.height / 2, buttonWidth, buttonHeight), choice2))
		result = 2;
		
	return result;
}

