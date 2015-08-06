$( document ).ready(function() {
	
// establish drafting table and document.pen
var draftingTableFront = document.getElementById("drafting-table-front");

var gridPenFront = draftingTableFront.getContext("2d");

// y axis grid lines
for (var y = 0.5; y < 461; y += 20) {
	gridPenFront.beginPath();
	gridPenFront.moveTo(0, y);
	gridPenFront.lineTo(601, y);
	gridPenFront.strokeStyle = "#E8E8EE";
	gridPenFront.stroke();
	};

// x axis grid lines
for (var x = 0.5; x < 601; x += 20) {
	gridPenFront.beginPath();
	gridPenFront.strokeStyle = "#E8E8EE";
	gridPenFront.moveTo(x, 0);
	gridPenFront.lineTo(x, 601);
	gridPenFront.stroke();
	};


// START TEMPORARY LINES ////////////////////////////////////////////////////////
// set up pen and set colors for temporary lines
document.pen = draftingTableFront.getContext("2d");
document.pen.fillStyle="#83AF9B";
document.pen.strokeStyle = "#EA8C86";


// draw lines and dots
document.pen.beginPath()
document.pen.moveTo(0, 0);


// FULL LENGTH ***********************************************************
document.pen.lineTo(0, (document.scaledFullLength)); // a to b
document.pen.moveTo(0, (((document.fullLength - document.centerFront) -0.375)*document.scale)); // move to neckline
document.pen.lineTo(80, (((document.fullLength - document.centerFront) -0.375)*document.scale)); // d squared off


// ACROSS SHOULDER *******************************************************
document.pen.moveTo(0, 0);
document.pen.lineTo((document.scaledFrontAcrossShoulder), 0); // a to c
document.pen.lineTo((document.scaledFrontAcrossShoulder), 100); // square off c


// BUST ARC **************************************************************
document.pen.moveTo(0, (document.scaledFullLength)); 
document.pen.lineTo(document.scaledBustArc, (document.scaledFullLength)); // b to e
document.pen.lineTo(document.scaledBustArc, 60) // square up from e
document.pen.moveTo(document.scaledDartPlacement, (document.scaledFullLength)); 


// SHOULDER STRAP *********************************************************
document.pen.moveTo(0, document.scaledFullLength); 
document.pen.lineTo(document.scaledFrontAcrossShoulder, document.scaledOffset) // b to g


// BUST POINT *************************************************************
document.pen.fillRect(document.scaledPointHX, (document.scaledOffset + document.scaledPointHY), 3, 3); //calculate point h
document.pen.moveTo(0, (document.scaledOffset + document.scaledPointHY)) // point L


// BUST POINT **************************************************************
document.pen.lineTo((document.bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY)); // to point M (bust point)


// DART LEGS ***************************************************************
document.pen.moveTo((document.bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY))
document.pen.lineTo(document.scaledDartPlacement, (document.scaledFullLength))// line to f
// second dart
document.pen.moveTo((document.bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY))
document.pen.lineTo(document.dartX * document.scale, document.dartY * document.scale);// line to second dart leg


// ACROSS CHEST ***************************************************************
document.pen.moveTo(0, (((document.scaledPointHY)- ((document.fullLength - document.centerFront) -0.375 * document.scale))) /3 + document.scaledOffset);
document.pen.lineTo((document.acrossChest + 0.25) * document.scale, (((document.scaledPointHY)- ((document.fullLength - document.centerFront) -0.375 * document.scale))) /3 + document.scaledOffset, 5, 5); //to point O


// SHOULDER ***************************************************************
document.pen.moveTo((document.scaledFrontAcrossShoulder), (document.scaledOffset)) // b to g
document.pen.lineTo(((document.frontAcrossShoulder - document.shoulderLengthRun) * document.scale), 0); // g to i

 
// HELPER LINES **********************************************************
document.pen.lineTo( document.scaledBustArc, (document.strapRise * document.scale)) // i to j
document.pen.lineTo(((document.bustArc + 1.5)* document.scale), ((document.strapRise * document.scale) + (document.sideLengthRise * document.scale)) )// j to k
document.pen.lineTo(document.scaledDartPlacement, (document.scaledFullLength))// line to f


// apply stroke to lines
document.pen.stroke();




// START FINAL LINES ////////////////////////////////////////////////////////
document.penFinalFront = draftingTableFront.getContext("2d");
document.penFinalFront.fillStyle= "black";
document.penFinalFront.strokeStyle = "black";


// instantiate lines and dots
document.penFinalFront.beginPath();
document.penFinalFront.moveTo(0, 0);


// CENTERFRONT 
document.penFinalFront.moveTo(0, (document.scaledFullLength), 3, 3); // b
document.penFinalFront.lineTo(+0.5, (((document.fullLength - document.centerFront) -0.375)*document.scale)); // move to neckline, ofset half a pixel so it shows on the canvas better


// DART LEGS ***************************************************************
document.penFinalFront.moveTo((document.bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY));
document.penFinalFront.lineTo(document.scaledDartPlacement, (document.scaledFullLength)); // line to f
document.penFinalFront.lineTo(0, (document.scaledFullLength))
document.penFinalFront.moveTo((document.bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY));
document.penFinalFront.lineTo(document.dartX * document.scale, document.dartY * document.scale);// line to second dart leg


// WAIST SIDE OF DART ******************************************************
document.penFinalFront.lineTo(((document.bustArc + 1.5)* document.scale), ((document.strapRise * document.scale) + (document.sideLengthRise * document.scale)) )


// SIDE SEAM ******************************************************
document.penFinalFront.lineTo( document.scaledBustArc, (document.strapRise * document.scale)) // i to j


// SHOULDER ***************************************************************
document.penFinalFront.moveTo((document.scaledFrontAcrossShoulder), (document.scaledOffset)); // b to g
document.penFinalFront.lineTo(((document.frontAcrossShoulder - document.shoulderLengthRun) * document.scale), 0); // g to i


// ARMHOLE ***************************************************************
document.fArmControlx = (document.acrossChest * 0.725) * document.scale;
document.fArmControly = (document.strapRise / 0.886) * document.scale;
document.penFinalFront.moveTo((document.scaledFrontAcrossShoulder), (document.scaledOffset));
document.penFinalFront.quadraticCurveTo(document.fArmControlx ,document.fArmControly ,document.scaledBustArc, (document.strapRise * document.scale)); // needs to be calibrated


// NECKLINE ***************************************************************
document.fNeckControlX = (document.frontAcrossShoulder - document.shoulderLengthRun) * document.scale;
document.fNeckControlY = ((document.fullLength - document.centerFront) - 0.375)*document.scale;
document.penFinalFront.moveTo((document.frontAcrossShoulder - document.shoulderLengthRun) * document.scale, 0); //starting point of curve
document.penFinalFront.quadraticCurveTo(document.fNeckControlX ,document.fNeckControlY ,0, (((document.fullLength - document.centerFront) - 0.375)*document.scale)); // needs to be calibrated
document.penFinalFront.lineTo(0, (((document.fullLength - document.centerFront) - 0.375)*document.scale));


// apply stroke to lines
document.penFinalFront.stroke();

// create an image from the canvas


});


