$( document ).ready(function() {
	
// establish drafting table and pen
var draftingTable = document.getElementById("drafting-table-back");
var gridPenBack = draftingTable.getContext("2d");

// y axis grid lines
for (var y = 0.5; y < 461; y += 20) {
	gridPenBack.beginPath();
	gridPenBack.moveTo(0, y);
	gridPenBack.lineTo(601, y);
	gridPenBack.strokeStyle = "#E8E8EE";
	gridPenBack.stroke();
	};

// x axis grid lines
for (var x = 0.5; x < 601; x += 20) {
	gridPenBack.beginPath();
	gridPenBack.strokeStyle = "#E8E8EE";
	gridPenBack.moveTo(x, 0);
	gridPenBack.lineTo(x, 601);
	gridPenBack.stroke();
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
var fullLengthBack = 18;
var centerBack = 17.25;
var backShoulderSlope = 17.13;
var strap = 10.00; 
var acrossBack = 7;
var bustDepth = 9.25;
var shoulderLength = 5
var backArc = 9;
var backSpan = 3.75;
var waistArcBack = 6.25;
var dartPlacement = 3.25;
var backNeck = 3.00;
var backAcrossShoulder = 7.63;
var acrossBack = 7.00;
var sideLength = 8.5

// calculating rises and runs for right angle formulas
var backShoulderSlopeRise = pythagoreanCAndA((backShoulderSlope + 0.125), backAcrossShoulder);
var shoulderLengthRun = pythagoreanCAndA(shoulderLength,(fullLengthBack - backShoulderSlopeRise));
var strapRise = pythagoreanCAndA((strap + 0.375), ((backArc)- shoulderLengthRun));
var sideLengthRise = pythagoreanCAndA(sideLength, 1.25)

//calling functions for calulating point H
var pointHX = locatePointOnC(bustDepth, backAcrossShoulder, backShoulderSlope);
var pointHY = locatePointOnC(bustDepth, backShoulderSlopeRise, backShoulderSlope);
// console.log(pointHX);
// console.log(pointHY);

// //Calculate distance and rise and run of second dart leg
// var waistRemaining = waistArcBack - dartPlacement // find the remaining waist needed
// console.log(waistRemaining)
// var dartLegRise = fullLengthBack - (strapRise  + sideLengthRise)
// var dartLegRun = (backArc + 1.25) - dartPlacement
// var dartLegC = pythagoreanAAndB(dartLegRun, dartLegRise) // length of f to k
// console.log(dartLegC)

// var dartY = fullLengthBack - locatePointOnC(waistRemaining, dartLegRise, dartLegC)
// var dartX = (backArc + 1.25) - locatePointOnC(waistRemaining, dartLegRun, dartLegC)

// console.log(dartX)
// console.log(dartY)


// set up pen and set colors for temporary lines
var penBack = draftingTable.getContext("2d");
penBack.fillStyle="#83AF9B";
penBack.strokeStyle = "#EA8C86";


// draw lines and dots
penBack.beginPath()
penBack.moveTo(0, 0);
penBack.fillRect(0,0, 3, 3); // a

// Scaled Measurements
document.scale = 20;
document.scaledfullLengthBack = fullLengthBack * document.scale;
document.scaledFrontAcrossShoulder = backAcrossShoulder * document.scale;
document.scaledBackArc = (backArc + 0.75) * document.scale;
document.scaledDartPlacement = dartPlacement * document.scale;
document.scaledPointHX = pointHX * document.scale;
document.scaledPointHY = pointHY * document.scale;
document.scaledOffset = (fullLengthBack - backShoulderSlopeRise) * document.scale; // for finding how far from the top to start finding h point

//FULL LENGTH ***********************************************************
penBack.lineTo(0, (document.scaledfullLengthBack)); // a to b
penBack.fillRect(0, (document.scaledfullLengthBack), 3, 3); // b

penBack.moveTo(0, (((fullLengthBack - centerBack) - 0.375)*document.scale)); // move to neckline
penBack.lineTo(80, (((fullLengthBack - centerBack) - 0.375)*document.scale)); // d squared off

// ACROSS SHOULDER *******************************************************
penBack.moveTo(0, 0);
penBack.lineTo((document.scaledFrontAcrossShoulder), 0); // a to c
penBack.lineTo((document.scaledFrontAcrossShoulder), 100); // square off c

// BUST ARC **************************************************************
penBack.moveTo(0, (document.scaledfullLengthBack)); 
penBack.lineTo(document.scaledBackArc, (document.scaledfullLengthBack)); // b to e
penBack.lineTo(document.scaledBackArc, 60) // square up from e

penBack.moveTo(document.scaledDartPlacement, (document.scaledfullLengthBack)); 
penBack.fillRect(document.scaledDartPlacement, document.scaledfullLengthBack, 3, 3); // dart placement

// SHOULDER STRAP *********************************************************
penBack.moveTo(0, document.scaledfullLengthBack); 
penBack.lineTo(document.scaledFrontAcrossShoulder, document.scaledOffset) // b to g
penBack.fillRect(document.scaledFrontAcrossShoulder, document.scaledOffset, 3, 3); // g

// POINT O *************************************************************
penBack.fillRect(document.scaledPointHX, (document.scaledOffset + document.scaledPointHY), 3, 3); //calculate point h


penBack.moveTo(0, (document.scaledOffset + document.scaledPointHY)) // point L

// BACK DART POINT **************************************************************
penBack.lineTo((backSpan * document.scale), (document.scaledOffset + document.scaledPointHY)); // to point M (bust point)


// //DART LEGS ***************************************************************
// penBack.moveTo((bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY))
// penBack.lineTo(document.scaledDartPlacement, (document.scaledfullLengthBack))// line to f

// penBack.moveTo((bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY))

// penBack.lineTo(dartX * document.scale, dartY * document.scale);// line to second dart leg


penBack.fillRect(0, (((document.scaledPointHY)- ((fullLengthBack - centerBack) - 0.375 * document.scale))) /3 + document.scaledOffset, 3, 3); // n
penBack.moveTo(0, (((document.scaledPointHY)- ((fullLengthBack - centerBack) - 0.375 * document.scale))) /3 + document.scaledOffset);
penBack.lineTo((acrossBack + 0.25) * document.scale, (((document.scaledPointHY)- ((fullLengthBack - centerBack) - 0.375 * document.scale))) /3 + document.scaledOffset, 5, 5); //to point O


penBack.moveTo((document.scaledFrontAcrossShoulder), (document.scaledOffset)) // b to g

penBack.lineTo(((backAcrossShoulder - shoulderLengthRun) * document.scale), 0); // g to i
penBack.lineTo( document.scaledBackArc, (strapRise * document.scale)) // i to j
penBack.lineTo( document.scaledBackArc, (strapRise * document.scale) + (sideLengthRise * document.scale)) // j to k
penBack.lineTo(document.scaledDartPlacement, (document.scaledfullLengthBack))// line to f

// armhole curve needs to be calibrated
penBack.moveTo((document.scaledFrontAcrossShoulder), (document.scaledOffset));
penBack.quadraticCurveTo(130,(strapRise * document.scale),document.scaledBackArc, (strapRise * document.scale)); // needs to be calibrated

// apply stroke to lines
penBack.stroke();



// create an image from the canvas

// var blockURLBack = draftingTable.toDataURL();

// console.log(blockURLBack)
});