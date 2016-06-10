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
		resetLeveSelect();
	});
	
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
		calc.addClassChange($("#level-change-select").val(), $("#class-change-select").val());
		updateTable();
		resetLeveSelect();
	});
	
	function resetLeveSelect() {
		$("#class-change-select").prop("disabled", true).empty().append($("<option/>").text("Select a class"));
		var selectLevel = $("#level-change-select").prop("disabled", false).empty();
		selectLevel.append($("<option>").text("Select a level").prop("disabled", true));
		if ($("#unit-select").val() != "none") {
			var levelRange = calc.getAvailableLevelRange();
			for (var i=0; i<levelRange.length; i++)
				selectLevel.append($("<option>").text(levelRange[i]));
		}
	}
	
	$("#reset").click(function(evt) {
		$("#unit-select").val("none");
		$("#table-div").empty();
		calc.resetClassChange();
		calc.setCharacter("none");
		resetLeveSelect();
	});
	
	function updateTable() {
		var levelList = calc.compute();
		$("#table-div").empty();
		
		var table = $("<table/>").addClass("table table-striped table-hover table-condensed").attr("style", "width: 50%");

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
			var capRow = $("<tr/>");
			capRow.append($("<th/>").text("Cap"));
			for (var attr in levelList[i][0].unitClass.maxStat)
				capRow.append($("<th/>").text(levelList[i][0].unitClass.maxStat[attr]));
			table.append(capRow);
			
		}
		
		//$("#table-div").append(header);
		$("#table-div").append(table);
	}
});

