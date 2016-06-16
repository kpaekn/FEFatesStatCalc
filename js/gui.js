var calc = new StatCalculator();

$(document).ready(function() {
	
	calc = new StatCalculator();
	db.character.kamui.initialize($("#boon-select").val(), $("#bane-select").val());
	for (var i=1; i<=20; i++)
		$("#extra-select").append($("<option>").val(i*5).text(i + " (+" + i*5 + " levels)"));
	resetPanel();
	
	var unitList = {};
	for (var unit in db.character) {
		if (!unitList[db.character[unit].route])
			unitList[db.character[unit].route] = [];
		unitList[db.character[unit].route].push(unit);
	}
	
	for (var route in unitList) {
		var unitSelect = $("#unit-select");
		unitSelect.append($("<option>").text("---" + route + "---").prop("disabled", true));
		for (var i=0; i<unitList[route].length; i++)
			unitSelect.append($("<option>").val(unitList[route][i]).text(db.character[unitList[route][i]].name));
	}
	
	$("#boon-select").change(function() {
		$("option.bane").prop("disabled", false);
		$("select option.bane[value=" + this.value + "]").prop("disabled", true);
		db.character.kamui.initialize($("#boon-select").val(), $("#bane-select").val());
		updateTable();
	});
	
	$("#bane-select").change(function() {
		$("option.boon").prop("disabled", false);
		$("select option.boon[value=" + this.value + "]").prop("disabled", true);
		db.character.kamui.initialize($("#boon-select").val(), $("#bane-select").val());
		updateTable();
	});
	
	$("#extra-select").change(function() {
		calc.extraLevel = parseInt(this.value);
		calc.resetClassChange();
		resetLeveSelect();
		updateTable();
	});
	
	$("#unit-select").change(function() {
		$("#table-div").empty();
		
		if (this.value == "kamui")
				$("#avatar-custom").show(100);
			else
				$("#avatar-custom").hide(100);
					
		if (this.value != "none") {
			var base = addBaseSelection(this.value);
			calc.setCharacter(this.value, base);
			resetLeveSelect();
			updateTable();
		}else
			resetPanel();
	});
	
	function addBaseSelection(ch) {
		var baseSelection = $("#base-select").empty().prop("disabled", false);
		
		var character = db.character[ch];
		var baseList = [];
		for (var key in character.base)
			baseList.push(key);
		
		for (var i=0; i<baseList.length; i++) {
			baseSelection.append($("<option/>", {
				text	: baseList[i],
				value	: baseList[i],
			}))
		}
		
		// Assume there is at least 1 base
		return baseList[0];
	}
	
	$("#base-select").change(function() {
		$("#reset").attr("disabled", true);
		calc.baseSet = this.value;
		calc.resetClassChange();
		resetLeveSelect();
		updateTable();
	});
	
	function resetPanel() {
		$("#level-change-select").prop("disabled", true).empty().append($("<option/>").text("Select a level"));
		$("#class-change-select").prop("disabled", true).empty().append($("<option/>").text("Select a class"));
		$("#base-select").prop("disabled", true).empty().append($("<option/>").text("Select a base"));
		$("#add-seal").attr("disabled", true);
		$("#reset").attr("disabled", true);
	}
	
	$("#level-change-select").change(function() {
		$("#add-seal").attr("disabled", false);
		var classSelect = $("#class-change-select").prop("disabled", false).empty();
		var classSet = calc.getAvaiableClassChange(this.value);
		
		if (classSet.masterSeal) {
			classSelect.append($("<option/>").text("-----Master Seal-----").prop("disabled", true));
			for (var c in classSet.masterSeal)
				classSelect.append($("<option/>", {
					text	: db.classes[c].name,
					value	: c,
				}))
		}
		
		classSelect.append($("<option/>").text("-----Heart Seal-----").prop("disabled", true));
			for (var c in classSet.heartSeal)
				classSelect.append($("<option/>", {
					text	: db.classes[c].name,
					value	: c,
				}))
				
		classSelect.append($("<option/>").text("---Friendship/Partner Seal---").prop("disabled", true));
			for (var c in classSet.parallelSeal)
				classSelect.append($("<option/>", {
					text	: db.classes[c].name,
					value	: c,
				}))
				
		classSelect.append($("<option/>").text("-----Special Seal-----").prop("disabled", true));
			for (var c in classSet.specialSeal)
				classSelect.append($("<option/>", {
					text	: db.classes[c].name,
					value	: c,
				}))
	});
	
	$("#add-seal").click(function(evt) {
		$("#add-seal").attr("disabled", true);
		$("#reset").attr("disabled", false);
		calc.addClassChange($("#level-change-select").val(), $("#class-change-select").val());
		resetLeveSelect();
		updateTable();
	});
	
	$("#reset").click(function(evt) {
		$("#reset").attr("disabled", true);
		calc.resetClassChange();
		resetLeveSelect();
		updateTable();
	});
	
	function resetLeveSelect() {
		$("#class-change-select").prop("disabled", true).empty().append($("<option/>").text("Select a class"));
		var selectLevel = $("#level-change-select").prop("disabled", false).empty();
		selectLevel.append($("<option>").text("Select a level").val("none").prop("disabled", true));
		if ($("#unit-select").val() != "none") {
			var levelRange = calc.getAvailableLevelRange();
			for (var i=0; i<levelRange.length; i++)
				selectLevel.append($("<option>").text(levelRange[i]));
		}
		selectLevel.val("none");
	}
	
	function updateTable() {
		var levelList = calc.compute();
		$("#table-div").empty();
		
		var table = $("<table/>").addClass("table table-striped table-hover table-condensed").attr("style", "width: 500px");

		// Headings
		var headerRow = $("<tr/>");
		headerRow.append($("<th/>").text("Level"));
		for (var attr in levelList[0][0].stat)
			headerRow.append($("<th/>").text(attr));
		table.append(headerRow);
		
		for (var i=0; i<levelList.length; i++) {
			var header = $("<tr/>").append($("<th/>").text(levelList[i][0].unitClass.name).attr("colspan", 9));
			table.append(header);
			
			// Data
			for (var j=0; j<levelList[i].length; j++) {
				var row = $("<tr/>");
				row.append($("<td/>").text(levelList[i][j].displayedLevel));
				for (var attr in levelList[i][j].stat) {
					var val = levelList[i][j].stat[attr];
					var cell;
					if (val >= levelList[i][j].statCap[attr]) {
						val = levelList[i][j].statCap[attr];
						cell = $("<td/>").text(val.toFixed(0)).css({ 'font-weight': 'bold' });
					}else
						cell = $("<td/>").text(val);
					row.append(cell);
				}
				table.append(row);
			}
			// Cap
			var capRow = $("<tr/>");
			capRow.append($("<th/>").text("Cap"));
			for (var attr in levelList[i][0].statCap)
				capRow.append($("<th/>").text(levelList[i][0].statCap[attr]));
			table.append(capRow);
			
		}
		
		//$("#table-div").append(header);
		$("#table-div").append(table);
	}
});

