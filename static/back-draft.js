$(document).ready(function() {
	
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
document.pythagoreanCAndA = function(c, a) {
	var sideB = Math.sqrt((Math.pow(c, y = 2)) - (Math.pow(a, y = 2)));
	return sideB
};


document.pythagoreanAAndB = function(a, b) {
	var sideC = Math.sqrt((Math.pow(a, y = 2)) + (Math.pow(b, y = 2)));
	return sideC
};


//find the coordinates for a point on side c of a right trainagle with the sides of a proportionatly bigger trinagle
document.locatePointOnC = function(distanceOnC, fullSideX, fullSideC) {
	var x = distanceOnC * fullSideX;
	return x / fullSideC
};


//find a proportionatly bigger traingle from sides of smaller traingle given 
document.findLengthOfBiggerTriangleSide = function(smallSideC, smallSideA, fullSideC) {
	var x = smallSideA * fullSideC;
	bigSideA =  x / smallSideC;
	return bigSideA
};

//Find point on a straight line with two (x,y) coordinates for each end where point 1 is the side you would like to start at.
// The first two coordinates you evaluate will be the axis you return (ie, entering x before y will return x, entering y before x will return y)
document.findAxisForPointOnLine = function(x1, x2, y1, y2, pixelsFromPoint1) {
	var leg1 = x1 - x2
	// console.log("LEG 1: ", leg1)
	var leg2 = y1 - y2
	// console.log("LEG 2: ", leg2)
	//rise over run
	var lenghtOfHypo = document.pythagoreanAAndB(leg1, leg2)
	// console.log("LENGTH OF HYPO: ", lenghtOfHypo)
	var x = pixelsFromPoint1 * leg1
	// console.log("X: ", x)
	var axisFromOrigin = x / lenghtOfHypo
	// console.log("axisFromOrigin: ", axisFromOrigin)
	return axisFromOrigin
}


// basic measurements
var bust = 36.00;
var waist = 26.00;
var abdomen = 34.25;


// advanced measurements
var fullLengthBack = 18;
var centerBack = 17.25;
var backShoulderSlope = 17.13 + 0.125;
var acrossBack = 7;
var bustDepth = 9.25;
var shoulderLength = 5;
var backShoulderLength = shoulderLength + 0.5 // added dart intake for back dart
var backArc = 9 + 0.75;
var backSpan = 3.75;
var waistArcBack = 6.25;
var dartPlacement = 3.25;
var backNeck = 3.00 - 0.125;
var backAcrossShoulder = 7.63;
var acrossBack = 7.00;
var sideLength = 8.5;
var backDartIntake = 1.5; //make radio button for regular and petite/junior


// Scaled Measurements
document.scale = 20;
document.scaledfullLengthBack = fullLengthBack * document.scale;
document.scaledBackAcrossShoulder = backAcrossShoulder * document.scale;
document.scaledBackArc = backArc * document.scale;
document.scaledDartPlacement = dartPlacement * document.scale;
var scaledBackNeck =  backNeck * document.scale;

// Find slope offset o fron the top of the axis. -- point g's y axis 
var backShoulderSlopeRise = document.pythagoreanCAndA( backShoulderSlope, backAcrossShoulder)
document.scaledOffset = (fullLengthBack - backShoulderSlopeRise) * document.scale; // for finding how far from the top to start finding h point

// calculating rises and runs for right angle formulas of SIDE SEAM
var sideSeamRiseScaled = document.pythagoreanCAndA(sideLength, (backArc) - (backDartIntake + waistArcBack)) * document.scale;
var offSetSideSeamRiseScaled = (document.scaledfullLengthBack + 0.1875 * document.scale) - sideSeamRiseScaled ;// y axis of point n

//Find shoulder coordinates through right triangle geometry
var lengthOfFToGScaled = document.pythagoreanAAndB((document.scaledBackAcrossShoulder - scaledBackNeck), document.scaledOffset);
console.log(lengthOfFToGScaled)
pointHXScaled = document.findLengthOfBiggerTriangleSide(lengthOfFToGScaled, (document.scaledBackAcrossShoulder - scaledBackNeck), backShoulderLength * document.scale) + (scaledBackNeck)
pointHYScaled = document.findLengthOfBiggerTriangleSide(lengthOfFToGScaled, document.scaledOffset, backShoulderLength * document.scale) 
console.log(pointHXScaled);
console.log(pointHYScaled);

// Calculate coordinates of shoulder dart along shoulder seam 
var shoulderDartXScaled = document.locatePointOnC(((backShoulderLength / 2) * document.scale), pointHXScaled - scaledBackNeck, (backShoulderLength * document.scale));
var shoulderDartYScaled = document.locatePointOnC(((backShoulderLength / 2) * document.scale), pointHYScaled, (backShoulderLength * document.scale));
	// Calculate points of shoulder dart along shoulder seam 
var shoulderDartLeg2XScaled = document.locatePointOnC(((backShoulderLength / 2 + 0.25) * document.scale), pointHXScaled - scaledBackNeck, (backShoulderLength * document.scale));
var shoulderDartLeg2YScaled  = document.locatePointOnC(((backShoulderLength / 2 ) * document.scale), pointHYScaled, (backShoulderLength * document.scale));
	// Calculate points of shoulder dart along shoulder seam 
var shoulderDartLeg1XScaled = document.locatePointOnC(((backShoulderLength / 2 - 0.25) * document.scale), pointHXScaled - scaledBackNeck, (backShoulderLength * document.scale));
var shoulderDartLeg1YScaled  = document.locatePointOnC(((backShoulderLength / 2 - 0.375) * document.scale), pointHYScaled, (backShoulderLength * document.scale));

//Calculate point for shoulder dart along line
	//Set up function as follows: (axisWanted1, axisWanted2, secondAxis1, secondAxis2, distance to travel)
shoulderDartApexX = document.findAxisForPointOnLine(shoulderDartXScaled,((dartPlacement + (backDartIntake / 2))  * document.scale), shoulderDartYScaled , (document.scaledfullLengthBack - (sideLength * document.scale)), 3 * document.scale)
console.log("scaled back neck: ", scaledBackNeck)
console.log("X: " , shoulderDartApexX)
	// Offset my axis point by the point at which the line starts on my grid at the shoulder
offsetShoulderDartApexX = (shoulderDartXScaled + scaledBackNeck) + shoulderDartApexX 
console.log("offset", offsetShoulderDartApexX)
shoulderDartApexY = Math.abs(document.findAxisForPointOnLine(shoulderDartYScaled , (document.scaledfullLengthBack - (sideLength * document.scale)),shoulderDartXScaled,((dartPlacement + (backDartIntake / 2))  * document.scale), 3 * document.scale))
	// Offset my axis point by the point at which the line starts on my grid at the shoulder
offsetShoulderDartApexY = shoulderDartYScaled  + shoulderDartApexY 
console.log("Y: " , shoulderDartApexY)


// set up pen and set colors for temporary lines
var penBack = draftingTable.getContext("2d");
penBack.fillStyle="#83AF9B";
penBack.strokeStyle = "#EA8C86";


// draw lines and dots
penBack.beginPath()
penBack.moveTo(0, 0);
penBack.fillRect(0,0, 3, 3); // a


//FULL LENGTH ***********************************************************
penBack.lineTo(0, (document.scaledfullLengthBack)); // a to b
penBack.fillRect(0, (document.scaledfullLengthBack), 3, 3); // b
penBack.moveTo(0, (((fullLengthBack - centerBack) - 0.375)*document.scale)); // move to neckline
penBack.lineTo(80, (((fullLengthBack - centerBack) - 0.375)*document.scale)); // d squared off


// ACROSS SHOULDER *******************************************************
penBack.moveTo(0, 0);
penBack.lineTo((document.scaledBackAcrossShoulder), 0); // a to c
penBack.lineTo((document.scaledBackAcrossShoulder), 100); // square off c


// BACK ARC **************************************************************
penBack.moveTo(0, (document.scaledfullLengthBack)); 
penBack.lineTo(document.scaledBackArc, (document.scaledfullLengthBack)); // b to e
penBack.lineTo(document.scaledBackArc, 60) // square up from e
penBack.moveTo(document.scaledDartPlacement, (document.scaledfullLengthBack)); 
penBack.fillRect(document.scaledDartPlacement, document.scaledfullLengthBack, 3, 3); // dart placement


// SLOPE *********************************************************
penBack.moveTo(0, document.scaledfullLengthBack); 
penBack.lineTo(document.scaledBackAcrossShoulder, document.scaledOffset) // b to g
penBack.fillRect(document.scaledBackAcrossShoulder, document.scaledOffset, 3, 3); // g


// SHOULDER DART ***************************************************************
shoulderDartXScaled
penBack.fillRect(shoulderDartXScaled + scaledBackNeck , shoulderDartYScaled, 3, 3); // center of shoulder dart
penBack.moveTo(shoulderDartXScaled+ scaledBackNeck, shoulderDartYScaled);
penBack.lineTo((dartPlacement + (backDartIntake / 2))  * document.scale, (document.scaledfullLengthBack - (sideLength * document.scale))); // point 0
	// Second Dart Leg
penBack.moveTo(shoulderDartLeg1XScaled + scaledBackNeck, shoulderDartLeg1YScaled)
penBack.lineTo(offsetShoulderDartApexX, offsetShoulderDartApexY);
penBack.lineTo(shoulderDartLeg2XScaled + scaledBackNeck, shoulderDartLeg2YScaled);


//SHOULDER AT NECK ***************************************************************
penBack.fillRect(scaledBackNeck, 0, 3, 3) // point f


// SHOULDER SEAM ***************************************************
penBack.moveTo(scaledBackNeck, 0) // point f
penBack.lineTo(pointHXScaled, pointHYScaled) // point h


// apply stroke to lines
penBack.stroke();





// CREATE FINAL DRAFT ***************************************************
var penFinalBack = draftingTable.getContext("2d");
penFinalBack.fillStyle= "black";
penFinalBack.strokeStyle = "black";


// instantiate lines and dots
penFinalBack.beginPath()
penFinalBack.moveTo(0, 0);


// CENTERFRONT 
penFinalBack.moveTo(0, (document.scaledFullLength), 3, 3); // b
penFinalBack.lineTo(+0.5, (((fullLengthBack - centerBack) -0.375)*document.scale)); // move to neckline, ofset half a pixel so it shows on the canvas better


// SHOULDER SEAM ***************************************************
penFinalBack.moveTo(scaledBackNeck, 0);
penFinalBack.lineTo(shoulderDartLeg1XScaled + scaledBackNeck, shoulderDartLeg1YScaled);
penFinalBack.lineTo(offsetShoulderDartApexX, offsetShoulderDartApexY);
penFinalBack.lineTo(shoulderDartLeg2XScaled + scaledBackNeck, shoulderDartLeg2YScaled);
penFinalBack.lineTo(pointHXScaled, pointHYScaled)


// ARMHOLE ***************************************************************
var bArmControlX = (acrossBack * 0.725) * document.scale;
var bArmControlY = ((offSetSideSeamRiseScaled / document.scale) / 0.986) * document.scale;
penFinalBack.moveTo(pointHXScaled, pointHYScaled); //starting point of curve
penFinalBack.quadraticCurveTo(bArmControlX ,bArmControlY ,(backArc * document.scale), offSetSideSeamRiseScaled); // needs to be calibrated

// NECKLINE ***************************************************************
var bNeckControlX = scaledBackNeck
var bNeckControlY = (((fullLengthBack - centerBack) - 0.375)*document.scale)
penFinalBack.moveTo(scaledBackNeck, 0); //starting point of curve
penFinalBack.quadraticCurveTo(bNeckControlX ,bNeckControlY ,(scaledBackNeck / 2), (((fullLengthBack - centerBack) - 0.375)*document.scale)); // needs to be calibrated
penFinalBack.lineTo(0, (((fullLengthBack - centerBack) - 0.375)*document.scale))

// WAIST DART LEGS ***************************************************************
penFinalBack.moveTo(0, document.scaledfullLengthBack);
penFinalBack.lineTo(dartPlacement * document.scale, document.scaledfullLengthBack + (0.125 * document.scale)); // line to i
penFinalBack.lineTo((dartPlacement + (backDartIntake / 2))  * document.scale, (document.scaledfullLengthBack - (sideLength * document.scale))); // point 0
penFinalBack.lineTo((dartPlacement + backDartIntake)  * document.scale, document.scaledfullLengthBack + (0.125 * document.scale)); // point k

// WAIST ARC *********************************************************************
penFinalBack.moveTo((dartPlacement + backDartIntake)  * document.scale, document.scaledfullLengthBack + (0.125 * document.scale)); // point k
penFinalBack.lineTo(((waistArcBack + backDartIntake + 0.24) * document.scale) , (document.scaledfullLengthBack + (0.1875 * document.scale))); // point m - waist arc with dart and ease


//SIDE SEAM
penFinalBack.lineTo((backArc * document.scale), offSetSideSeamRiseScaled); // point n



// apply stroke to lines
penFinalBack.stroke();


// create an image from the canvas

// var blockURLBack = draftingTable.toDataURL();

// console.log(blockURLBack)
});