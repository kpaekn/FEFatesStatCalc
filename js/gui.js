var calc = new StatCalculator();

$(document).ready(function() {
	
	calc = new StatCalculator();
	
	for (var unit in CharacterSet) {
		$("#unit-select").append($('<option>', {
			value 	: unit,
			text	: CharacterSet[unit].name,
		}))
	}
	
	$("#unit-select").change(function() {
		var val = $("#unit-select").val();
		if (val) {
			calc.setCharacter(val);
			updateTable();
		}
		populateLevelSelect();
	});
	
	function populateLevelSelect() {
		var selectLevel = $("#level-change-select").prop("disabled", false).empty();
		var levelRange = calc.getAvailableLevelRange();
		for (var i=0; i<levelRange.length; i++)
			selectLevel.append($("<option>").text(levelRange[i]));
	}
	
	$("#level-change-select").change(function() {
		var classSelect = $("#class-change-select").prop("disabled", false).empty();
		var classSet = calc.getAvaiableClassChange(this.value);
		
		if (classSet.masterSeal) {
			classSelect.append($("<option/>").text("---Master Seal---").prop("disabled", true));
			for (var c in classSet.masterSeal)
				classSelect.append($("<option/>", {
					text	: ClassSet[c].name,
					value	: c,
				}))
		}
		
		classSelect.append($("<option/>").text("---Heart Seal---").prop("disabled", true));
			for (var c in classSet.heartSeal)
				classSelect.append($("<option/>", {
					text	: ClassSet[c].name,
					value	: c,
				}))
				
		classSelect.append($("<option/>").text("---Special Seal---").prop("disabled", true));
			for (var c in classSet.specialSeal)
				classSelect.append($("<option/>", {
					text	: ClassSet[c].name,
					value	: c,
				}))
	});
	
	$("#add-seal").click(function(evt) {
		var levelSelect = $("#level-change-select");
		var classSelect = $("#class-change-select");
		calc.addClassChange(levelSelect.val(), classSelect.val());
		updateTable();
		console.log("adding: " + levelSelect.val() + " and " + classSelect.val());
		classSelect.prop("disabled", true).empty();
		populateLevelSelect();
	});
	
	$("#reset").click(function(evt) {
		$("#unit-select").val("none");
		$("#table-div").empty();
		calc.resetClassChange();
	});
	
	function updateTable() {
		var levelList = calc.compute();
		$("#table-div").empty();
		for (var i=0; i<levelList.length; i++) {
			var header = $("<h4/>").text(levelList[i][0].unitClass.name);
			var table = $("<table/>");
			
			// Headings
			table.append($("<th/>").text("Level"));
			for (var attr in levelList[i][0].stat)
				table.append($("<th/>").text(attr));
			
			// Data
			for (var j=0; j<levelList[i].length; j++) {
				var row = $("<tr/>");
				row.append($("<td/>").text(levelList[i][j].displayedLevel));
				for (var attr in levelList[i][j].stat) {
					var val = levelList[i][j].stat[attr];
					var cell;
					if (val >= levelList[i][j].unitClass.maxStat[attr]) {
						val = levelList[i][j].unitClass.maxStat[attr];
						cell = $("<td/>").text(val.toFixed(0)).css({ 'font-weight': 'bold' });
					}else
						cell = $("<td/>").text(val);
					row.append(cell);
				}
				table.append(row);
			}
			// Cap
			table.append($("<th/>").text("Cap"));
			for (var attr in levelList[i][0].unitClass.maxStat)
				table.append($("<th/>").text(levelList[i][0].unitClass.maxStat[attr]));
			
			$("#table-div").append(header);
			$("#table-div").append(table);
		}
	}
});

