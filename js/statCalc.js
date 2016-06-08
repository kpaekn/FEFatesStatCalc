var LevelAttribute = function(level, unitClass, stat) {
	this.displayedLevel = level;
	this.unitClass = unitClass;
	this.stat = stat;
}

/*var ClassChangeType = { 
	promotion 	: "Promotion", 
	heart-seal 	: "Heart Seal", 
	dlc-seal 	: "Special Seal",
}*/

var ClassChange = function(type, level, targetClass) {
	this.type = type;
	this.level = level;
	this.targetClass = ClassSet[targetClass];
}


var StatCalculator = function() {
	this.prepromoteCap = 20;
	this.promotedCap = 20;
	this.specialCap = 40;
	this.baseSet = "standard";
	this.classChanges = [];
}

StatCalculator.prototype.setCharacter = function(character) {
	this.character = CharacterSet[character];
	return this.character;
}

StatCalculator.prototype.addClassChange = function(type, level, targetClass) {
	this.classChanges.push(new ClassChange(type, level, targetClass))
}

StatCalculator.prototype.compute = function() {
	var averageStats = [];
	var baseStat = this.character.base[this.baseSet];
	var startingLevel = new LevelAttribute(baseStat.level, this.character.baseClass, baseStat.stat);
	
	averageStats.push(startingLevel);
	
	for (var i=baseStat.level+1; i<=this.prepromoteCap; i++) {
		var thisLevel = new LevelAttribute(i, this.character.baseClass /*to be changed*/, {});
		for (var stat in this.character.growth) {
			var growthRate = this.character.growth[stat] + this.character.baseClass.growth[stat];
			thisLevel.stat[stat] = averageStats[averageStats.length-1].stat[stat] + growthRate/100;
		}
		averageStats.push(thisLevel);
	}
	
	return averageStats;
}