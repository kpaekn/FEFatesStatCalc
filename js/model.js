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
	
	nohrPrince : {
		name	: "Nohr Prince(ss)",
		tier	: "tier1",
		promoteTo : [ "hoshidoNoble", "nohrNoble" ],
		base	: new Stat(17, 7, 3, 4, 5, 2, 5, 2),
		growth	: new Stat(15, 15, 10, 10, 10, 10, 10, 5),
		maxStat	: new Stat(40, 23, 17, 19, 21, 22, 21, 19),
	},
	
	hoshidoNoble : {
		name	: "Hoshido Noble",
		tier	: "tier2",
		base	: new Stat(19, 10, 4, 5, 6, 4, 7, 3),
		growth	: new Stat(15, 15, 10, 10, 10, 10, 15, 0),
		maxStat	: new Stat(60, 34, 28, 29, 30, 33, 31, 28),
	},
	
	nohrNoble : {
		name	: "Nohr Noble",
		tier	: "tier2",
		base	: new Stat(18, 8, 6, 4, 7, 2, 6, 6),
		growth	: new Stat(15, 10, 15, 5, 15, 5, 5, 15),
		maxStat	: new Stat(60, 32, 31, 28, 32, 27, 29, 32),
	},
	
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
	
	villager : {
		name	: "Villager",
		tier	: "tier1",
		promoteTo : [ "weaponMaster", "merchant" ],
		base	: new Stat(17, 5, 0, 4, 5, 3, 4, 0),
		growth	: new Stat(10, 10, 0, 10, 10, 20, 10, 0),
		maxStat	: new Stat(35, 19, 15, 19, 19, 22, 18, 15),
	},
	
	merchant : {
		name	: "Merchant",
		tier	: "tier2",
		base	: new Stat(20, 8, 0, 6, 5, 4, 8, 5),
		growth	: new Stat(20, 20, 0, 10, 5, 15, 10, 5),
		maxStat	: new Stat(65, 33, 25, 29, 28, 32, 33, 30),
	},
	
	apoth : {
		name	: "Apothecary",
		tier	: "tier1",
		promoteTo : [ "merchant", "merchanist" ],
		base	: new Stat(18, 6, 0, 4, 4, 2, 6, 2),
		growth	: new Stat(20, 20, 0, 10, 10, 5, 10, 5),
		maxStat	: new Stat(45, 24, 15, 19, 19, 21, 23, 20),
	},
	
	oni : {
		name	: "Oni Savage",
		tier	: "tier1",
		promoteTo : [ "shura", "blacksmith" ],
		base	: new Stat(18, 6, 1, 2, 5, 0, 7, 1),
		growth	: new Stat(20, 20, 10, 0, 10, 0, 20, 0),
		maxStat	: new Stat(45, 24, 19, 16, 20, 17, 23, 18),
	},
	
	shura : {
		name	: "Oni Chieftain",
		tier	: "tier2",
		base	: new Stat(19, 9, 5, 2, 7, 0, 10, 5),
		growth	: new Stat(10, 20, 15, 0, 10, 0, 20, 5),
		maxStat	: new Stat(60, 34, 28, 25, 30, 25, 36, 31),
	},
	
	blacksmith : {
		name	: "Blacksmith",
		tier	: "tier2",
		base	: new Stat(21, 8, 0, 9, 8, 3, 8, 2),
		growth	: new Stat(20, 15, 0, 15, 10, 5, 15, 0),
		maxStat	: new Stat(65, 33, 25, 32, 31, 30, 32, 27),
	},
	
	lancer : {
		name	: "Spear Fighter",
		tier	: "tier1",
		promoteTo : [ "sentinel", "basara" ],
		base	: new Stat(17, 6, 0, 6, 6, 2, 5, 2),
		growth	: new Stat(15, 15, 0, 15, 15, 5, 10, 5),
		maxStat	: new Stat(40, 22, 15, 23, 22, 21, 22, 21),
	},
	
	sentinel : {
		name	: "Spear Master",
		tier	: "tier2",
		base	: new Stat(18, 9, 0, 8, 8, 3, 7, 3),
		growth	: new Stat(15, 15, 0, 15, 15, 5, 10, 5),
		maxStat	: new Stat(60, 34, 25, 33, 32, 29, 30, 29),
	},
	
	basara : {
		name	: "Basara",
		tier	: "tier2",
		base	: new Stat(20, 7, 5, 7, 7, 5, 7, 6),
		growth	: new Stat(20, 10, 10, 10, 10, 15, 5, 10),
		maxStat	: new Stat(65, 31, 30, 30, 31, 35, 30, 32),
	},
	
	diviner : {
		name	: "Diviner",
		tier	: "tier1",
		promoteTo : [ "exorcist", "basara" ],
		base	: new Stat(15, 0, 4, 5, 6, 1, 1, 3),
		growth	: new Stat(0, 5, 15, 10, 10, 5, 0, 10),
		maxStat	: new Stat(35, 17, 22, 20, 23, 19, 16, 20),
	},
	
	exorcist : {
		name	: "Onmyoji",
		tier	: "tier2",
		base	: new Stat(16, 0, 7, 6, 7, 2, 3, 6),
		growth	: new Stat(0, 0, 20, 10, 15, 0, 0, 15),
		maxStat	: new Stat(45, 25, 33, 31, 32, 27, 25, 31),
	},
	
	monk : {
		name	: "Monk",
		tier	: "tier1",
		promoteTo : [ "exorcist", "greatMaster" ],
		base	: new Stat(16, 0, 3, 5, 5, 4, 2, 5),
		growth	: new Stat(0, 5, 10, 10, 15, 15, 0, 20),
		maxStat	: new Stat(35, 18, 21, 20, 22, 23, 17, 24),
	},
	
	miko : {
		name	: "Shrine Maiden",
		tier	: "tier1",
		promoteTo : [ "exorcist", "priestess" ],
		base	: new Stat(16, 0, 3, 5, 5, 4, 2, 5),
		growth	: new Stat(0, 5, 10, 10, 15, 15, 0, 20),
		maxStat	: new Stat(35, 18, 21, 20, 22, 23, 17, 24),
	},
	
	greatMaster : {
		name	: "Great Master",
		tier	: "tier2",
		base	: new Stat(19, 8, 6, 6, 8, 5, 6, 7),
		growth	: new Stat(10, 15, 5, 5, 15, 15, 10, 10),
		maxStat	: new Stat(55, 32, 30, 31, 33, 32, 28, 32),
	},
	
	priestess : {
		name	: "Priestess",
		tier	: "tier2",
		base	: new Stat(19, 6, 7, 6, 9, 5, 5, 8),
		growth	: new Stat(10, 10, 10, 5, 15, 15, 0, 20),
		maxStat	: new Stat(50, 29, 32, 30, 33, 34, 26, 34),
	},
	
	pegKnight : {
		name	: "Sky Knight",
		tier	: "tier1",
		promoteTo : [ "falcoKnight", "kinshiKnight" ],
		base	: new Stat(16, 3, 0, 5, 7, 4, 2, 6),
		growth	: new Stat(0, 10, 0, 10, 15, 20, 0, 20),
		maxStat	: new Stat(35, 19, 16, 21, 23, 25, 18, 25),
	},
	
	falcoKnight : {
		name	: "Falcon Knight",
		tier	: "tier2",
		base	: new Stat(18, 5, 4, 6, 10, 5, 5, 9),
		growth	: new Stat(0, 10, 10, 10, 15, 20, 0, 20),
		maxStat	: new Stat(55, 28, 27, 30, 34, 35, 27, 35),
	},
	
	kinshiKnight : {
		name	: "Kinshi Knight",
		tier	: "tier2",
		base	: new Stat(17, 4, 1, 9, 8, 5, 4, 7),
		growth	: new Stat(0, 5, 0, 15, 15, 15, 0, 15),
		maxStat	: new Stat(50, 27, 26, 33, 31, 34, 25, 31),
	},
	
	archer : {
		name	: "Archer",
		tier	: "tier1",
		promoteTo : [ "sniper", "kinshiKnight" ],
		base	: new Stat(17, 5, 0, 7, 5, 2, 4, 1),
		growth	: new Stat(10, 15, 0, 15, 15, 5, 10, 0),
		maxStat	: new Stat(40, 21, 15, 23, 21, 20, 20, 17),
	},
	
	sniper : {
		name	: "Sniper",
		tier	: "tier2",
		base	: new Stat(19, 7, 0, 10, 9, 3, 6, 2),
		growth	: new Stat(10, 15, 0, 20, 15, 5, 10, 0),
		maxStat	: new Stat(55, 31, 25, 35, 33, 30, 31, 28),
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
	
	kitsune : {
		name	: "Kitsune",
		tier	: "tier1",
		promoteTo : [ "nineTails" ],
		base	: new Stat(16, 5, 1, 6, 8, 4, 1, 4),
		growth	: new Stat(10, 10, 0, 15, 20, 10, 0, 20),
		maxStat	: new Stat(40, 20, 18, 23, 24, 24, 18, 23),
	},

	nineTails : {
		name	: "Nine-Tails",
		tier	: "tier2",
		base	: new Stat(19, 6, 2, 9, 10, 5, 2, 8),
		growth	: new Stat(10, 10, 0, 15, 20, 10, 0, 20),
		maxStat	: new Stat(55, 29, 29, 33, 34, 33, 27, 34),
	},
	
	cavalier : {
		name	: "Cavalier",
		tier	: "tier1",
		promoteTo : [ "paladin", "greatKnight" ],
		base	: new Stat(17, 6, 0, 5, 5, 3, 5, 3),
		growth	: new Stat(10, 15, 0, 10, 10, 15, 10, 5),
		maxStat	: new Stat(40, 22, 15, 21, 20, 24, 22, 21),
	},
	
	paladin : {
		name	: "Paladin",
		tier	: "tier2",
		base	: new Stat(19, 8, 1, 7, 7, 4, 7, 6),
		growth	: new Stat(10, 15, 0, 10, 10, 15, 10, 10),
		maxStat	: new Stat(60, 31, 26, 30, 30, 32, 32, 32),
	},
	
	greatKnight : {
		name	: "Great Knight",
		tier	: "tier2",
		base	: new Stat(21, 10, 0, 6, 6, 3, 10, 2),
		growth	: new Stat(20, 20, 0, 10, 5, 5, 20, 0),
		maxStat	: new Stat(65, 35, 25, 29, 27, 28, 37, 28),
	},
	
	knight : {
		name	: "Knight",
		tier	: "tier1",
		promoteTo : [ "greatKnight", "general" ],
		base	: new Stat(19, 8, 0, 5, 3, 3, 8, 1),
		growth	: new Stat(20, 20, 0, 15, 5, 10, 20, 0),
		maxStat	: new Stat(45, 24, 15, 22, 17, 22, 26, 18),
	},
	
	general : {
		name	: "General",
		tier	: "tier2",
		base	: new Stat(22, 11, 0, 7, 3, 4, 12, 3),
		growth	: new Stat(25, 20, 0, 15, 0, 10, 20, 5),
		maxStat	: new Stat(70, 38, 25, 32, 25, 32, 40, 30),
	},
	
	fighter : {
		name	: "Fighter",
		tier	: "tier1",
		promoteTo : [ "berserker", "hero" ],
		base	: new Stat(19, 7, 0, 6, 6, 2, 4, 1),
		growth	: new Stat(20, 20, 0, 15, 15, 5, 5, 0),
		maxStat	: new Stat(45, 25, 15, 23, 22, 21, 19, 18),
	},
	
	berserker : {
		name	: "Berserker",
		tier	: "tier2",
		base	: new Stat(24, 12, 0, 8, 9, 0, 5, 0),
		growth	: new Stat(30, 25, 0, 15, 15, 0, 0, 0),
		maxStat	: new Stat(70, 40, 25, 32, 33, 25, 27, 25),
	},
	
	mercenary : {
		name	: "Mercenary",
		tier	: "tier1",
		promoteTo : [ "hero", "bowKnight" ],
		base	: new Stat(17, 5, 0, 7, 6, 2, 5, 2),
		growth	: new Stat(10, 15, 0, 20, 15, 5, 10, 5),
		maxStat	: new Stat(40, 22, 15, 24, 22, 20, 21, 19),
	},
	
	hero : {
		name	: "Hero",
		tier	: "tier2",
		base	: new Stat(20, 8, 0, 10, 8, 3, 7, 2),
		growth	: new Stat(20, 15, 0, 20, 15, 5, 10, 0),
		maxStat	: new Stat(60, 32, 25, 35, 32, 31, 30, 27),
	},
	
	bowKnight : {
		name	: "Bow Knight",
		tier	: "tier2",
		base	: new Stat(18, 6, 0, 8, 9, 3, 5, 6),
		growth	: new Stat(10, 10, 0, 15, 15, 10, 0, 10),
		maxStat	: new Stat(55, 29, 25, 32, 33, 30, 27, 32),
	},
	
	outlaw : {
		name	: "Outlaw",
		tier	: "tier1",
		promoteTo : [ "bowKnight", "adventurer" ],
		base	: new Stat(16, 3, 1, 4, 8, 1, 2, 4),
		growth	: new Stat(0, 10, 5, 10, 20, 0, 0, 20),
		maxStat	: new Stat(35, 19, 18, 20, 24, 18, 17, 22),
	},
	
	adventurer : {
		name	: "Adventurer",
		tier	: "tier2",
		base	: new Stat(17, 4, 6, 6, 10, 2, 3, 8),
		growth	: new Stat(0, 5, 15, 5, 20, 0, 0, 20),
		maxStat	: new Stat(50, 27, 31, 27, 34, 27, 25, 34),
	},
	
	wyvernRider : {
		name	: "Wyvern Rider",
		tier	: "tier1",
		promoteTo : [ "wyvernLord", "maligKnight" ],
		base	: new Stat(17, 6, 0, 5, 4, 2, 7, 0),
		growth	: new Stat(10, 15, 5, 10, 10, 5, 20, 0),
		maxStat	: new Stat(40, 22, 17, 21, 20, 19, 24, 15),
	},
	
	wyvernLord : {
		name	: "Wyvern Lord",
		tier	: "tier2",
		base	: new Stat(19, 8, 0, 9, 6, 3, 10, 1),
		growth	: new Stat(10, 15, 0, 15, 10, 5, 20, 0),
		maxStat	: new Stat(60, 33, 25, 33, 29, 28, 35, 26),
	},
	
	maligKnight : {
		name	: "Malig Knight",
		tier	: "tier2",
		base	: new Stat(18, 7, 6, 6, 5, 0, 8, 6),
		growth	: new Stat(0, 15, 15, 10, 5, 0, 10, 15),
		maxStat	: new Stat(55, 31, 30, 28, 27, 25, 31, 31),
	},
	
	mage : {
		name	: "Dark Mage",
		tier	: "tier1",
		promoteTo : [ "sorcerer", "darkKnight" ],
		base	: new Stat(16, 0, 6, 3, 3, 1, 3, 5),
		growth	: new Stat(0, 10, 20, 0, 10, 0, 5, 10),
		maxStat	: new Stat(35, 19, 24, 16, 19, 18, 19, 22),
	},
	
	sorcerer : {
		name	: "Sorcerer",
		tier	: "tier2",
		base	: new Stat(17, 0, 9, 4, 6, 1, 5, 8),
		growth	: new Stat(0, 0, 25, 0, 10, 0, 5, 15),
		maxStat	: new Stat(50, 25, 35, 26, 29, 26, 29, 33),
	},
	
	darkKnight : {
		name	: "Dark Knight",
		tier	: "tier2",
		base	: new Stat(19, 8, 6, 6, 5, 3, 8, 6),
		growth	: new Stat(15, 20, 10, 5, 5, 5, 15, 5),
		maxStat	: new Stat(55, 32, 31, 28, 27, 31, 34, 30),
	},
	
	troubadour : {
		name	: "Troubadour",
		tier	: "tier1",
		promoteTo : [ "strategist", "maid" ],
		base	: new Stat(15, 0, 3, 7, 5, 4, 1, 4),
		growth	: new Stat(0, 0, 10, 20, 10, 15, 0, 15),
		maxStat	: new Stat(35, 16, 19, 24, 20, 23, 16, 21),
	},
	
	strategist : {
		name	: "Strategist",
		tier	: "tier2",
		base	: new Stat(16, 0, 7, 6, 7, 5, 2, 7),
		growth	: new Stat(0, 0, 15, 5, 10, 20, 0, 15),
		maxStat	: new Stat(45, 25, 33, 28, 31, 33, 25, 32),
	},
	
	maid : {
		name	: "Maid/Butler",
		tier	: "tier2",
		base	: new Stat(18, 4, 5, 9, 8, 4, 5, 4),
		growth	: new Stat(0, 10, 10, 15, 15, 10, 5, 10),
		maxStat	: new Stat(50, 28, 31, 33, 33, 32, 29, 29),
	},
	
	wolfskin : {
		name	: "Wolfskin",
		tier	: "tier1",
		promoteTo : [ "wolfssegner" ],
		base	: new Stat(19, 8, 0, 4, 6, 0, 4, 0),
		growth	: new Stat(20, 20, 0, 5, 15, 5, 10, 0),
		maxStat	: new Stat(45, 24, 15, 18, 22, 17, 21, 15),
	},
	
	wolfssegner : {
		name	: "Wolfssegner",
		tier	: "tier2",
		base	: new Stat(22, 11, 0, 6, 7, 1, 7, 1),
		growth	: new Stat(20, 20, 0, 5, 15, 5, 10, 0),
		maxStat	: new Stat(65, 36, 25, 29, 31, 26, 32, 26),
	},

	singer : {
		name	: "Songstress",
		tier	: "special",
		base	: new Stat(16, 3, 0, 6, 5, 3, 2, 3),
		growth	: new Stat(0, 10, 0, 20, 20, 20, 0, 0),
		maxStat	: new Stat(45, 28, 27, 31, 31, 35, 27, 28),
	},
	
	darkFalcon : {
		name	: "Dark Falcon",
		tier	: "special",
		base	: new Stat(17, 4, 7, 5, 9, 4, 3, 9),
		growth	: new Stat(0, 10, 15, 5, 15, 15, 0, 20),
		maxStat	: new Stat(45, 27, 32, 28, 33, 32, 26, 34),
		special	: true,
	},
	
	dreadFighter : {
		name	: "Dread Fighter",
		tier	: "special",
		base	: new Stat(19, 8, 3, 6, 8, 1, 6, 9),
		growth	: new Stat(15, 15, 5, 5, 15, 0, 5, 20),
		maxStat	: new Stat(55, 32, 28, 29, 31, 26, 29, 34),
	},
	
	lodestar : {
		name	: "Lodestar",
		tier	: "special",
		base	: new Stat(19, 7, 0, 10, 9, 7, 7, 2),
		growth	: new Stat(15, 10, 0, 20, 10, 25, 5, 5),
		maxStat	: new Stat(60, 29, 26, 35, 33, 40, 30, 29),
	},
	
	greatLord : {
		name	: "Great Lord",
		tier	: "special",
		base	: new Stat(18, 8, 1, 8, 9, 5, 7, 3),
		growth	: new Stat(15, 15, 0, 10, 10, 15, 10, 5),
		maxStat	: new Stat(60, 30, 25, 32, 34, 35, 29, 31),
	},
	
	vanguard : {
		name	: "Vanguard",
		tier	: "special",
		base	: new Stat(21, 10, 0, 6, 7, 3, 9, 1),
		growth	: new Stat(20, 20, 0, 5, 5, 10, 15, 0),
		maxStat	: new Stat(65, 36, 25, 29, 30, 30, 32, 27),
	},
	
	grandmaster : {
		name	: "Grandmaster",
		tier	: "special",
		base	: new Stat(18, 7, 6, 8, 7, 2, 6, 8),
		growth	: new Stat(10, 15, 15, 15, 5, 0, 5, 15),
		maxStat	: new Stat(55, 31, 33, 33, 29, 26, 28, 33),
	},

	witch : {
		name	: "Witch",
		tier	: "special",
		base	: new Stat(17, 0, 10, 5, 9, 3, 4, 5),
		growth	: new Stat(5, 0, 25, 5, 20, 5, 0, 10),
		maxStat	: new Stat(50, 25, 36, 27, 34, 28, 26, 29),
	},
	
	ballistician : {
		name	: "Ballistician",
		tier	: "special",
		base	: new Stat(18, 10, 0, 7, 2, 4, 3, 1),
		growth	: new Stat(5, 25, 0, 15, 0, 10, 5, 5),
		maxStat	: new Stat(50, 39, 25, 31, 25, 32, 27, 26),
	},
}

var CharacterSet = {
	
	kamui : {
		name	: "Corrin",
		baseClass : ClassSet.nohrPrince,
		base	: {
			standard : {}
		},
		growth	: {},
		cap		: {},
		
		baseMod	: {
			none : new Stat(19, 7, 4, 7, 6, 5, 6, 2, 5),
			boon : new Stat(3, 2, 3, 3, 2, 3, 1, 1),
			bane : new Stat(-2, -1, -2, -2, -1, -2, -1, -1),
		},
		
		growthMod : {
			none : new Stat(45, 45, 30, 40, 45, 45, 35, 25),
			boon : {
				HP	: new Stat(15, 0, 0, 0, 0, 0, 5, 5),
				Str	: new Stat(0, 15, 0, 5, 0, 0, 5, 0),
				Mag	: new Stat(0, 0, 20, 0, 5, 0, 0, 5),
				Skl	: new Stat(0, 5, 0, 25, 0, 0, 5, 0),
				Spd	: new Stat(0, 0, 0, 5, 15, 5, 0, 0),
				Lck	: new Stat(0, 5, 5, 0, 0, 25, 0, 0),
				Def	: new Stat(0, 0, 0, 0, 0, 5, 10, 5),
				Res	: new Stat(0, 0, 5, 0, 5, 0, 0, 10),
			},
			bane : {
				HP	: new Stat(-10, 0, 0, 0, 0, 0, -5, -5),
				Str	: new Stat(0, -10, 0, -5, 0, 0, -5, 0),
				Mag	: new Stat(0, 0, -15, 0, -5, 0, 0, -5),
				Skl	: new Stat(0, -5, 0, -20, 0, 0, -5, 0),
				Spd	: new Stat(0, 0, 0, -5, -10, -5, 0, 0),
				Lck	: new Stat(0, -5, -5, 0, 0, -20, 0, 0),
				Def	: new Stat(0, 0, 0, 0, 0, -5, -10, -5),
				Res	: new Stat(0, 0, -5, 0, -5, 0, 0, -10),
			},
		},
		
		capMod : {
			boon : {
				HP	: new Stat(0, 1, 1, 0, 0, 2, 2, 2),
				Str	: new Stat(0, 4, 0, 2, 0, 0, 2, 0),
				Mag	: new Stat(0, 0, 4, 0, 2, 0, 0, 2),
				Skl	: new Stat(0, 2, 0, 4, 0, 0, 2, 0),
				Spd	: new Stat(0, 0, 0, 2, 4, 2, 0, 0),
				Lck	: new Stat(0, 2, 2, 0, 0, 4, 0, 0),
				Def	: new Stat(0, 0, 0, 0, 0, 2, 4, 2),
				Res	: new Stat(0, 0, 2, 0, 2, 0, 0, 4),
			},
			bane : {
				HP	: new Stat(0, -1, -1, 0, 0, -1, -1, -1),
				Str	: new Stat(0, -3, 0, -1, 0, 0, -1, 0),
				Mag	: new Stat(0, 0, -3, 0, -1, 0, 0, -1),
				Skl	: new Stat(0, -1, 0, -3, 0, 0, -1, 0),
				Spd	: new Stat(0, 0, 0, -1, -3, -1, 0, 0),
				Lck	: new Stat(0, -1, -1, 0, 0, -3, 0, 0),
				Def	: new Stat(0, 0, 0, 0, 0, -1, -3, -1),
				Res	: new Stat(0, 0, -1, 0, -1, 0, 0, -3),
			},
		},
		
		initialize : function(boon, bane) {
			var keySet = new Stat(0, 0, 0, 0, 0, 0, 0, 0);
			this.base.standard.level = 1;
			this.base.standard.stat = {};
			for (var attr in keySet) {
				if (attr == boon)
					this.base.standard.stat[attr] = this.baseMod.none[attr] + this.baseMod.boon[attr];
				else if (attr == bane)
					this.base.standard.stat[attr] = this.baseMod.none[attr] + this.baseMod.bane[attr];
				else
					this.base.standard.stat[attr] = this.baseMod.none[attr];
				this.growth[attr] = this.growthMod.none[attr] + this.growthMod.boon[boon][attr] + this.growthMod.bane[bane][attr];
				this.cap[attr] = this.capMod.boon[boon][attr] + this.capMod.bane[bane][attr];
			}
		},
	},

	azura : {
		name	: "Azura",
		baseClass : ClassSet.singer,
		base : {
			standard : new BaseStat(1, 16, 5, 2, 8, 8, 6, 4, 7),
		},
		growth	: new Stat(25, 50, 25, 60, 60, 40, 15, 35),
		cap		: new Stat(0, 0, 0, 1, 3, 0, -3, 0),
	},
	
	kaze : {
		name	: "Kaze",
		baseClass : ClassSet.ninja,
		base: {
			standard : new BaseStat(3, 19, 7, 0, 9, 12, 4, 5, 10),
			conquest : new BaseStat(9, 22, 9, 0, 12, 16, 6, 7, 13),
		},
		growth	: new Stat(55, 40, 0, 45, 65, 20, 20, 35),
		cap		: new Stat(0, -2, 0, 2, 3, -2, -1, 0),
	},
}