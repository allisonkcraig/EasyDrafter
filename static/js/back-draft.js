$(document).ready(function() {
	document.canvasHeight = 2001
	document.canvasWidth = 1546

	document.draftBackCanvas = function(backTableName, scale){
		document.processBackForm(scale);

		// establish drafting table and pen
		document.draftingTableBack = document.getElementById(backTableName);

		var gridPenBack = document.draftingTableBack.getContext("2d");
		gridPenBack.fillStyle="white";
		gridPenBack.beginPath()
		gridPenBack.moveTo(0, 0);
		gridPenBack.fillRect(0,0, document.canvasHeight * 20, document.canvasWidth * 20)
		gridPenBack.stroke();

		gridPenBack = document.draftingTableBack.getContext("2d");


		// y axis grid lines
		for (var x = 0.5; y < 2001; y += document.scale) {
			gridPenBack.beginPath();
			gridPenBack.moveTo(0, y);
			gridPenBack.lineTo(2001, y);
			gridPenBack.strokeStyle = "#E8E8EE";
			gridPenBack.stroke();
			};


		// x axis grid lines
		for (var x = 0.5; x < 2001; x += document.scale) {
			gridPenBack.beginPath();
			gridPenBack.strokeStyle = "#E8E8EE";
			gridPenBack.moveTo(x, 0);
			gridPenBack.lineTo(x, 2001);
			gridPenBack.stroke();
			};


		// START TEMPORARY LINES ////////////////////////////////////////////////////////
		// set up pen and set colors for temporary lines
		var penBack = document.draftingTableBack.getContext("2d");
		penBack.fillStyle = "#83AF9B";
		penBack.strokeStyle = "#EA8C86";


		// draw lines and dots ***********************************************************
		penBack.beginPath();
		penBack.moveTo(0, 0);


		//FULL LENGTH ***********************************************************
		penBack.lineTo(0, (document.scaledfullLengthBack)); // a to b
		penBack.moveTo(0, (((document.fullLengthBack - document.centerBack) - 0.375)*document.scale)); // move to neckline
		penBack.lineTo(80, (((document.fullLengthBack - document.centerBack) - 0.375)*document.scale)); // d squared off


		// ACROSS SHOULDER *******************************************************
		penBack.moveTo(0, 0);
		penBack.lineTo((document.scaledBackAcrossShoulder), 0); // a to c
		penBack.lineTo((document.scaledBackAcrossShoulder), 5 * scale); // square off c


		// BACK ARC **************************************************************
		penBack.moveTo(0, (document.scaledfullLengthBack)); 
		penBack.lineTo(document.scaledBackArc, (document.scaledfullLengthBack)); // b to e
		penBack.lineTo(document.scaledBackArc, 3 * scale); // square up from e
		penBack.moveTo(document.scaledDartPlacement, (document.scaledfullLengthBack)); 


		// SLOPE *********************************************************
		penBack.moveTo(0, document.scaledfullLengthBack); 
		penBack.lineTo(document.scaledBackAcrossShoulder, document.scaledOffset); // b to g


		// SHOULDER DART ***************************************************************
		penBack.fillRect(document.shoulderDartXScaled + document.scaledBackNeck , document.shoulderDartYScaled, 3, 3); // center of shoulder dart
		penBack.moveTo(document.shoulderDartXScaled+ document.scaledBackNeck, document.shoulderDartYScaled);
		penBack.lineTo((document.dartPlacement + (document.backDartIntake / 2))  * document.scale, (document.scaledfullLengthBack - (document.sideLength * document.scale))); // point 0
		// Second Dart Leg
		penBack.moveTo(document.shoulderDartLeg1XScaled + document.scaledBackNeck, document.shoulderDartLeg1YScaled);
		penBack.lineTo(document.offsetShoulderDartApexX, document.offsetShoulderDartApexY);
		penBack.lineTo(document.shoulderDartLeg2XScaled + document.scaledBackNeck, document.shoulderDartLeg2YScaled);


		// SHOULDER SEAM ***************************************************
		penBack.moveTo(document.scaledBackNeck, 0); // point f
		penBack.lineTo(document.pointHXScaled, document.pointHYScaled); // point h


		// apply stroke to lines
		penBack.stroke();





		// START FINAL LINES ////////////////////////////////////////////////////////
		var penFinalBack = document.draftingTableBack.getContext("2d");
		penFinalBack.fillStyle= "black";
		penFinalBack.strokeStyle = "black";


		// instantiate lines and dots
		penFinalBack.beginPath();


		// CENTERFRONT ***************************************************
		penFinalBack.moveTo(0.5, document.scaledFullLength); // b
		penFinalBack.lineTo(0.5, (((document.fullLengthBack - document.centerBack) -0.375) * document.scale)); // move to neckline, ofset half a pixel so it shows on the canvas better


		// SHOULDER SEAM ***************************************************
		penFinalBack.moveTo(document.scaledBackNeck, 0);
		penFinalBack.lineTo(document.shoulderDartLeg1XScaled + document.scaledBackNeck, document.shoulderDartLeg1YScaled);
		penFinalBack.lineTo(document.offsetShoulderDartApexX, document.offsetShoulderDartApexY);
		penFinalBack.lineTo(document.shoulderDartLeg2XScaled + document.scaledBackNeck, document.shoulderDartLeg2YScaled);
		penFinalBack.lineTo(document.pointHXScaled, document.pointHYScaled);


		// ARMHOLE ***************************************************************
		document.bArmControlX = (document.acrossBack * 0.725) * document.scale;
		document.bArmControlY = ((document.offSetSideSeamRiseScaled / document.scale) / 1.086) * document.scale;
		penFinalBack.moveTo(document.pointHXScaled, document.pointHYScaled); //starting point of curve
		penFinalBack.quadraticCurveTo(document.bArmControlX ,document.bArmControlY ,(document.backArc * document.scale), document.offSetSideSeamRiseScaled); // needs to be calibrated


		// NECKLINE ***************************************************************
		document.bNeckControlX = document.scaledBackNeck;
		document.bNeckControlY = (((document.fullLengthBack - document.centerBack) - 0.375)*document.scale);
		penFinalBack.moveTo(document.scaledBackNeck, 0); //starting point of curve
		penFinalBack.quadraticCurveTo(document.bNeckControlX ,document.bNeckControlY ,(document.scaledBackNeck / 2), (((document.fullLengthBack - document.centerBack) - 0.375)*document.scale)); // needs to be calibrated
		penFinalBack.lineTo(0, (((document.fullLengthBack - document.centerBack) - 0.375)*document.scale));


		// WAIST DART LEGS ***************************************************************
		penFinalBack.moveTo(0, document.scaledfullLengthBack);
		penFinalBack.lineTo(document.dartPlacement * document.scale, document.scaledfullLengthBack + (0.125 * document.scale)); // line to i
		penFinalBack.lineTo((document.dartPlacement + (document.backDartIntake / 2))  * document.scale, (document.scaledfullLengthBack - (document.sideLength * document.scale))); // point 0
		penFinalBack.lineTo((document.dartPlacement + document.backDartIntake)  * document.scale, document.scaledfullLengthBack + (0.125 * document.scale)); // point k


		// WAIST ARC *********************************************************************
		penFinalBack.moveTo((document.dartPlacement + document.backDartIntake)  * document.scale, document.scaledfullLengthBack + (0.125 * document.scale)); // point k
		penFinalBack.lineTo(((document.waistArcBack + document.backDartIntake + 0.24) * document.scale) , (document.scaledfullLengthBack + (0.1875 * document.scale))); // point m - waist arc with dart and ease


		//SIDE SEAM
		penFinalBack.lineTo((document.backArc * document.scale), document.offSetSideSeamRiseScaled); // point n



		// apply stroke to lines
		penFinalBack.stroke();

	}




	$('.update-button').blur(function() {
		document.clearCanvas(document.gridPenBack);
		document.clearCanvas(penBack);
		document.clearCanvas(penFinalBack);
		document.draftBackCanvas("drafting-table-back", 20);
	});

});