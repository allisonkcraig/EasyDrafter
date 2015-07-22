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
console.log(sideLengthRise)

// set up pen and set colors
var pen = draftingTable.getContext("2d");
pen.fillStyle="#83AF9B";
pen.strokeStyle = "#EA8C86";

// draw lines and dots
pen.beginPath()
pen.moveTo(0, 0);
pen.fillRect(0,0, 3, 3); // a
pen.lineTo(0, (fullLength * 20)); // a to b
pen.fillRect(0, (fullLength * 20), 3, 3); // b

pen.moveTo(0, (((fullLength - centerFront) -0.375)*20)); // move to neckline
pen.lineTo(80, (((fullLength - centerFront) -0.375)*20)); // d squared off

pen.moveTo(0, 0);
pen.lineTo((frontAcrossShoulder * 20), 0); // a to c
pen.lineTo((frontAcrossShoulder * 20), 100); // square off c

pen.moveTo(0, (fullLength * 20)); 
pen.lineTo(((bustArc + 0.25)* 20), (fullLength * 20)); // b to e
pen.lineTo(((bustArc + 0.25)* 20), 60) // square up from e

pen.moveTo((dartPlacement *20), (fullLength * 20)); 
pen.fillRect((dartPlacement *20), (fullLength * 20), 3, 3); 

pen.moveTo(0, (fullLength * 20)); 
pen.lineTo((frontAcrossShoulder * 20), ((fullLength - frontShoulderSlopeRise) *20)) // b to g
pen.fillRect((frontAcrossShoulder * 20), ((fullLength - frontShoulderSlopeRise) *20), 3, 3); // g
pen.lineTo(((frontAcrossShoulder - shoulderLengthRun) * 20), 0) // g to i
pen.lineTo( ((bustArc + 0.25) *20), (strapRise *20)) // i to j
pen.lineTo(((bustArc + 1.25) *20), ((strapRise *20) + (sideLengthRise * 20)) )// j to k
pen.lineTo((dartPlacement *20), (fullLength * 20))// line to f

// armhole curve needs to be calibrated
pen.moveTo((frontAcrossShoulder * 20), ((fullLength - frontShoulderSlopeRise) *20));
pen.quadraticCurveTo(130,(strapRise *20),((bustArc + 0.25) *20), (strapRise *20)); // needs to be calibrated

// apply stroke to lines
pen.stroke();


});


