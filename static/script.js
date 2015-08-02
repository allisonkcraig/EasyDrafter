$( document ).ready(function() {
	
// establish drafting table and pen
var draftingTable = document.getElementById("drafting-table");
var gridPen = draftingTable.getContext("2d");

// y axis grid lines
for (var y = 0.5; y < 461; y += 20) {
	gridPen.beginPath();
	gridPen.moveTo(0, y);
	gridPen.lineTo(601, y);
	gridPen.strokeStyle = "#E8E8EE";
	gridPen.stroke();
	};

// x axis grid lines
for (var x = 0.5; x < 601; x += 20) {
	gridPen.beginPath();
	gridPen.strokeStyle = "#E8E8EE";
	gridPen.moveTo(x, 0);
	gridPen.lineTo(x, 601);
	gridPen.stroke();
	};

// right angle equations to find rise or run
var pythagoreanCAndA = function(c, a) {
	sideB = Math.sqrt((Math.pow(c, y = 2)) - (Math.pow(a, y = 2)));
	return sideB
};

//function to find point h
document.locatePointH = function(bustDepth, frontAcrossShoulder, frontShoulderSlopeRise) {
	var x = bustDepth * frontAcrossShoulder;
	return x / frontShoulderSlopeRise;
}

// basic measurements
var bust = 36.00;
var waist = 26.00;
var abdomen = 34.25;

// advanced measurements
var fullLength = 18.13;
var centerFront = 15.00;
var frontShoulderSlope = 17.25;
var backShoulderSlope = 17.25;
var strap = 10.00;
var frontAcrossShoulder = 7.50;
var acrossChest = 6.37;
var bustDepth = 9.25;
var shoulderLength = 5
var bustArc = 9.75;
var bustSpan = 3.75;
var waistArc = 6.86;
var dartPlacement = 3.25;
var backNeck = 3.00;
var backAcrossShoulder = 7.50;
var acrossBack = 7.00;
var sideLength = 8.5

// calculating rises and runs for right angle formulas
var frontShoulderSlopeRise = pythagoreanCAndA((frontShoulderSlope + 0.125), frontAcrossShoulder);
var shoulderLengthRun = pythagoreanCAndA(shoulderLength,(fullLength - frontShoulderSlopeRise));
var strapRise = pythagoreanCAndA((strap + 0.375), ((bustArc +0.25)- shoulderLengthRun));
var sideLengthRise = pythagoreanCAndA(sideLength, 1.25)
//console.log(sideLengthRise)

//calling functions for calulating point H
var pointHX = document.locatePointH(bustDepth, frontAcrossShoulder, frontShoulderSlope);
var pointHY = document.locatePointH(bustDepth, frontShoulderSlopeRise, frontShoulderSlope);
console.log(pointHX);
console.log(pointHY);

// set up pen and set colors
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
document.scaledOffset = (fullLength - frontShoulderSlopeRise) *20;

pen.lineTo(0, (document.scaledFullLength)); // a to b
pen.fillRect(0, (document.scaledFullLength), 3, 3); // b

pen.moveTo(0, (((fullLength - centerFront) -0.375)*20)); // move to neckline
pen.lineTo(80, (((fullLength - centerFront) -0.375)*20)); // d squared off

pen.moveTo(0, 0);
pen.lineTo((document.scaledFrontAcrossShoulder), 0); // a to c
pen.lineTo((document.scaledFrontAcrossShoulder), 100); // square off c

pen.moveTo(0, (document.scaledFullLength)); 
pen.lineTo(document.scaledBustArc, (document.scaledFullLength)); // b to e
pen.lineTo(document.scaledBustArc, 60) // square up from e

pen.moveTo(document.scaledDartPlacement, (document.scaledFullLength)); 
pen.fillRect(document.scaledDartPlacement, (document.scaledFullLength), 3, 3); 

pen.moveTo(0, (document.scaledFullLength)); 
pen.lineTo((document.scaledFrontAcrossShoulder), (document.scaledOffset)) // b to g
pen.fillRect((document.scaledFrontAcrossShoulder), (document.scaledOffset), 3, 3); // g

pen.fillRect(document.scaledPointHX, document.scaledOffset + document.scaledPointHY, 3, 3);

pen.lineTo(((frontAcrossShoulder - shoulderLengthRun) * 20), 0); // g to i
pen.lineTo( document.scaledBustArc, (strapRise *20)) // i to j
pen.lineTo(((bustArc + 1.25)* document.scale), ((strapRise *20) + (sideLengthRise * 20)) )// j to k
pen.lineTo(document.scaledDartPlacement, (document.scaledFullLength))// line to f

// armhole curve needs to be calibrated
pen.moveTo((document.scaledFrontAcrossShoulder), (document.scaledOffset));
pen.quadraticCurveTo(130,(strapRise *20),document.scaledBustArc, (strapRise *20)); // needs to be calibrated

// apply stroke to lines
pen.stroke();



// create an image from the canvas

var blockURL = draftingTable.toDataURL();

debugger
console.log(blockURL)

// DECIDE HOW TO USE URL OBJECT TO EITHER SAVE OR VIEW IMAGE

// var output = blockURL.replace(/^data:image\/(png|jpg);base64,/, "");
// console.log(output)
// $('#thing').attr('action', 'output');


// document.getElementById('canvasImg').src = blockURL;

});


