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
	
	samurai : {
		name	: "Samurai",
		tier	: "tier1",
		promoteTo : [ "swordSaint", "weaponMaster" ],
		base	: new Stat(17, 4, 0, 5, 8, 3, 3, 3),
		growth	: new Stat(10, 10, 0, 15, 20, 15, 0, 10),
		maxStat	: new Stat(40, 20, 16, 23, 25, 24, 18, 20),
	},
	
	swordSaint : {
		name	: "Swordmaster",
		tier	: "tier2",
		base	: new Stat(18, 6, 2, 7, 11, 4, 5, 5),
		growth	: new Stat(10, 10, 5, 15, 20, 15, 0, 10),
		maxStat	: new Stat(55, 30, 28, 32, 35, 33, 27, 31),
	},
	
	weaponMaster : {
		name	: "Master of Arms",
		tier	: "tier2",
		base	: new Stat(20, 8, 0, 6, 9, 3, 7, 3),
		growth	: new Stat(20, 15, 0, 10, 10, 10, 10, 0),
		maxStat	: new Stat(65, 33, 25, 30, 30, 31, 31, 28),
	},
	
	ninja : {
		name 	: "Ninja",
		tier	: "tier1",
		promoteTo : [ "jounin", "mechanist" ],
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
	
	mechanist : {
		name	: "Mechanist",
		tier	: "tier2",
		base	: new Stat(18, 7, 0, 9, 7, 2, 6, 6),
		growth	: new Stat(10, 10, 0, 15, 10, 5, 5, 15),
		maxStat	: new Stat(60, 30, 25, 33, 30, 30, 31, 31),
	},
	
	singer : {
		name	: "Songstress",
		tier	: "special",
		base	: new Stat(16, 3, 0, 6, 5, 3, 2, 3),
		growth	: new Stat(0, 10, 0, 20, 20, 20, 0, 0),
		maxStat	: new Stat(45, 28, 27, 31, 31, 35, 27, 28),
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
	azura : {
		name	: "Azura",
		baseClass : ClassSet.singer,
		base : {
			standard : new BaseStat(1, 16, 5, 2, 8, 8, 6, 4, 7),
		},
		growth	: new Stat(25, 50, 25, 60, 60, 40, 15, 35),
		mod		: new Stat(0, 0, 0, 1, 3, 0, -3, 0),
	},
	
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