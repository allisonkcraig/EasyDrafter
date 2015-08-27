	document.processFrontForm = function(scaleIn) {

		document.scale = scaleIn || 20;

		//INPUT measurments.		
		document.fullLength = parseFloat($('form input[name="full-length"]').val());
		document.centerFront = parseFloat($('form input[name="center-front"]').val());
		document.frontShoulderSlope = parseFloat($('form input[name="front-shoulder-slope"]').val());
		document.strap = parseFloat($('form input[name="strap"]').val());
		document.frontAcrossShoulder = parseFloat($('form input[name="front-across-shoulder"]').val());
		document.acrossChest = parseFloat($('form input[name="across-chest"]').val());
		bustDepth = parseFloat($('form input[name="bust-depth"]').val());
		var shoulderLength = parseFloat($('form input[name="shoulder-length"]').val());
		document.bustArc = parseFloat($('form input[name="bust-arc"]').val());
		document.bustSpan = parseFloat($('form input[name="bust-span"]').val());
		document.waistArc = parseFloat($('form input[name="waist-arc"]').val());
		document.dartPlacement = parseFloat($('form input[name="dart-placement"]').val());
		document.sideLength = parseFloat($('form input[name="side-length"]').val());
		document.bustEase = 0.25 // constant variable 	


		// calculating rises and runs for right angle formulas
		document.frontShoulderSlopeRise = pythagoreanCAndA((document.frontShoulderSlope + 0.125), document.frontAcrossShoulder);
		document.shoulderLengthRun = pythagoreanCAndA(shoulderLength,(document.fullLength - document.frontShoulderSlopeRise));
		document.strapRise = pythagoreanCAndA((document.strap + 0.375), ((document.bustArc + document.bustEase)- document.shoulderLengthRun));
		document.sideLengthRise = pythagoreanCAndA(document.sideLength, 1.25)


		// calling functions for calulating point H
		document.pointHX = locatePointOnC(bustDepth, document.frontAcrossShoulder, document.frontShoulderSlope);
		document.pointHY = locatePointOnC(bustDepth, document.frontShoulderSlopeRise, document.frontShoulderSlope);


		// Calculate distance and rise and run of second dart leg
		document.waistRemaining = document.waistArc - document.dartPlacement // find the remaining waist needed
		document.dartLegRise = document.fullLength - (document.strapRise  + document.sideLengthRise)
		document.dartLegRun = (document.bustArc + 1.25 + 0.25) - document.dartPlacement
		document.dartLegC = pythagoreanAAndB(document.dartLegRun, document.dartLegRise) // length of f to k
		document.dartY = document.fullLength - locatePointOnC(document.waistRemaining, document.dartLegRise, document.dartLegC)
		document.dartX = (document.bustArc + 1.25) - locatePointOnC(document.waistRemaining, document.dartLegRun, document.dartLegC)


		// Scaled Measurements
		document.scaledFullLength = document.fullLength * document.scale;
		document.scaledFrontAcrossShoulder = document.frontAcrossShoulder * document.scale;
		document.scaledBustArc = (document.bustArc + 0.25) * document.scale;
		document.scaledDartPlacement = document.dartPlacement * document.scale;
		document.scaledPointHX = document.pointHX * document.scale;
		document.scaledPointHY = document.pointHY * document.scale;
		document.scaledOffset = (document.fullLength - document.frontShoulderSlopeRise) * document.scale; // for finding how far from the top to start finding h point


	}



	document.processBackForm = function(scaleIn) {

		document.scale = scaleIn || 20;
		// get from frotn draft jinja in session
		document.sideLength = parseFloat($('form input[name="side-length"]').val());
		document.shoulderLength = parseFloat($('form input[name="shoulder-length"]').val()); 
		// INPUT measurements
		document.fullLengthBack = parseFloat($('form input[name="full-length-back"]').val());
		document.centerBack = parseFloat($('form input[name="center-back"]').val());
		document.backShoulderSlope = parseFloat($('form input[name="back-shoulder-slope"]').val());
		document.acrossBack = parseFloat($('form input[name="across-back"]').val());
		document.shoulderLength = parseFloat($('form input[name="shoulder-length"]').val());
		document.backShoulderLength = document.shoulderLength + 0.5; // added dart intake for back dart
		document.backArc = parseFloat($('form input[name="back-arc"]').val()) + 0.75;
		document.waistArcBack = parseFloat($('form input[name="waist-arc-back"]').val());
		document.dartPlacement = parseFloat($('form input[name="dart-placement"]').val());
		document.backNeck = parseFloat($('form input[name="back-neck"]').val());
		document.backAcrossShoulder = parseFloat($('form input[name="back-across-shoulder"]').val());
		document.backDartIntake = parseFloat($('form input[name="back-dart-intake"]').val());
		
		
		// Scaled Measurements
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


	}

	document.processSkirtForm = function(scaleIn) {
		document.scale = scaleIn || 20;
		document.offsetFromTop = 2 * document.scale // allows for room at top of draft for hip details

		document.waistArcEase = 0.25  * document.scale; // constant variable
		document.hipRise = 0.25 * document.scale; // constant variable
		document.backDartLength = 5.5 * document.scale; // constant variable
		document.frontDartLength = 3.5 * document.scale; // constant variable
		document.spaceBetweenDarts = 1.25 * document.scale; // constant variable
		document.hipArcEase = 0.5 * document.scale; //constant variable
		document.waistToKnee = 25 * document.scale; 

		//from form on skirt-draft.html
		document.waist = parseFloat($('form input[name="waist"]').val()) * document.scale; 
		document.hip = parseFloat($('form input[name="hip"]').val()) * document.scale;
		document.centerFrontHipDepth = parseFloat($('form input[name="center-front-hip-depth"]').val()) * document.scale;
		document.backHipArc = (parseFloat($('form input[name="back-hip-arc"]').val()) * document.scale) + document.hipArcEase;
		document.centerBackHipDepth = (parseFloat($('form input[name="center-back-hip-depth"]').val()) * document.scale) + document.hipArcEase;
		document.frontHipArc = parseFloat($('form input[name="front-hip-arc"]').val()) * document.scale;
		document.dartPlacement = parseFloat($('form input[name="dart-placement"]').val()) * document.scale;
		
		//calculations
		determineDartIntakeSkirt(document.waist, document.hip, document.scale);
		document.addToFrontWaistArc = ((document.frontDartIntake * document.frontNumOfDarts) + document.waistArcEase)
		document.addToBackWaistArc = ((document.backDartIntake * document.backNumOfDarts) + document.waistArcEase) 
		document.pointOfHipCurve = ((document.centerFrontHipDepth / 3) * 2) + document.offsetFromTop
		document.frontWaistArc = (6.75 * document.scale) + document.addToFrontWaistArc;
		document.backWaistArc = (6.25 * document.scale) + document.addToBackWaistArc;
	}



