var calc = new StatCalculator();

$(document).ready(function() {
	
	calc = new StatCalculator();
	CharacterSet.kamui.initialize($("#boon-select").val(), $("#bane-select").val());
	$("#avatar-custom").hide();
	resetPanel();
	
	for (var unit in CharacterSet) {
		$("#unit-select").append($('<option>', {
			value 	: unit,
			text	: CharacterSet[unit].name,
		}))
	}
	
	$("#boon-select").change(function() {
		$("option.bane").prop("disabled", false);
		$("select option.bane[value=" + this.value + "]").prop("disabled", true);
		CharacterSet.kamui.initialize($("#boon-select").val(), $("#bane-select").val());
		calc.compute();
		updateTable();
	});
	
	$("#bane-select").change(function() {
		$("option.boon").prop("disabled", false);
		$("select option.boon[value=" + this.value + "]").prop("disabled", true);
		CharacterSet.kamui.initialize($("#boon-select").val(), $("#bane-select").val());
		calc.compute();
		updateTable();
	});
	
	$("#unit-select").change(function() {
		$("#table-div").empty();
		
		if (this.value == "kamui")
				$("#avatar-custom").show();
			else
				$("#avatar-custom").hide();
					
		if (this.value != "none") {
			calc.setCharacter(this.value);
			updateTable();
			resetLeveSelect();
		}else
			resetPanel();
	});
	
	function resetPanel() {
		$("#level-change-select").prop("disabled", true).empty().append($("<option/>").text("Select a level"));
		$("#class-change-select").prop("disabled", true).empty().append($("<option/>").text("Select a class"));
		$("#add-seal").attr("disabled", true);
		$("#reset").attr("disabled", true);
	}
	
	$("#level-change-select").change(function() {
		$("#add-seal").attr("disabled", false);
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
		$("#add-seal").attr("disabled", true);
		$("#reset").attr("disabled", false);
		calc.addClassChange($("#level-change-select").val(), $("#class-change-select").val());
		updateTable();
		resetLeveSelect();
	});
	
	$("#reset").click(function(evt) {
		$("#reset").attr("disabled", true);
		calc.resetClassChange();
		updateTable();
		resetLeveSelect();
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

