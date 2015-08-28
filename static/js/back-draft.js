$(document).ready(function() {
	document.canvasHeight = 2001
	document.canvasWidth = 1546

	document.draftBackCanvas = function(backTableName, scale){
		document.processBackForm(scale);

		// establish drafting table and pen
		document.draftingTableBack = document.getElementById(backTableName);

		document.gridPenBack = document.draftingTableBack.getContext("2d");
		document.gridPenBack.fillStyle="white";
		document.gridPenBack.beginPath()
		document.gridPenBack.moveTo(0, 0);
		document.gridPenBack.fillRect(0,0, document.canvasHeight * 20, document.canvasWidth * 20)
		document.gridPenBack.stroke();

		document.gridPenBack = document.draftingTableBack.getContext("2d");


		// y axis grid lines
		for (var x = 0.5; y < 2001; y += document.scale) {
			document.gridPenBack.beginPath();
			document.gridPenBack.moveTo(0, y);
			document.gridPenBack.lineTo(2001, y);
			document.gridPenBack.strokeStyle = "#E8E8EE";
			document.gridPenBack.stroke();
			};


		// x axis grid lines
		for (var x = 0.5; x < 2001; x += document.scale) {
			document.gridPenBack.beginPath();
			document.gridPenBack.strokeStyle = "#E8E8EE";
			document.gridPenBack.moveTo(x, 0);
			document.gridPenBack.lineTo(x, 2001);
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
		document.penBack.lineTo(0, (document.fullLengthBack)); // a to b
		document.penBack.moveTo(0, ((document.fullLengthBack - document.centerBack) - (0.375 * document.scale))); // move to neckline
		document.penBack.lineTo(80, ((document.fullLengthBack - document.centerBack) - (0.375 * document.scale))); // d squared off


		// ACROSS SHOULDER *******************************************************
		document.penBack.moveTo(0, 0);
		document.penBack.lineTo((document.backAcrossShoulder), 0); // a to c
		document.penBack.lineTo((document.backAcrossShoulder), 5 * document.scale); // square off c


		// BACK ARC **************************************************************
		document.penBack.moveTo(0, (document.fullLengthBack)); 
		document.penBack.lineTo(document.backArc, document.fullLengthBack); // b to e
		document.penBack.lineTo(document.backArc, 3 * document.scale); // square up from e
		document.penBack.moveTo(document.dartPlacement, document.fullLengthBack); 


		// SLOPE *********************************************************
		document.penBack.moveTo(0, document.fullLengthBack); 
		document.penBack.lineTo(document.backAcrossShoulder, document.scaledOffset); // b to g


		// SHOULDER DART ***************************************************************
		document.penBack.fillRect(document.shoulderDartXScaled + document.backNeck , document.shoulderDartYScaled, 7, 7); // center of shoulder dart
		document.penBack.moveTo(document.shoulderDartXScaled+ document.backNeck, document.shoulderDartYScaled);
		document.penBack.lineTo((document.dartPlacement + (document.backDartIntake / 2)), (document.fullLengthBack - document.sideLength)); // point 0
		// Second Dart Leg
		document.penBack.moveTo(document.shoulderDartLeg1XScaled + document.backNeck, document.shoulderDartLeg1YScaled);
		document.penBack.lineTo(document.offsetShoulderDartApexX, document.offsetShoulderDartApexY);
		document.penBack.lineTo(document.shoulderDartLeg2XScaled + document.backNeck, document.shoulderDartLeg2YScaled);


		// SHOULDER SEAM ***************************************************
		document.penBack.moveTo(document.backNeck, 0); // point f
		document.penBack.lineTo(document.pointHXScaled, document.pointHYScaled); // point h


		// apply stroke to lines
		document.penBack.stroke();





		// START FINAL LINES ////////////////////////////////////////////////////////
		document.penFinalBack = document.draftingTableBack.getContext("2d");
		document.penFinalBack.fillStyle = "black";
		document.penFinalBack.strokeStyle = "black";


		// instantiate lines and dots
		document.penFinalBack.beginPath();


		// CENTERFRONT ***************************************************
		document.penFinalBack.moveTo(0.5, document.fullLengthBack); // b
		document.penFinalBack.lineTo(0.5, ((document.fullLengthBack - document.centerBack) -(0.375 * document.scale))); // move to neckline, ofset half a pixel so it shows on the canvas better


		// SHOULDER SEAM ***************************************************
		document.penFinalBack.moveTo(document.backNeck, 0);
		document.penFinalBack.lineTo(document.shoulderDartLeg1XScaled + document.backNeck, document.shoulderDartLeg1YScaled);
		document.penFinalBack.lineTo(document.offsetShoulderDartApexX, document.offsetShoulderDartApexY);
		document.penFinalBack.lineTo(document.shoulderDartLeg2XScaled + document.backNeck, document.shoulderDartLeg2YScaled);
		document.penFinalBack.lineTo(document.pointHXScaled, document.pointHYScaled);


		// ARMHOLE ***************************************************************
		document.bArmControlX = (document.acrossBack * 0.725);
		document.bArmControlY = (document.offSetSideSeamRiseScaled / (1.086)) ;
		document.penFinalBack.moveTo(document.pointHXScaled, document.pointHYScaled); //starting point of curve
		document.penFinalBack.quadraticCurveTo(document.bArmControlX ,document.bArmControlY ,document.backArc, document.offSetSideSeamRiseScaled); // needs to be calibrated


		// NECKLINE ***************************************************************
		document.bNeckControlX = document.backNeck;
		document.bNeckControlY = ((document.fullLengthBack - document.centerBack) - (0.375 * document.scale));
		document.penFinalBack.moveTo(document.backNeck, 0); //starting point of curve
		document.penFinalBack.quadraticCurveTo(document.bNeckControlX ,document.bNeckControlY ,(document.backNeck / 2), ((document.fullLengthBack - document.centerBack) - (0.375 *document.scale))); // needs to be calibrated
		document.penFinalBack.lineTo(0, ((document.fullLengthBack - document.centerBack) - (0.375 * document.scale)));


		// WAIST DART LEGS ***************************************************************
		document.penFinalBack.moveTo(0, document.fullLengthBack);
		document.penFinalBack.lineTo(document.dartPlacement , document.fullLengthBack + (0.125 * document.scale)); // line to i
		document.penFinalBack.lineTo((document.dartPlacement + (document.backDartIntake / 2)), (document.fullLengthBack - document.sideLength)); // point 0
		document.penFinalBack.lineTo((document.dartPlacement + document.backDartIntake), document.fullLengthBack + (0.125 * document.scale)); // point k


		// WAIST ARC *********************************************************************
		document.penFinalBack.moveTo((document.dartPlacement + document.backDartIntake) , document.fullLengthBack + (0.125 * document.scale)); // point k
		document.penFinalBack.lineTo((document.waistArcBack + document.backDartIntake + (0.24* document.scale)) , (document.fullLengthBack + (0.1875 * document.scale))); // point m - waist arc with dart and ease


		//SIDE SEAM
		document.penFinalBack.moveTo((document.waistArcBack + document.backDartIntake + (0.24* document.scale)) , (document.fullLengthBack + (0.1875 * document.scale))); // point m - waist arc with dart and ease
		document.penFinalBack.lineTo(document.backArc, document.offSetSideSeamRiseScaled); // point n



		// apply stroke to lines
		document.penFinalBack.stroke();

	}




	$('.update-button').blur(function() {
		clearCanvas(document.gridPenBack);
		clearCanvas(document.penBack);
		clearCanvas(document.penFinalBack);
		document.draftBackCanvas("drafting-table-back", 20);
	});

});