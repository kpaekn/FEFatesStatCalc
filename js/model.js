var Stat = function(HP, Str, Mag, Skl, Spd, Lck, Def, Res) {
	this.HP = HP;
	this.Str = Str;
	this.Mag = Mag;
	this.Skl = Skl;
	this.Spd = Spd;
	this.Lck = Lck;
	this.Def = Def;
	this.Res = Res;
}

var BaseStat = function(level, HP, Str, Mag, Skl, Spd, Lck, Def, Res) {
	this.level = level;
	this.stat = new Stat(HP, Str, Mag, Skl, Spd, Lck, Def, Res);
}

var ClassSet = {
	ninja : {
		name 	: "Ninja",
		tier	: "tier1",
		promoteTo : [ this.jounin ],
		base 	: new Stat(16, 3, 0, 8, 8, 1, 3, 3),
		growth 	: new Stat(5, 5, 0, 20, 20, 0, 5, 15),
		maxStat : new Stat(35, 17, 15, 25, 25, 18, 19, 20),
	},
	
	jounin : {
		name 	: "Master Ninja",
		tier	: "tier2",
		base 	: new Stat(17, 5, 0, 10, 11, 2, 4, 8),
		growth 	: new Stat(5, 5, 0, 20, 20, 0, 5, 20),
		maxStat : new Stat(55, 27, 25, 35, 35, 28, 26, 34),
	},
	
	darkFlier : {
		name	: "Dark Falcon",
		tier	: "special",
		base	: new Stat(17, 4, 7, 5, 9, 4, 3, 9),
		growth	: new Stat(0, 10, 15, 5, 15, 15, 0, 20),
		maxStat	: new Stat(45, 27, 32, 28, 33, 32, 26, 34),
		special	: true,
	}
}

var CharacterSet = {
	kaze : {
		name	: "Kaze",
		baseClass : ClassSet.ninja,
		base: {
			standard : new BaseStat(3, 19, 7, 0, 9, 12, 4, 5, 10),
			conquest : new BaseStat(9, 22, 9, 0, 12, 16, 6, 7, 13),
		},
		growth	: new Stat(55, 40, 0, 45, 65, 20, 20, 35),
		mod		: new Stat(0, -2, 0, 2, 3, -2, -1, 0),
	},
}
