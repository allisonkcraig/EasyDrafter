
// basic measurements
var bust = 36.00;
var waist = 26.00;
/////////////////////////////////////////FRONT////////////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////BACK////////////////////////////////////////////////////////////////////////////////
// advanced measurements
document.fullLengthBack = 18;
document.centerBack = 17.25;
document.backShoulderSlope = 17.13 + 0.125;
document.acrossBack = 7;
document.shoulderLength = 5;
document.backShoulderLength = document.shoulderLength + 0.5 // added dart intake for back dart
document.backArc = 9 + 0.75;
document.acrossBack = 7.00;
document.waistArcBack = 6.25;
document.dartPlacement = 3.25;
document.backNeck = 3.00 - 0.125;
document.backAcrossShoulder = 7.63;
document.sideLength = 8.5;
document.backDartIntake = 1.5; //make radio button for regular and petite/junior


// Scaled Measurements
document.scale = 20;
document.scaledfullLengthBack = document.fullLengthBack * document.scale;
document.scaledBackAcrossShoulder = document.backAcrossShoulder * document.scale;
document.scaledBackArc = document.backArc * document.scale;
document.scaledDartPlacement = document.dartPlacement * document.scale;
document.scaledBackNeck =  document.backNeck * document.scale;

// Find slope offset o fron the top of the axis. -- point g's y axis 
document.backShoulderSlopeRise = document.pythagoreanCAndA( document.backShoulderSlope, document.backAcrossShoulder)
document.scaledOffset = (document.fullLengthBack - document.backShoulderSlopeRise) * document.scale; // for finding how far from the top to start finding h point

// calculating rises and runs for right angle formulas of SIDE SEAM
document.sideSeamRiseScaled = document.pythagoreanCAndA(document.sideLength, (document.backArc) - (document.backDartIntake + document.waistArcBack)) * document.scale;
document.offSetSideSeamRiseScaled = (document.scaledfullLengthBack + 0.1875 * document.scale) - document.sideSeamRiseScaled ;// y axis of point n

//Find shoulder coordinates through right triangle geometry
document.lengthOfFToGScaled = document.pythagoreanAAndB((document.scaledBackAcrossShoulder - document.scaledBackNeck), document.scaledOffset);
document.pointHXScaled = document.findLengthOfBiggerTriangleSide(document.lengthOfFToGScaled, (document.scaledBackAcrossShoulder - document.scaledBackNeck), document.backShoulderLength * document.scale) + (document.scaledBackNeck)
document.pointHYScaled = document.findLengthOfBiggerTriangleSide(document.lengthOfFToGScaled, document.scaledOffset, document.backShoulderLength * document.scale) 


// Calculate coordinates of shoulder dart along shoulder seam 
document.shoulderDartXScaled = document.locatePointOnC(((document.backShoulderLength / 2) * document.scale), document.pointHXScaled - document.scaledBackNeck, (document.backShoulderLength * document.scale));
document.shoulderDartYScaled = document.locatePointOnC(((document.backShoulderLength / 2) * document.scale), document.pointHYScaled, (document.backShoulderLength * document.scale));
	// Calculate points of shoulder dart along shoulder seam 
document.shoulderDartLeg2XScaled = document.locatePointOnC(((document.backShoulderLength / 2 + 0.25) * document.scale), document.pointHXScaled - document.scaledBackNeck, (document.backShoulderLength * document.scale));
document.shoulderDartLeg2YScaled  = document.locatePointOnC(((document.backShoulderLength / 2 ) * document.scale), document.pointHYScaled, (document.backShoulderLength * document.scale));
	// Calculate points of shoulder dart along shoulder seam 
document.shoulderDartLeg1XScaled = document.locatePointOnC(((document.backShoulderLength / 2 - 0.25) * document.scale), document.pointHXScaled - document.scaledBackNeck, (document.backShoulderLength * document.scale));
document.shoulderDartLeg1YScaled  = document.locatePointOnC(((document.backShoulderLength / 2 - 0.375) * document.scale), document.pointHYScaled, (document.backShoulderLength * document.scale));

//Calculate point for shoulder dart along line
	//Set up function as follows: (axisWanted1, axisWanted2, secondAxis1, secondAxis2, distance to travel)
document.shoulderDartApexX = document.findAxisForPointOnLine(document.shoulderDartXScaled,((document.dartPlacement + (document.backDartIntake / 2))  * document.scale), document.shoulderDartYScaled , (document.scaledfullLengthBack - (document.sideLength * document.scale)), 3 * document.scale)
	// Offset my axis point by the point at which the line starts on my grid at the shoulder
document.offsetShoulderDartApexX = (document.shoulderDartXScaled + document.scaledBackNeck) + document.shoulderDartApexX 
document.shoulderDartApexY = Math.abs(document.findAxisForPointOnLine(document.shoulderDartYScaled , (document.scaledfullLengthBack - (document.sideLength * document.scale)),document.shoulderDartXScaled,((document.dartPlacement + (document.backDartIntake / 2))  * document.scale), 3 * document.scale))
	// Offset my axis point by the point at which the line starts on my grid at the shoulder
document.offsetShoulderDartApexY = document.shoulderDartYScaled  + document.shoulderDartApexY 

