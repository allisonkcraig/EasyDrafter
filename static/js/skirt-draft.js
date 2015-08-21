$(document).ready(function() {


	document.draftSkirtCanvas = function(skirtTableName, scale){
		document.scale = scale
		document.offsetFromTop = 2 * document.scale // allows for room at top of draft for hip details
		console.log("draftSkirtCanvas")

		document.waistArcEase = 0.25  * document.scale; // constant variable
		document.hipRise = 0.25 * document.scale; // constant variable
		document.backDartLength = 5.5 * document.scale; // constant variable
		document.frontDartLength = 3.5 * document.scale; // constant variable
		document.spaceBetweenDarts = 1.25 * document.scale; // constant variable
		document.hipArcEase = 0.5 * document.scale; //constant variable
		document.waistToKnee = 25 * document.scale;

		document.waist = parseFloat($('form input[name="waist"]').val()) * document.scale; 
		document.hip = parseFloat($('form input[name="hip"]').val()) * document.scale;
		document.centerFrontHipDepth = parseFloat($('form input[name="center-front-hip-depth"]').val()) * document.scale;
		document.backHipArc = (parseFloat($('form input[name="back-hip-arc"]').val()) * document.scale) + document.hipArcEase;
		document.centerBackHipDepth = (parseFloat($('form input[name="center-back-hip-depth"]').val()) * document.scale) + document.hipArcEase;
		document.frontHipArc = parseFloat($('form input[name="front-hip-arc"]').val()) * document.scale;
		document.dartPlacement = parseFloat($('form input[name="dart-placement"]').val()) * document.scale;
		
		document.determineDartIntakeSkirt(document.waist, document.hip);
		document.addToFrontWaistArc = ((document.frontDartIntake * document.frontNumOfDarts) + document.waistArcEase)
		document.addToBackWaistArc = ((document.backDartIntake * document.backNumOfDarts) + document.waistArcEase) 
		document.pointOfHipCurve = ((document.centerFrontHipDepth / 3) * 2) + document.offsetFromTop
		document.frontWaistArc = (6.75 * document.scale) + document.addToFrontWaistArc;
		document.backWaistArc = (6.25 * document.scale) + document.addToBackWaistArc;





	document.canvasHeight = 2001;
	document.canvasWidth = 1546;

		// take in an object that that will be the way you store the data
		// establish drafting table and document.pen
		document.draftingTable = document.getElementById(skirtTableName);

		document.pen = document.draftingTable.getContext("2d");
		document.pen.fillStyle="white";
		document.pen.beginPath()
		document.pen.moveTo(0, 0);
		document.pen.fillRect(0,0, document.canvasHeight * 20, document.canvasWidth * 20)
		document.pen.stroke();

		

		document.gridPen = document.draftingTable.getContext("2d");

		// y axis grid lines
		for (var y = 0.5; y < document.canvasHeight; y += document.scale) {
			document.gridPen.beginPath();
			document.gridPen.moveTo(0, y);
			document.gridPen.lineTo(2001, y);
			document.gridPen.strokeStyle = "#E8E8EE";
			document.gridPen.stroke();
			};

		// x axis grid lines
		for (var x = 0.5; x < document.canvasWidth; x += document.scale) {
			document.gridPen.beginPath();
			document.gridPen.strokeStyle = "#E8E8EE";
			document.gridPen.moveTo(x, 0);
			document.gridPen.lineTo(x, 2001);
			document.gridPen.stroke();
			};


		//START TEMPORARY LINES ////////////////////////////////////////////////////////
		// set up pen and set colors for temporary line

		document.pen = document.draftingTable.getContext("2d");
		document.pen.fillStyle="#83AF9B";
		document.pen.strokeStyle = "#EA8C86";


		// draw lines and dots
		document.pen.beginPath();

		// CENTER DIVIDING LINE
		document.pen.moveTo(document.backHipArc, document.offsetFromTop + document.waistToKnee);
		document.pen.lineTo(document.backHipArc, document.offsetFromTop);

		// WAIST LINE
		document.pen.moveTo(0, document.offsetFromTop - (document.centerFrontHipDepth - document.centerBackHipDepth)); // along point A
		document.pen.lineTo(document.backHipArc + document.frontHipArc, document.offsetFromTop);

		
		// HIP LINE
		document.pen.moveTo(0, document.offsetFromTop + document.centerFrontHipDepth);
		document.pen.lineTo(document.backHipArc + document.frontHipArc, document.offsetFromTop + document.centerFrontHipDepth);
		
		// LABEL FRONT AND BACK
		document.pen.fillText("FRONT", document.backWaistArc + (document.frontWaistArc/2), 225);
		document.pen.fillText("BACK", (document.backWaistArc/2), 225);

		document.pen.stroke();

		// START FINAL LINES ////////////////////////////////////////////////////////
		document.penFinal = document.draftingTable.getContext("2d");
		document.penFinal.fillStyle= "black";
		document.penFinal.strokeStyle = "black";
		document.penFinal.beginPath();

		// CENTER BACK LINE
		document.penFinal.moveTo(0, document.offsetFromTop - (document.centerFrontHipDepth - document.centerBackHipDepth)); // along point A
		document.penFinal.lineTo(0, document.offsetFromTop + document.waistToKnee);

		// SKIRT HEM
		document.penFinal.moveTo(0, document.offsetFromTop + document.waistToKnee);
		document.penFinal.lineTo(document.backHipArc + document.frontHipArc, document.offsetFromTop + document.waistToKnee);

		// CENTER FRONT LINE
		document.penFinal.moveTo(document.backHipArc + document.frontHipArc, document.offsetFromTop + document.waistToKnee);
		document.penFinal.lineTo(document.backHipArc + document.frontHipArc, document.offsetFromTop);

		// CENTER DIVIDING LINE
		document.penFinal.moveTo(document.backHipArc, document.offsetFromTop + document.waistToKnee);
		document.penFinal.lineTo(document.backHipArc, document.pointOfHipCurve);

		// FRONT WAIST ARC
		document.penFinal.moveTo((document.backHipArc + document.frontHipArc) - document.frontWaistArc, document.offsetFromTop - document.hipRise);	
		document.penFinal.lineTo((document.backHipArc + document.frontHipArc) - document.dartPlacement - document.frontDartIntake - document.spaceBetweenDarts, document.offsetFromTop);

		// BACK HIP CURVE
		document.bHipControlx = document.backHipArc / 0.99; // calculate based on depth of curve
		document.bHipControly = document.pointOfHipCurve; // calculate off endpoint y 
		document.penFinal.moveTo(document.backWaistArc, document.offsetFromTop - document.hipRise);
		document.penFinal.quadraticCurveTo(document.bHipControlx ,document.bHipControly , document.backHipArc, document.pointOfHipCurve);

		// BACK DART LEGS
		document.penFinal.moveTo(0, document.offsetFromTop - (document.centerFrontHipDepth - document.centerBackHipDepth));
		document.penFinal.lineTo(document.dartPlacement, document.offsetFromTop - (document.centerFrontHipDepth - document.centerBackHipDepth));
		document.penFinal.lineTo(document.dartPlacement + (document.backDartIntake/2), document.offsetFromTop + document.backDartLength);	
		document.penFinal.lineTo(document.dartPlacement + document.backDartIntake, document.offsetFromTop - (document.centerFrontHipDepth - document.centerBackHipDepth) / 1.5);

		if (document.backNumOfDarts == 2) {
		document.penFinal.lineTo(document.dartPlacement + document.backDartIntake + document.spaceBetweenDarts, document.offsetFromTop - (document.centerFrontHipDepth - document.centerBackHipDepth) / 1.75);
		document.penFinal.lineTo(document.dartPlacement + (document.backDartIntake *1.5) + document.spaceBetweenDarts, document.offsetFromTop + document.backDartLength);
		document.penFinal.lineTo(document.dartPlacement + (document.backDartIntake *2) + document.spaceBetweenDarts, document.offsetFromTop - (document.centerFrontHipDepth - document.centerBackHipDepth) / 1.75);
		}
		document.penFinal.lineTo(document.backWaistArc, document.offsetFromTop - document.hipRise);

		// FRONT HIP CURVE
		document.fHipControlx = document.frontHipArc * 1.1; // calculate based on depth of curve
		document.fHipControly = document.pointOfHipCurve; // calculate off endpoint y 
		document.penFinal.moveTo((document.frontHipArc + document.backHipArc) - document.frontWaistArc, document.offsetFromTop - document.hipRise);
		document.penFinal.quadraticCurveTo(document.fHipControlx ,document.fHipControly , (document.frontHipArc + document.backHipArc) - document.frontHipArc, document.pointOfHipCurve);

		// FRONT DART LEGS
		document.penFinal.moveTo(document.backHipArc + document.frontHipArc, document.offsetFromTop);	
		document.penFinal.lineTo((document.backHipArc + document.frontHipArc) - document.dartPlacement, document.offsetFromTop);
		document.penFinal.lineTo((document.backHipArc + document.frontHipArc) - document.dartPlacement - (document.frontDartIntake/2), document.offsetFromTop + document.frontDartLength);
		document.penFinal.lineTo((document.backHipArc + document.frontHipArc) - document.dartPlacement - document.frontDartIntake, document.offsetFromTop);

		if (document.frontNumOfDarts == 2) {
		document.penFinal.lineTo((document.backHipArc + document.frontHipArc) - document.dartPlacement - document.spaceBetweenDarts, document.offsetFromTop);
		document.penFinal.lineTo((document.backHipArc + document.frontHipArc) - document.dartPlacement - (document.frontDartIntake/2) - document.spaceBetweenDarts , document.offsetFromTop + document.frontDartLength);
		}

		document.penFinal.lineTo((document.backHipArc + document.frontHipArc) - document.dartPlacement - document.frontDartIntake - document.spaceBetweenDarts, document.offsetFromTop);
			

		document.penFinal.stroke();

	$(".update-button").blur(function() {
		document.clearCanvas(document.gridPen);
		document.clearCanvas(document.pen);
		document.clearCanvas(document.penFinal);
		document.draftSkirtCanvas("drafting-table-skirt", 20);
	});

};

})
