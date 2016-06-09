/*
 * Constants
 */
const LEVEL_CAP_STANDARD = 20;
const LEVEL_CAP_SPECIAL = 40;
const SPECIAL_LEVEL_MODIFIER = 20;
const LEVEL_PROMOTION = 10;

/*
 *	LevelAttribute
 */
var LevelAttribute = function(unitClass, stat) {
	this.unitClass = unitClass;
	this.stat = stat;
	this.tier1Level = 0;
	this.tier2Level = 0;
}

LevelAttribute.prototype.setInitialLevel = function(tier1Level, tier2Level) {
	this.tier1Level = tier1Level;
	this.tier2Level = tier2Level;
	this.calculateDisplayedLevel();
}

// If level up in the same class, increase level irregardless of class tier
// Assumption: caller has to make sure that upon reaching tier 1 cap of a tier 1 class, this function will not be called
// If class tier go from 1 to 2, assume it is a promotion & increase level accordingly
// Otherwise assume that a parallel seal is used & level will not go up
LevelAttribute.prototype.increaseLevel = function(prev) {
	if (prev.unitClass == this.unitClass) {
		if (prev.tier2Level > 0) {
			this.tier1Level = prev.tier1Level;
			this.tier2Level = prev.tier2Level + 1;
		}else {
			this.tier1Level = prev.tier1Level + 1;
			if (this.tier1Level > LEVEL_CAP_STANDARD) {
				this.tier1Level = LEVEL_CAP_STANDARD;
				this.tier2Level = 1;
			}
		}
	}else if (this.unitClass.tier == "tier2" && prev.unitClass.tier == "tier1") {
		this.tier1Level = prev.tier1Level;
		this.tier2Level = 1;
	}else /*if (this.unitClass.tier == "special" || prev.unitClass.tier == "special")*/ {
		this.tier1Level = prev.tier1Level;
		this.tier2Level = prev.tier2Level;
	}
	this.calculateDisplayedLevel();
}

LevelAttribute.prototype.isAtCap = function(extraCap) {
	return ((this.tier1Level == LEVEL_CAP_STANDARD && this.tier2Level == 0 && this.unitClass.tier != "special") || this.tier2Level == (LEVEL_CAP_STANDARD + extraCap))
}

LevelAttribute.prototype.calculateDisplayedLevel = function() {
	this.displayedLevel = (this.tier2Level > 0 ? (this.unitClass.tier == "special" ? this.tier2Level + SPECIAL_LEVEL_MODIFIER : this.tier2Level) : this.tier1Level);
	return this.displayedLevel;
}


/*
 *	ClassChange
 */
var ClassChange = function(level, targetClass) {
	this.level = level;
	this.targetClass = targetClass;
	this.promotion = false;
}

/*
 *	StatCalculator
 */
var StatCalculator = function() {
	this.extraLevel = 0;
	this.baseSet = "standard";
	this.classChanges = [];
}


StatCalculator.prototype.setCharacter = function(character) {
	this.character = CharacterSet[character];
	return this.character;
}

StatCalculator.prototype.addClassChange = function(level, targetClass) {
	var newClass = ClassSet[targetClass];
	var latestClassChange = this.getLatestClassChange();
	var oldClass = (latestClassChange ? latestClassChange.targetClass : this.character.baseClass);
	var newClassChange = new ClassChange(level, newClass);
	if (newClass.tier == "tier2" && oldClass.tier == "tier1")
		newClassChange.promotion = true;
	this.classChanges.push(newClassChange)
}

StatCalculator.prototype.resetClassChange = function() {
	this.classChanges = [];
}

StatCalculator.prototype.getAvailableLevelRange = function() {
	var curClass, baseLevel;
	var latestClassChange = this.getLatestClassChange();
	if (latestClassChange) {
		curClass = latestClassChange.targetClass;
		baseLevel = (latestClassChange.promotion ? 0 : latestClassChange.level);
	}else {
		curClass = this.character.baseClass;
		baseLevel = this.character.base[this.baseSet].level;
	}
	
	var cap = (curClass.tier == "special" ? LEVEL_CAP_SPECIAL : LEVEL_CAP_STANDARD);
	if (curClass.tier != "tier1")
		cap += this.extraLevel;
		
	var ret = [];
	for (var i=baseLevel; i<=cap; i++)
		ret.push(i);
		
	return ret;
}

StatCalculator.prototype.getAvaiableClassChange = function(level) {
	var latestClassChange = this.getLatestClassChange();
	var curClass = (latestClassChange ? latestClassChange.targetClass : this.character.baseClass);
	
	var ret = {};	
	if (curClass.tier == "tier1" ) {
		if (level > LEVEL_PROMOTION) {
			ret.masterSeal = {};
			for (var i=0; i<curClass.promoteTo.length; i++)
				ret.masterSeal[curClass.promoteTo[i]] = ClassSet[curClass.promoteTo[i]];
		}
		
		ret.heartSeal = {};
		ret.specialSeal = {};
		filterClassByTier(curClass, ret.heartSeal, "tier1");
		filterClassByTier(curClass, ret.specialSeal, "special");
				
	}else if (curClass.tier == "tier2") {
		ret.heartSeal = {};
		ret.specialSeal = {};
		filterClassByTier(curClass, ret.heartSeal, "tier2");
		filterClassByTier(curClass, ret.specialSeal, "special");
	
	}else if (curClass.tier == "special") {
		ret.heartSeal = {};
		ret.specialSeal = {};
		if (level <= LEVEL_CAP_STANDARD)
			filterClassByTier(curClass, ret.heartSeal, "tier1");
		else
			filterClassByTier(curClass, ret.heartSeal, "tier2");
		filterClassByTier(curClass, ret.specialSeal, "special");
	}
	
	return ret;
}

function filterClassByTier(currentClass, set, tier) {
	for (var parClass in ClassSet)
		if (ClassSet[parClass].tier == tier && ClassSet[parClass] != currentClass)
			set[parClass] = ClassSet[parClass];
}

// Return latest class change, or undefined
StatCalculator.prototype.getLatestClassChange = function() {
	if (this.classChanges.length > 0)
		return this.classChanges[this.classChanges.length-1];
}

StatCalculator.prototype.compute = function() {
	var averageStats = [[]];
	
	// Starting level is defined by character base
	var baseStat = this.character.base[this.baseSet];
	var startingLevel = new LevelAttribute(this.character.baseClass, baseStat.stat);
	if (this.character.baseClass.tier != "tier2")
		startingLevel.setInitialLevel(baseStat.level, 0);
	else
		startingLevel.setInitialLevel(0, baseStat.level);
	averageStats[0].push(startingLevel);
	var prev = startingLevel;
	
	// Loop until there are no more class changes and character has reached level cap
	for (var i=0; i<this.classChanges.length || !prev.isAtCap(this.extraLevel); ) {
		if (this.classChanges[i] && prev.displayedLevel == this.classChanges[i].level) {
			// Class changed, adjust the stat using class base stat
			var newClass = this.classChanges[i].targetClass;
			var oldClass = prev.unitClass;
			var thisLevel = new LevelAttribute(newClass, {});
			thisLevel.increaseLevel(prev);
			
			for (var attr in newClass.base) {
				thisLevel.stat[attr] = prev.stat[attr] + newClass.base[attr] - oldClass.base[attr];
			}
			averageStats[++i] = [];
		}else {
			// No change, calculate growth as per normal
			var thisLevel = new LevelAttribute(prev.unitClass, {});
			thisLevel.increaseLevel(prev);
			
			for (var attr in this.character.growth) {
				var growth = (this.character.growth[attr] + prev.unitClass.growth[attr]);
				// Does not grow if stat is at cap
				// The extra multiplication eliminates javascript floating point precision problem
				thisLevel.stat[attr] = Math.min((prev.stat[attr]*1000 + growth*10)/1000, prev.unitClass.maxStat[attr]);	
			}
		}
		prev = thisLevel;
		averageStats[i].push(thisLevel);
	}
	
	return averageStats;
}