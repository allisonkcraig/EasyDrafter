draftSkirtCanvas = function(skirtTableName, scale){

	var scale = scale;
	document.processSkirtForm(scale); // processes skirt measurments from form

	var canvasHeight = 5001;
	var canvasWidth = 5001;

		// take in an object that that will be the way you store the data
		// establish drafting table and pen
		var draftingTable = document.getElementById(skirtTableName);

		var gridpen = draftingTable.getContext("2d");
		gridpen.fillStyle="white";
		gridpen.beginPath()
		gridpen.moveTo(0, 0);
		gridpen.fillRect(0,0, canvasHeight * 100, canvasWidth * 100);
		gridpen.stroke();

		

		gridPen = draftingTable.getContext("2d");

		// y axis grid lines
		for (var y = 0.5; y < canvasHeight * 20; y += scale) {
			gridPen.beginPath();
			gridPen.moveTo(0, y);
			gridPen.lineTo(2001, y);
			gridPen.strokeStyle = "#E8E8EE";
			gridPen.stroke();
		};

		// x axis grid lines
		for (var x = 0.5; x < canvasWidth * 20; x += scale) {
			gridPen.beginPath();
			gridPen.strokeStyle = "#E8E8EE";
			gridPen.moveTo(x, 0);
			gridPen.lineTo(x, 2001);
			gridPen.stroke();
		};


		//START TEMPORARY LINES ////////////////////////////////////////////////////////
		// set up pen and set colors for temporary line

		var pen = draftingTable.getContext("2d");
		pen.fillStyle="#83AF9B";
		pen.strokeStyle = "#EA8C86";


		// draw lines and dots
		pen.beginPath();

		// CENTER DIVIDING LINE
		pen.moveTo(document.backHipArc, document.offsetFromTop + document.waistToKnee);
		pen.lineTo(document.backHipArc, document.offsetFromTop);

		// WAIST LINE
		pen.moveTo(0, document.offsetFromTop - (document.centerFrontHipDepth - document.centerBackHipDepth)); // along point A
		pen.lineTo(document.backHipArc + document.frontHipArc, document.offsetFromTop);

		
		// HIP LINE
		pen.moveTo(0, document.offsetFromTop + document.centerFrontHipDepth);
		pen.lineTo(document.backHipArc + document.frontHipArc, document.offsetFromTop + document.centerFrontHipDepth);
		
		// LABEL FRONT AND BACK
		pen.fillText("FRONT", document.backWaistArc + (document.frontWaistArc/2), 225);
		pen.fillText("BACK", (document.backWaistArc/2), 225);

		pen.stroke();

		// START FINAL LINES ////////////////////////////////////////////////////////
		var penFinal = draftingTable.getContext("2d");
		penFinal.fillStyle= "black";
		penFinal.strokeStyle = "black";
		penFinal.beginPath();

		// CENTER BACK LINE
		penFinal.moveTo(0, document.offsetFromTop - (document.centerFrontHipDepth - document.centerBackHipDepth)); // along point A
		penFinal.lineTo(0, document.offsetFromTop + document.waistToKnee);

		// SKIRT HEM
		penFinal.moveTo(0, document.offsetFromTop + document.waistToKnee);
		penFinal.lineTo(document.backHipArc + document.frontHipArc, document.offsetFromTop + document.waistToKnee);

		// CENTER FRONT LINE
		penFinal.moveTo(document.backHipArc + document.frontHipArc, document.offsetFromTop + document.waistToKnee);
		penFinal.lineTo(document.backHipArc + document.frontHipArc, document.offsetFromTop);

		// CENTER DIVIDING LINE
		penFinal.moveTo(document.backHipArc, document.offsetFromTop + document.waistToKnee);
		penFinal.lineTo(document.backHipArc, document.pointOfHipCurve);

		// FRONT WAIST ARC
		penFinal.moveTo((document.backHipArc + document.frontHipArc) - document.frontWaistArc, document.offsetFromTop - document.hipRise);	
		penFinal.lineTo((document.backHipArc + document.frontHipArc) - document.dartPlacement - document.frontDartIntake - document.spaceBetweenDarts, document.offsetFromTop);

		// BACK HIP CURVE
		var bHipControlx = document.backHipArc; // calculate based on depth of curve
		var bHipControly = document.pointOfHipCurve; // calculate off endpoint y 
		penFinal.moveTo(document.backWaistArc, document.offsetFromTop - document.hipRise);
		penFinal.quadraticCurveTo(bHipControlx ,bHipControly , document.backHipArc, document.pointOfHipCurve);

		// BACK DART LEGS
		penFinal.moveTo(0, document.offsetFromTop - (document.centerFrontHipDepth - document.centerBackHipDepth));
		penFinal.lineTo(document.dartPlacement, document.offsetFromTop - (document.centerFrontHipDepth - document.centerBackHipDepth));
		penFinal.lineTo(document.dartPlacement + (document.backDartIntake/2), document.offsetFromTop + document.backDartLength);	
		penFinal.lineTo(document.dartPlacement + document.backDartIntake, document.offsetFromTop - (document.centerFrontHipDepth - document.centerBackHipDepth) / 1.5);

		if (document.backNumOfDarts == 2) {
			penFinal.lineTo(document.dartPlacement + document.backDartIntake + document.spaceBetweenDarts, document.offsetFromTop - (document.centerFrontHipDepth - document.centerBackHipDepth) / 1.75);
			penFinal.lineTo(document.dartPlacement + (document.backDartIntake *1.5) + document.spaceBetweenDarts, document.offsetFromTop + document.backDartLength);
			penFinal.lineTo(document.dartPlacement + (document.backDartIntake *2) + document.spaceBetweenDarts, document.offsetFromTop - (document.centerFrontHipDepth - document.centerBackHipDepth) / 1.75);
		}
		penFinal.lineTo(document.backWaistArc, document.offsetFromTop - document.hipRise);

		// FRONT HIP CURVE
		var fHipControlx = document.backHipArc; // calculate based on depth of curve
		var fHipControly = document.pointOfHipCurve; // calculate off endpoint y 
		penFinal.moveTo((document.frontHipArc + document.backHipArc) - document.frontWaistArc, document.offsetFromTop - document.hipRise);
		penFinal.quadraticCurveTo(fHipControlx ,fHipControly , (document.frontHipArc + document.backHipArc) - document.frontHipArc, document.pointOfHipCurve);

		// FRONT DART LEGS
		penFinal.moveTo(document.backHipArc + document.frontHipArc, document.offsetFromTop);	
		penFinal.lineTo((document.backHipArc + document.frontHipArc) - document.dartPlacement, document.offsetFromTop);
		penFinal.lineTo((document.backHipArc + document.frontHipArc) - document.dartPlacement - (document.frontDartIntake/2), document.offsetFromTop + document.frontDartLength);
		penFinal.lineTo((document.backHipArc + document.frontHipArc) - document.dartPlacement - document.frontDartIntake, document.offsetFromTop);

		if (document.frontNumOfDarts == 2) {
			penFinal.lineTo((document.backHipArc + document.frontHipArc) - document.dartPlacement - document.spaceBetweenDarts, document.offsetFromTop);
			penFinal.lineTo((document.backHipArc + document.frontHipArc) - document.dartPlacement - (document.frontDartIntake/2) - document.spaceBetweenDarts , document.offsetFromTop + document.frontDartLength);
		}

		penFinal.lineTo((document.backHipArc + document.frontHipArc) - document.dartPlacement - document.frontDartIntake - document.spaceBetweenDarts, document.offsetFromTop);
		

		penFinal.stroke();

		$(".update-button").blur(function() {
			clearCanvas(gridPen);
			clearCanvas(pen);
			clearCanvas(penFinal);
			draftSkirtCanvas("drafting-table-skirt", 20);
		});

	};

