$(document).ready(function() {
	
	document.draftBackCanvas = function(){
		document.processBackForm();

		// establish drafting table and pen
		document.draftingTableBack = document.getElementById("drafting-table-back");
		document.gridPenBack = document.draftingTableBack.getContext("2d");


		// y axis grid lines
		for (var y = 0.5; y < 461; y += 20) {
			document.gridPenBack.beginPath();
			document.gridPenBack.moveTo(0, y);
			document.gridPenBack.lineTo(601, y);
			document.gridPenBack.strokeStyle = "#E8E8EE";
			document.gridPenBack.stroke();
			};


		// x axis grid lines
		for (var x = 0.5; x < 601; x += 20) {
			document.gridPenBack.beginPath();
			document.gridPenBack.strokeStyle = "#E8E8EE";
			document.gridPenBack.moveTo(x, 0);
			document.gridPenBack.lineTo(x, 601);
			document.gridPenBack.stroke();
			};


		// START TEMPORARY LINES ////////////////////////////////////////////////////////
		// set up pen and set colors for temporary lines
		document.penBack = document.draftingTableBack.getContext("2d");
		document.penBack.fillStyle = "#83AF9B";
		document.penBack.strokeStyle = "#EA8C86";


		// draw lines and dots ***********************************************************
		document.penBack.beginPath();
		document.penBack.moveTo(0, 0);


		//FULL LENGTH ***********************************************************
		document.penBack.lineTo(0, (document.scaledfullLengthBack)); // a to b
		document.penBack.moveTo(0, (((document.fullLengthBack - document.centerBack) - 0.375)*document.scale)); // move to neckline
		document.penBack.lineTo(80, (((document.fullLengthBack - document.centerBack) - 0.375)*document.scale)); // d squared off


		// ACROSS SHOULDER *******************************************************
		document.penBack.moveTo(0, 0);
		document.penBack.lineTo((document.scaledBackAcrossShoulder), 0); // a to c
		document.penBack.lineTo((document.scaledBackAcrossShoulder), 100); // square off c


		// BACK ARC **************************************************************
		document.penBack.moveTo(0, (document.scaledfullLengthBack)); 
		document.penBack.lineTo(document.scaledBackArc, (document.scaledfullLengthBack)); // b to e
		document.penBack.lineTo(document.scaledBackArc, 60); // square up from e
		document.penBack.moveTo(document.scaledDartPlacement, (document.scaledfullLengthBack)); 


		// SLOPE *********************************************************
		document.penBack.moveTo(0, document.scaledfullLengthBack); 
		document.penBack.lineTo(document.scaledBackAcrossShoulder, document.scaledOffset); // b to g


		// SHOULDER DART ***************************************************************
		document.penBack.fillRect(document.shoulderDartXScaled + document.scaledBackNeck , document.shoulderDartYScaled, 3, 3); // center of shoulder dart
		document.penBack.moveTo(document.shoulderDartXScaled+ document.scaledBackNeck, document.shoulderDartYScaled);
		document.penBack.lineTo((document.dartPlacement + (document.backDartIntake / 2))  * document.scale, (document.scaledfullLengthBack - (document.sideLength * document.scale))); // point 0
			// Second Dart Leg
		document.penBack.moveTo(document.shoulderDartLeg1XScaled + document.scaledBackNeck, document.shoulderDartLeg1YScaled);
		document.penBack.lineTo(document.offsetShoulderDartApexX, document.offsetShoulderDartApexY);
		document.penBack.lineTo(document.shoulderDartLeg2XScaled + document.scaledBackNeck, document.shoulderDartLeg2YScaled);


		// SHOULDER SEAM ***************************************************
		document.penBack.moveTo(document.scaledBackNeck, 0); // point f
		document.penBack.lineTo(document.pointHXScaled, document.pointHYScaled); // point h


		// apply stroke to lines
		document.penBack.stroke();





		// START FINAL LINES ////////////////////////////////////////////////////////
		document.penFinalBack = document.draftingTableBack.getContext("2d");
		document.penFinalBack.fillStyle= "black";
		document.penFinalBack.strokeStyle = "black";


		// instantiate lines and dots
		document.penFinalBack.beginPath();
		document.penFinalBack.moveTo(0, 0);


		// CENTERFRONT ***************************************************
		document.penFinalBack.moveTo(0.5, (document.scaledFullLength), 3, 3); // b
		document.penFinalBack.lineTo(0.5, (((document.fullLengthBack - document.centerBack) -0.375) * document.scale)); // move to neckline, ofset half a pixel so it shows on the canvas better


		// SHOULDER SEAM ***************************************************
		document.penFinalBack.moveTo(document.scaledBackNeck, 0);
		document.penFinalBack.lineTo(document.shoulderDartLeg1XScaled + document.scaledBackNeck, document.shoulderDartLeg1YScaled);
		document.penFinalBack.lineTo(document.offsetShoulderDartApexX, document.offsetShoulderDartApexY);
		document.penFinalBack.lineTo(document.shoulderDartLeg2XScaled + document.scaledBackNeck, document.shoulderDartLeg2YScaled);
		document.penFinalBack.lineTo(document.pointHXScaled, document.pointHYScaled);


		// ARMHOLE ***************************************************************
		document.bArmControlX = (document.acrossBack * 0.725) * document.scale;
		document.bArmControlY = ((document.offSetSideSeamRiseScaled / document.scale) / 0.986) * document.scale;
		document.penFinalBack.moveTo(document.pointHXScaled, document.pointHYScaled); //starting point of curve
		document.penFinalBack.quadraticCurveTo(document.bArmControlX ,document.bArmControlY ,(document.backArc * document.scale), document.offSetSideSeamRiseScaled); // needs to be calibrated


		// NECKLINE ***************************************************************
		document.bNeckControlX = document.scaledBackNeck;
		document.bNeckControlY = (((document.fullLengthBack - document.centerBack) - 0.375)*document.scale);
		document.penFinalBack.moveTo(document.scaledBackNeck, 0); //starting point of curve
		document.penFinalBack.quadraticCurveTo(document.bNeckControlX ,document.bNeckControlY ,(document.scaledBackNeck / 2), (((document.fullLengthBack - document.centerBack) - 0.375)*document.scale)); // needs to be calibrated
		document.penFinalBack.lineTo(0, (((document.fullLengthBack - document.centerBack) - 0.375)*document.scale));


		// WAIST DART LEGS ***************************************************************
		document.penFinalBack.moveTo(0, document.scaledfullLengthBack);
		document.penFinalBack.lineTo(document.dartPlacement * document.scale, document.scaledfullLengthBack + (0.125 * document.scale)); // line to i
		document.penFinalBack.lineTo((document.dartPlacement + (document.backDartIntake / 2))  * document.scale, (document.scaledfullLengthBack - (document.sideLength * document.scale))); // point 0
		document.penFinalBack.lineTo((document.dartPlacement + document.backDartIntake)  * document.scale, document.scaledfullLengthBack + (0.125 * document.scale)); // point k


		// WAIST ARC *********************************************************************
		document.penFinalBack.moveTo((document.dartPlacement + document.backDartIntake)  * document.scale, document.scaledfullLengthBack + (0.125 * document.scale)); // point k
		document.penFinalBack.lineTo(((document.waistArcBack + document.backDartIntake + 0.24) * document.scale) , (document.scaledfullLengthBack + (0.1875 * document.scale))); // point m - waist arc with dart and ease


		//SIDE SEAM
		document.penFinalBack.lineTo((document.backArc * document.scale), document.offSetSideSeamRiseScaled); // point n



		// apply stroke to lines
		document.penFinalBack.stroke();

	}


	document.draftBackCanvas();

	$('.form-control').blur(function() {
		document.clearCanvas(document.gridPenBack);
		document.clearCanvas(document.penBack);
		document.clearCanvas(document.penFinalBack);
		document.draftBackCanvas();
	});

});