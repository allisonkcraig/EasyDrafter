$( document ).ready(function() {
var draftingTable = document.getElementById("drafting-table");
var context = draftingTable.getContext("2d");

for (var y = 0.5; y < 461; y += 20) {
	context.beginPath();
	context.moveTo(0, y);
	context.lineTo(601, y);
	context.strokeStyle = "#FFDEDB";
	context.stroke();
	};

for (var x = 0.5; x < 601; x += 20) {
	context.beginPath();
	context.strokeStyle = "#FFDEDB";
	context.moveTo(x, 0);
	context.lineTo(x, 601);
	context.stroke();
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
var frontShoulderSlopeRise = Math.sqrt((Math.pow((frontShoulderSlope + 0.125), y = 2)) - (Math.pow(frontAcrossShoulder, y = 2)));
var shoulderLengthRun = Math.sqrt((Math.pow((shoulderLength), y = 2)) - (Math.pow((fullLength - frontShoulderSlopeRise), y = 2)));
var strapRise = Math.sqrt((Math.pow((strap + 0.375), y=2)) - (Math.pow(((bustArc +0.25)- shoulderLengthRun), y=2)));
console.log(strapRise)


//set up pen
var pen = draftingTable.getContext("2d");
pen.fillStyle="#83AF9B";
pen.strokeStyle = "#EA8C86";

// draw lines and dots
pen.beginPath()
pen.moveTo(0, 0);
pen.fillRect(0,0, 3, 3); //a
pen.lineTo(0, (fullLength * 20)); //a to b
pen.fillRect(0, (fullLength * 20), 3, 3); //b
pen.moveTo(0, (((fullLength - centerFront) -0.375)*20)); //move to neckline
pen.lineTo(80, (((fullLength - centerFront) -0.375)*20)); //d squared off
pen.moveTo(0, 0);
pen.lineTo((frontAcrossShoulder * 20), 0); //a to c
pen.lineTo((frontAcrossShoulder * 20), 100); //square off c
pen.moveTo(0, (fullLength * 20)); 
pen.lineTo(((bustArc + 0.25)* 20), (fullLength * 20)); //b to e
pen.lineTo(((bustArc + 0.25)* 20), 60) //square up from e
pen.moveTo((dartPlacement *20), (fullLength * 20)); 
pen.fillRect((dartPlacement *20), (fullLength * 20), 3, 3); 
pen.moveTo(0, (fullLength * 20)); 
pen.lineTo((frontAcrossShoulder * 20), ((fullLength - frontShoulderSlopeRise) *20)) //b to g
pen.fillRect((frontAcrossShoulder * 20), ((fullLength - frontShoulderSlopeRise) *20), 3, 3); //g
pen.lineTo(((frontAcrossShoulder - shoulderLengthRun) * 20), 0) // g to i
pen.lineTo((bustArc + 0.25) *20, strapRise *20) //i to j




	


//aply stroke to lines
pen.stroke();


});
