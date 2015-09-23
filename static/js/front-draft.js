$(document).ready(function() {
	document.canvasHeight = 2001;
	document.canvasWidth = 1546;

	document.draftFrontCanvas = function(frontTableName, scale){
		document.processFrontForm(scale);
		// take in an object that that will be the way you store the data
		// establish drafting table and document.pen
		document.draftingTableFront = document.getElementById(frontTableName);

		document.pen = document.draftingTableFront.getContext("2d");
		document.pen.fillStyle="white";
		document.pen.beginPath();
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

		document.pen = document.draftingTableFront.getContext("2d");
		document.pen.fillStyle="#83AF9B";
		document.pen.strokeStyle = "#EA8C86";


		// draw lines and dots
		document.pen.beginPath()
		document.pen.moveTo(0, 0);



		// FULL LENGTH ***********************************************************
		document.pen.lineTo(0, (document.fullLength)); // a to b
		document.pen.moveTo(0, ((document.fullLength - document.centerFront) -(0.375*document.scale))); // move to neckline
		document.pen.lineTo(80, ((document.fullLength - document.centerFront) -(0.375*document.scale))); // d squared off


		// ACROSS SHOULDER *******************************************************
		document.pen.moveTo(0, 0);
		document.pen.lineTo((document.frontAcrossShoulder), 0); // a to c
		document.pen.lineTo((document.frontAcrossShoulder), 5 * scale); // square off c


		// BUST ARC **************************************************************
		document.pen.moveTo(0, (document.fullLength)); 
		document.pen.lineTo(document.bustArc, document.fullLength); // b to e
		document.pen.lineTo(document.bustArc, 60); // square up from e
		document.pen.moveTo(document.dartPlacement, document.fullLength); 


		// SHOULDER STRAP *********************************************************
		document.pen.moveTo(0, document.fullLength); 
		document.pen.lineTo(document.frontAcrossShoulder, document.scaledOffset); // b to g


		// BUST POINT *************************************************************
		document.pen.fillRect(document.scaledPointHX, (document.scaledOffset + document.scaledPointHY), 3, 3); //calculate point h
		document.pen.moveTo(0, (document.scaledOffset + document.scaledPointHY)); // point L


		// BUST POINT **************************************************************
		document.pen.lineTo((document.bustSpan), (document.scaledOffset + document.scaledPointHY)); // to point M (bust point)


		// DART LEGS ***************************************************************
		document.pen.moveTo((document.bustSpan), (document.scaledOffset + document.scaledPointHY));
		document.pen.lineTo(document.dartPlacement, (document.fullLength));// line to f
		// second dart
		document.pen.moveTo((document.bustSpan), (document.scaledOffset + document.scaledPointHY));
		document.pen.lineTo(document.dartX, document.dartY);// line to second dart leg


		// ACROSS CHEST ***************************************************************
		document.pen.moveTo(0, (((document.scaledPointHY)- ((document.fullLength - document.centerFront) -(0.375 * document.scale))) /3 + document.scaledOffset));
		document.pen.lineTo((document.acrossChest + (0.25* document.scale)), ((document.scaledPointHY)- ((document.fullLength - document.centerFront) -(0.375 * document.scale))) / 3 + document.scaledOffset, 5, 5); //to point O


		// SHOULDER ***************************************************************
		document.pen.moveTo((document.frontAcrossShoulder), (document.scaledOffset)); // b to g
		document.pen.lineTo((document.frontAcrossShoulder - document.shoulderLengthRun), 0); // g to i

		 
		// HELPER LINES **********************************************************
		document.pen.lineTo( document.bustArc, document.strapRise); // i to j
		document.pen.lineTo((document.bustArc + (1.5* document.scale)), document.strapRise + document.sideLengthRise);// j to k
		document.pen.lineTo(document.dartPlacement, (document.fullLength));// line to f


		// apply stroke to lines
		document.pen.stroke();




		// START FINAL LINES ////////////////////////////////////////////////////////
		document.penFinalFront = document.draftingTableFront.getContext("2d");
		document.penFinalFront.fillStyle= "black";
		document.penFinalFront.strokeStyle = "black";


		// instantiate lines and dots
		document.penFinalFront.beginPath();
		document.penFinalFront.moveTo(0, 0);


		// CENTERFRONT 
		document.penFinalFront.moveTo(0, (document.fullLength), 3, 3); // b
		document.penFinalFront.lineTo(+0.5, ((document.fullLength - document.centerFront) -(0.375 * document.scale))); // move to neckline, ofset half a pixel so it shows on the canvas better


		// DART LEGS ***************************************************************
		document.penFinalFront.moveTo(document.bustSpan, (document.scaledOffset + document.pointHY));
		document.penFinalFront.lineTo(document.dartPlacement, document.fullLength); // line to f
		document.penFinalFront.lineTo(0, document.fullLength)
		document.penFinalFront.moveTo(document.bustSpan, (document.scaledOffset + document.pointHY));
		document.penFinalFront.lineTo(document.dartX , document.dartY);// line to second dart leg


		// WAIST SIDE OF DART ******************************************************
		document.penFinalFront.lineTo((document.bustArc + (1.5 * document.scale)), (document.strapRise + document.sideLengthRise) )


		// SIDE SEAM ******************************************************
		document.penFinalFront.lineTo( document.bustArc, document.strapRise) // i to j


		// SHOULDER ***************************************************************
		document.penFinalFront.moveTo(document.frontAcrossShoulder, document.scaledOffset); // b to g
		document.penFinalFront.lineTo((document.frontAcrossShoulder - document.shoulderLengthRun), 0); // g to i


		// ARMHOLE ***************************************************************
		document.fArmControlx = (document.acrossChest * 0.725);
		document.fArmControly = (document.strapRise / 0.886);
		document.penFinalFront.moveTo((document.frontAcrossShoulder), (document.scaledOffset));
		document.penFinalFront.quadraticCurveTo(document.fArmControlx ,document.fArmControly ,document.bustArc, document.strapRise);


		// NECKLINE ***************************************************************
		document.fNeckControlX = (document.frontAcrossShoulder - document.shoulderLengthRun);
		document.fNeckControlY = (document.fullLength - document.centerFront) -(0.375 * document.scale);
		document.penFinalFront.moveTo((document.frontAcrossShoulder - document.shoulderLengthRun), 0); //starting point of curve
		document.penFinalFront.quadraticCurveTo(document.fNeckControlX ,document.fNeckControlY ,0, ((document.fullLength - document.centerFront) - (0.375 * document.scale))); // needs to be calibrated
		document.penFinalFront.lineTo(0, ((document.fullLength - document.centerFront) - (0.375 * document.scale)));


		// apply stroke to lines
		document.penFinalFront.stroke();


	};

	document.clearCanvas = function(context) {
    context.clearRect(0, 0, 461, 461);
	};


	$(".update-button").blur(function() {
		clearCanvas(document.gridPenFront);
		clearCanvas(document.pen);
		clearCanvas(document.penFinalFront);
		document.draftFrontCanvas("drafting-table-front", 20);
	});

});





