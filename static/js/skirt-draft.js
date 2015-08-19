$(document).ready(function() {


	document.determineDartIntakeSkirt =  function(waist, hip){
		var difference = hip - waist
		if (difference > 12) {

		} else if (difference > 11) {
			document.frontDartIntake = 0.625;
			document.backDartIntake = 1.375;
			document.frontNumOfDarts = 2;
			document.backNumOfDarts = 2;
		} else if (difference > 10) {
			document.frontDartIntake = 0.625;
			document.backDartIntake = 1.25;
			document.frontNumOfDarts = 2;
			document.backNumOfDarts = 2;
		} else if (difference > 9) {
			document.frontDartIntake = 0.5;
			document.backDartIntake = 1;
			document.frontNumOfDarts = 2;
			document.backNumOfDarts = 2;
		} else if (difference > 7) {
			document.frontDartIntake = 0.375;
			document.backDartIntake = 0.875;
			document.frontNumOfDarts = 2;
			document.backNumOfDarts = 2;
		} else if (difference > 6) {
			document.frontDartIntake = 0.5;
			document.backDartIntake = 0.75;
			document.frontNumOfDarts = 1;
			document.backNumOfDarts = 2;
		} else if (difference > 5) {
			document.frontDartIntake = 0.5;
			document.backDartIntake = 0.625;
			document.frontNumOfDarts = 1;
			document.backNumOfDarts = 2;
		} else if (difference > 4) {
			document.frontDartIntake = 0.5;
			document.backDartIntake = 1;
			document.frontNumOfDarts = 1;
			document.backNumOfDarts = 1;
		} else if (difference > 3) {
			document.frontDartIntake = 0.5;
			document.backDartIntake = 0.75;
			document.frontNumOfDarts = 1;
			document.backNumOfDarts = 1;
		}

	

	}


	document.waist = 26;
	document.hip = 37.5;
	document.waitToKnee = 40;
	document.centerFrontHipDepth = 9;
	document.backHipArc = 9.5;
	document.centerBackHipDepth = 8.75;
	document.frontHipArch = 9;
	document.determineDartIntakeSkirt(document.waist, document.hip);



	document.canvasHeight = 2001;
	document.canvasWidth = 1546;

	document.draftSkirtCanvas = function(frontTableName, scale){
		document.scale = scale
		document.offsetFromTop = 2 * document.scale // allows for room at top of draft for hip details
		console.log("draftSkirtCanvas")

		// take in an object that that will be the way you store the data
		// establish drafting table and document.pen
		document.draftingTableFront = document.getElementById(frontTableName);

		document.pen = document.draftingTableFront.getContext("2d");
		document.pen.fillStyle="white";
		document.pen.beginPath()
		document.pen.moveTo(0, 0);
		document.pen.fillRect(0,0, document.canvasHeight * 20, document.canvasWidth * 20)
		document.pen.stroke();

		

		document.gridPenFront = document.draftingTableFront.getContext("2d");

		// y axis grid lines
		for (var y = 0.5; y < document.canvasHeight; y += document.scale) {
			document.gridPenFront.beginPath();
			document.gridPenFront.moveTo(0, y);
			document.gridPenFront.lineTo(2001, y);
			document.gridPenFront.strokeStyle = "#E8E8EE";
			document.gridPenFront.stroke();
			};

		// x axis grid lines
		for (var x = 0.5; x < document.canvasWidth; x += document.scale) {
			document.gridPenFront.beginPath();
			document.gridPenFront.strokeStyle = "#E8E8EE";
			document.gridPenFront.moveTo(x, 0);
			document.gridPenFront.lineTo(x, 2001);
			document.gridPenFront.stroke();
			};


		// START TEMPORARY LINES ////////////////////////////////////////////////////////
		// set up pen and set colors for temporary line

		// document.pen = document.draftingTableFront.getContext("2d");
		// document.pen.fillStyle="#83AF9B";
		// document.pen.strokeStyle = "#EA8C86";


		// // draw lines and dots
		// document.pen.beginPath()
		// document.pen.moveTo(0, document.offsetFromTop);
		// document.pen



		//full length



	$(".update-button").blur(function() {
		document.clearCanvas(document.gridPenFront);
		document.clearCanvas(document.pen);
		document.clearCanvas(document.penFinalFront);
		document.draftFrontCanvas("drafting-table-skirt", 20);
	});

});

