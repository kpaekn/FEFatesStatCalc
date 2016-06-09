$(document).ready(function() {
	var calc = new StatCalculator();
	
	for (var unit in CharacterSet) {
		$("#unit-select").append($('<option>', {
			value 	: unit,
			html	: CharacterSet[unit].name,
		}))
	}
	
	$("#unit-select").change(function() {
		var val = $("#unit-select").val();
		if (val) {
			calc.setCharacter(val);
			var list = calc.compute();
			console.log(list);
			updateTable(list);
		}
	});
	
	function updateTable(levelList) {
		$("#table-div").empty();
		if (levelList.length > 0) {
			var table = $("<table></table>");
			
			// Headings
			table.append($("<th></th>").text("Level"));
			for (var attr in levelList[0].stat)
				table.append($("<th></th>").text(attr));
			
			// Data
			for (var i=0; i<levelList.length; i++) {
				var row = $("<tr></tr>");
				row.append($("<td></td>").text(levelList[i].displayedLevel));
				for (var attr in levelList[i].stat) {
					var val = levelList[i].stat[attr];
					var cell;
					if (val >= levelList[i].unitClass.maxStat[attr]) {
						val = levelList[i].unitClass.maxStat[attr];
						cell = $("<td></td>").text(val.toFixed(0)).css({ 'font-weight': 'bold' });
					}else
						cell = $("<td></td>").text(val);
					row.append(cell);
				}
				table.append(row);
			}
			
			$("#table-div").append(table);
		}
	}
});

