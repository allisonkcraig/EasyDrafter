// basic measurements
var pattern_nickname = "Allison's-First-Pattern.png"
var bust = 36.00;
var waist = 26.00;





/////////////////////////////////////////FRONT////////////////////////////////////////////////////////////////////////////////
// advanced measurements
document.fullLength = 17.75;
document.centerFront = 15.00;
document.frontShoulderSlope = 17.25;
document.strap = 10.00;
document.frontAcrossShoulder = 7.50;
document.acrossChest = 6.37;
document.bustDepth = 9.25;
document.shoulderLength = 5;
document.bustArc = 9.75;
document.bustSpan = 3.75;
document.waistArc = 6.86;
document.dartPlacement = 3.25;
document.sideLength = 8.5;


// calculating rises and runs for right angle formulas
document.frontShoulderSlopeRise = document.pythagoreanCAndA((document.frontShoulderSlope + 0.125), document.frontAcrossShoulder);
document.shoulderLengthRun = document.pythagoreanCAndA(document.shoulderLength,(document.fullLength - document.frontShoulderSlopeRise));
document.strapRise = document.pythagoreanCAndA((document.strap + 0.375), ((document.bustArc +0.25)- document.shoulderLengthRun));
document.sideLengthRise = document.pythagoreanCAndA(document.sideLength, 1.25)


// calling functions for calulating point H
document.pointHX = document.locatePointOnC(document.bustDepth, document.frontAcrossShoulder, document.frontShoulderSlope);
document.pointHY = document.locatePointOnC(document.bustDepth, document.frontShoulderSlopeRise, document.frontShoulderSlope);


// Calculate distance and rise and run of second dart leg
document.waistRemaining = document.waistArc - document.dartPlacement // find the remaining waist needed
document.dartLegRise = document.fullLength - (document.strapRise  + document.sideLengthRise)
document.dartLegRun = (document.bustArc + 1.25 + 0.25) - document.dartPlacement
document.dartLegC = document.pythagoreanAAndB(document.dartLegRun, document.dartLegRise) // length of f to k
document.dartY = document.fullLength - document.locatePointOnC(document.waistRemaining, document.dartLegRise, document.dartLegC)
document.dartX = (document.bustArc + 1.25) - document.locatePointOnC(document.waistRemaining, document.dartLegRun, document.dartLegC)


// Scaled Measurements
document.scale = 20;
document.scaledFullLength = document.fullLength * document.scale;
document.scaledFrontAcrossShoulder = document.frontAcrossShoulder * document.scale;
document.scaledBustArc = (document.bustArc + 0.25) * document.scale;
document.scaledDartPlacement = document.dartPlacement * document.scale;
document.scaledPointHX = document.pointHX * document.scale;
document.scaledPointHY = document.pointHY * document.scale;
document.scaledOffset = (document.fullLength - document.frontShoulderSlopeRise) * document.scale; // for finding how far from the top to start finding h point





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

