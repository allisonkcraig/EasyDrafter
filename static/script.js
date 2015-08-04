$( document ).ready(function() {
	
// establish drafting table and pen
var draftingTable = document.getElementById("drafting-table-front");

var gridPenFront = draftingTable.getContext("2d");

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

// right angle equations to find rise or run
var pythagoreanCAndA = function(c, a) {
	var sideB = Math.sqrt((Math.pow(c, y = 2)) - (Math.pow(a, y = 2)));
	return sideB
};

var pythagoreanAAndB = function(a, b) {
	var sideC = Math.sqrt((Math.pow(a, y = 2)) + (Math.pow(b, y = 2)));
	return sideC
};

//function to find point h
var locatePointOnC = function(distanceOnC, fullSideX, fullSideC) {
	var x = distanceOnC * fullSideX;
	return x / fullSideC;
};


// basic measurements
var bust = 36.00;
var waist = 26.00;
var abdomen = 34.25;

// advanced measurements
var fullLength = 17.75;
var centerFront = 15.00;
var frontShoulderSlope = 17.25;
var strap = 10.00;
var frontAcrossShoulder = 7.50;
var acrossChest = 6.37;
var bustDepth = 9.25;
var shoulderLength = 5
var bustArc = 9.75;
var bustSpan = 3.75;
var waistArc = 6.86;
var dartPlacement = 3.25;
var acrossBack = 7.00;
var sideLength = 8.5

// calculating rises and runs for right angle formulas
var frontShoulderSlopeRise = pythagoreanCAndA((frontShoulderSlope + 0.125), frontAcrossShoulder);
var shoulderLengthRun = pythagoreanCAndA(shoulderLength,(fullLength - frontShoulderSlopeRise));
var strapRise = pythagoreanCAndA((strap + 0.375), ((bustArc +0.25)- shoulderLengthRun));
var sideLengthRise = pythagoreanCAndA(sideLength, 1.25)

//calling functions for calulating point H
var pointHX = locatePointOnC(bustDepth, frontAcrossShoulder, frontShoulderSlope);
var pointHY = locatePointOnC(bustDepth, frontShoulderSlopeRise, frontShoulderSlope);
// console.log(pointHX);
// console.log(pointHY);

//Calculate distance and rise and run of second dart leg
var waistRemaining = waistArc - dartPlacement // find the remaining waist needed
var dartLegRise = fullLength - (strapRise  + sideLengthRise)
var dartLegRun = (bustArc + 1.25 + 0.25) - dartPlacement
var dartLegC = pythagoreanAAndB(dartLegRun, dartLegRise) // length of f to k
// console.log(dartLegC)

var dartY = fullLength - locatePointOnC(waistRemaining, dartLegRise, dartLegC)
var dartX = (bustArc + 1.25) - locatePointOnC(waistRemaining, dartLegRun, dartLegC)

// console.log(dartX)
// console.log(dartY)


// set up pen and set colors for temporary lines
var pen = draftingTable.getContext("2d");
pen.fillStyle="#83AF9B";
pen.strokeStyle = "#EA8C86";


// draw lines and dots
pen.beginPath()
pen.moveTo(0, 0);
pen.fillRect(0,0, 3, 3); // a

// Scaled Measurements
document.scale = 20;
document.scaledFullLength = fullLength * document.scale;
document.scaledFrontAcrossShoulder = frontAcrossShoulder * document.scale;
document.scaledBustArc = (bustArc + 0.25) * document.scale;
document.scaledDartPlacement = dartPlacement * document.scale;
document.scaledPointHX = pointHX * document.scale;
document.scaledPointHY = pointHY * document.scale;
document.scaledOffset = (fullLength - frontShoulderSlopeRise) * document.scale; // for finding how far from the top to start finding h point

//FULL LENGTH ***********************************************************
pen.lineTo(0, (document.scaledFullLength)); // a to b
pen.fillRect(0, (document.scaledFullLength), 3, 3); // b

pen.moveTo(0, (((fullLength - centerFront) -0.375)*document.scale)); // move to neckline
pen.lineTo(80, (((fullLength - centerFront) -0.375)*document.scale)); // d squared off

// ACROSS SHOULDER *******************************************************
pen.moveTo(0, 0);
pen.lineTo((document.scaledFrontAcrossShoulder), 0); // a to c
pen.lineTo((document.scaledFrontAcrossShoulder), 100); // square off c

// BUST ARC **************************************************************
pen.moveTo(0, (document.scaledFullLength)); 
pen.lineTo(document.scaledBustArc, (document.scaledFullLength)); // b to e
pen.lineTo(document.scaledBustArc, 60) // square up from e

pen.moveTo(document.scaledDartPlacement, (document.scaledFullLength)); 
pen.fillRect(document.scaledDartPlacement, document.scaledFullLength, 3, 3); // dart placement

// SHOULDER STRAP *********************************************************
pen.moveTo(0, document.scaledFullLength); 
pen.lineTo(document.scaledFrontAcrossShoulder, document.scaledOffset) // b to g
pen.fillRect(document.scaledFrontAcrossShoulder, document.scaledOffset, 3, 3); // g

// BUST POINT *************************************************************
pen.fillRect(document.scaledPointHX, (document.scaledOffset + document.scaledPointHY), 3, 3); //calculate point h


pen.moveTo(0, (document.scaledOffset + document.scaledPointHY)) // point L

//BUST POINT **************************************************************
pen.lineTo((bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY)); // to point M (bust point)


//DART LEGS ***************************************************************
pen.moveTo((bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY))
pen.lineTo(document.scaledDartPlacement, (document.scaledFullLength))// line to f
//second dart
pen.moveTo((bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY))
pen.lineTo(dartX * document.scale, dartY * document.scale);// line to second dart leg


pen.fillRect(0, (((document.scaledPointHY)- ((fullLength - centerFront) -0.375 * document.scale))) /3 + document.scaledOffset, 3, 3); // n
pen.moveTo(0, (((document.scaledPointHY)- ((fullLength - centerFront) -0.375 * document.scale))) /3 + document.scaledOffset);
pen.lineTo((acrossChest + 0.25) * document.scale, (((document.scaledPointHY)- ((fullLength - centerFront) -0.375 * document.scale))) /3 + document.scaledOffset, 5, 5); //to point O

//SHOULDER ***************************************************************
pen.moveTo((document.scaledFrontAcrossShoulder), (document.scaledOffset)) // b to g
pen.lineTo(((frontAcrossShoulder - shoulderLengthRun) * document.scale), 0); // g to i


pen.lineTo( document.scaledBustArc, (strapRise * document.scale)) // i to j
pen.lineTo(((bustArc + 1.5)* document.scale), ((strapRise * document.scale) + (sideLengthRise * document.scale)) )// j to k
pen.lineTo(document.scaledDartPlacement, (document.scaledFullLength))// line to f

// armhole curve needs to be calibrated
pen.moveTo((document.scaledFrontAcrossShoulder), (document.scaledOffset));
pen.quadraticCurveTo(130,(strapRise * document.scale),document.scaledBustArc, (strapRise * document.scale)); // needs to be calibrated

// apply stroke to lines
pen.stroke();




// CREATE FINAL DRAFT ***************************************************
var penFinalFront = draftingTable.getContext("2d");
penFinalFront.fillStyle= "black";
penFinalFront.strokeStyle = "black";


// draw lines and dots
penFinalFront.beginPath();
penFinalFront.moveTo(0, 0);
penFinalFront.fillRect(0,0, 3, 3); // a

//DART LEGS ***************************************************************
penFinalFront.moveTo((bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY));
penFinalFront.lineTo(document.scaledDartPlacement, (document.scaledFullLength)); // line to f

penFinalFront.moveTo((bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY));
penFinalFront.lineTo(dartX * document.scale, dartY * document.scale);// line to second dart leg

//WAIST SIDE OF DART ******************************************************
penFinalFront.lineTo(((bustArc + 1.5)* document.scale), ((strapRise * document.scale) + (sideLengthRise * document.scale)) )

//SIDE SEAM ******************************************************
penFinalFront.lineTo( document.scaledBustArc, (strapRise * document.scale)) // i to j

//SHOULDER ***************************************************************
penFinalFront.moveTo((document.scaledFrontAcrossShoulder), (document.scaledOffset)); // b to g

penFinalFront.lineTo(((frontAcrossShoulder - shoulderLengthRun) * document.scale), 0); // g to i


// apply stroke to lines
penFinalFront.stroke();

// create an image from the canvas

var blockURL = draftingTable.toDataURL();

console.log(blockURL)

// DECIDE HOW TO USE URL OBJECT TO EITHER SAVE OR VIEW IMAGE

// var output = blockURL.replace(/^data:image\/(png|jpg);base64,/, "");
// console.log(output)
// $('#thing').attr('action', 'output');


// document.getElementById('canvasImg').src = blockURL;

});


