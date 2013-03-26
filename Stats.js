#pragma strict

function Start () {
	var whoami : String = gameObject.name;
	var X : float = 7; // From the design presetation
	if (whoami == "Sidekick") {
		loadStats(20, 0, 0, 1.5 * X, 0, 0);
	} else if (whoami == "Hero") {
		loadStats(100, 10, 2.0, X, 5, 2.5);
	} else if (whoami == "Mob") {
		loadStats(50, 5, 0.66, X, 5, 5);
	} else {
		print("Whoa! Stats here! I don't know how to handle " + whoami);
		loadStats(0, 0, 0, 0, 0, 0);
	}
}

// TODO: Move these out to public variables so they can be tracked in the UI

private var Health : int; // Health
private var MaxHealth : int; // Max Health
private var Attack : int; // Damage done per attack
private var BaseAttack : int; // Stores initial attack value in case attack is modified for a special effect
private var AttackRange : float; // Maximum distance that can still land a successful attack
// BaseAttackRange maybe in future. Nothing in prototype modifies attack range.
private var AttackSpeed : float; // How many attacks per second. 0.5 = Attack once every 2 seconds.
private var BaseAttackSpeed : float; // How many attacks per second. 0.5 = Attack once every 2 seconds.
private var MoveSpeed : float; // How fast it moves
private var BaseMoveSpeed : float; // Base speed
private var SightRange : float; // Visible forward distance
private var BaseSightRange : float; // Base value of the above
private var SpellRange : float; // Range of spell casting
private var BaseSpellRange :float; // Base value of the above
private var DamageRatio : float; // 1.0 = Normal, 0.5 = Takes Half Damage, 2.0 = Takes Double Damage

private function loadStats(maxHP : int, baseATK : int, baseATKSPD : float, baseMOVSPD : float, baseSight : float, baseSpellRange : float) {
		MaxHealth = maxHP;
		Health = maxHP;
		BaseAttack = baseATK;
		Attack = baseATK;
		BaseAttackSpeed = baseATKSPD;
		AttackSpeed = baseATKSPD;
		BaseMoveSpeed = baseMOVSPD;
		MoveSpeed = baseMOVSPD;
		DamageRatio = 1;
		AttackRange = 2; // Minimum to attack or be attacked by Hero (because he's so big)
		BaseSightRange = baseSight;
		SightRange = baseSight;
		BaseSpellRange = baseSpellRange;
		SpellRange = baseSight;
}

// Getters
function getHealth() {
	return Health;
}
	
function getMaxHealth() {
	return MaxHealth;
}
	
function getAttack() {
	return Attack;
}

function getAttackRange() {
	return AttackRange;
}

function getBaseAttack() {
	return BaseAttack;
}

function getAttackSpeed() {
	return AttackSpeed;
}

function getBaseAttackSpeed() {
	return BaseAttackSpeed;
}

function getMoveSpeed() {
	return MoveSpeed;
}

function getBaseMoveSpeed() {
	return BaseMoveSpeed;
}

function getDamageRatio() {
	return DamageRatio;
}

function getSightRange() {
	return SightRange;
}

function getBaseSightRange() {
	return BaseSightRange;
}

function getSpellRange() {
	return SpellRange;
}

// Modifiers
function hurtHealth(damage : int) {
	Health -= damage * DamageRatio;
}
	
function healHealth(life : int) {
	Health += life;
}

function healAllHealth() {
	Health = MaxHealth;
}
	
function modAttack(ratio : float) {
	Attack *= ratio;
}

function resetAttack() {
	Attack = BaseAttack;
}

function modAttackSpeed(ratio : float) {
	AttackSpeed *= ratio;
}

function resetAttackSpeed() {
	AttackSpeed = BaseAttackSpeed;
}

function modMoveSpeed(ratio : float) {
	MoveSpeed *= ratio;
}

function resetMoveSpeed() {
	MoveSpeed = BaseMoveSpeed;
}

function setDamageRatio(ratio : float) {
	DamageRatio = ratio;
}

function modSightRange(ratio : float) {
	SightRange *= ratio;
}

function resetSightRange() {
	SightRange = BaseSightRange;
}