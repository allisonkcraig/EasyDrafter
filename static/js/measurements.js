	document.processFrontForm = function(scaleIn) {

		document.scale = scaleIn || 20;

		//INPUT measurments.		
		document.fullLength = parseFloat($('form input[name="full-length"]').val()) * document.scale;
		document.centerFront = parseFloat($('form input[name="center-front"]').val()) * document.scale;
		document.frontShoulderSlope = parseFloat($('form input[name="front-shoulder-slope"]').val()) * document.scale;
		document.strap = parseFloat($('form input[name="strap"]').val()) * document.scale;
		document.frontAcrossShoulder = parseFloat($('form input[name="front-across-shoulder"]').val()) * document.scale;
		document.acrossChest = parseFloat($('form input[name="across-chest"]').val()) * document.scale;
		var bustDepth = parseFloat($('form input[name="bust-depth"]').val()) * document.scale;
		var shoulderLength = parseFloat($('form input[name="shoulder-length"]').val()) * document.scale;
		document.bustArc = parseFloat($('form input[name="bust-arc"]').val()) * document.scale;
		document.bustSpan = parseFloat($('form input[name="bust-span"]').val()) * document.scale;
		document.waistArc = parseFloat($('form input[name="waist-arc"]').val()) * document.scale;
		document.dartPlacement = parseFloat($('form input[name="dart-placement"]').val()) * document.scale;
		document.sideLength = parseFloat($('form input[name="side-length"]').val()) * document.scale;
		var bustEase = 0.25 // constant variable 	


		// calculating rises and runs for right angle formulas
		document.frontShoulderSlopeRise = pythagoreanCAndA((document.frontShoulderSlope + 0.125), document.frontAcrossShoulder);
		document.shoulderLengthRun = pythagoreanCAndA(shoulderLength,(document.fullLength - document.frontShoulderSlopeRise));
		document.strapRise = pythagoreanCAndA((document.strap + 0.375), ((document.bustArc + bustEase)- document.shoulderLengthRun));
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


		//Scaled Measurements
		document.scaledFullLength = document.fullLength * document.scale;
		document.scaledFrontAcrossShoulder = document.frontAcrossShoulder * document.scale;
		document.scaledBustArc = (document.bustArc + 0.25) * document.scale;
		document.scaledDartPlacement = document.dartPlacement * document.scale;
		document.scaledPointHX = document.pointHX * document.scale;
		document.scaledPointHY = document.pointHY * document.scale;
		document.scaledOffset = (document.fullLength - document.frontShoulderSlopeRise); // for finding how far from the top to start finding h point


	}



	document.processBackForm = function(scaleIn) {

		document.scale = scaleIn;
		// get from frotn draft jinja in session
		document.sideLength = parseFloat($('form input[name="side-length"]').val()) * document.scale;
		document.shoulderLength = parseFloat($('form input[name="shoulder-length"]').val())  * document.scale; 
		// INPUT measurements
		document.fullLengthBack = parseFloat($('form input[name="full-length-back"]').val()) * document.scale; 
		document.centerBack = parseFloat($('form input[name="center-back"]').val()) * document.scale;
		document.backShoulderSlope = parseFloat($('form input[name="back-shoulder-slope"]').val()) * document.scale ;
		document.acrossBack = parseFloat($('form input[name="across-back"]').val()) * document.scale;
		document.shoulderLength = parseFloat($('form input[name="shoulder-length"]').val())  * document.scale;
		document.backShoulderLength = document.shoulderLength + (0.5 * document.scale); // added dart intake for back dart
		document.backArc = (parseFloat($('form input[name="back-arc"]').val()) + 0.75) * document.scale;
		document.waistArcBack = parseFloat($('form input[name="waist-arc-back"]').val()) * document.scale;
		document.dartPlacement = parseFloat($('form input[name="dart-placement"]').val()) * document.scale;
		document.backNeck = parseFloat($('form input[name="back-neck"]').val())  * document.scale;
		document.backAcrossShoulder = parseFloat($('form input[name="back-across-shoulder"]').val()) * document.scale;
		document.backDartIntake = parseFloat($('form input[name="back-dart-intake"]').val()) * document.scale;
		
		
		//Scaled Measurements
		// document.scaledBackAcrossShoulder = document.backAcrossShoulder
		// document.scaledBackArc = document.backArc
		// document.scaledDartPlacement = document.dartPlacement 
		// document.scaledBackNeck =  document.backNeck 

		
		// Find slope offset o fron the top of the axis. -- point g's y axis 
		document.backShoulderSlopeRise = pythagoreanCAndA(document.backShoulderSlope, document.backAcrossShoulder); 
		document.scaledOffset = (document.fullLengthBack - document.backShoulderSlopeRise); // for finding how far from the top to start finding h point


		// calculating rises and runs for right angle formulas of SIDE SEAM
		document.sideSeamRiseScaled = pythagoreanCAndA(document.sideLength, document.backArc - document.backDartIntake + document.waistArcBack);
		document.offSetSideSeamRiseScaled = (document.fullLengthBack + (0.1875 * document.scale) - document.sideSeamRiseScaled);// y axis of point n

	
		//Find shoulder coordinates through right triangle geometry
		document.lengthOfFToGScaled = pythagoreanAAndB((document.backAcrossShoulder - document.backNeck), document.scaledOffset);
		document.pointHXScaled = findLengthOfBiggerTriangleSide(document.lengthOfFToGScaled, (document.backAcrossShoulder - document.backNeck), document.backShoulderLength + document.backNeck);
		document.pointHYScaled = findLengthOfBiggerTriangleSide(document.lengthOfFToGScaled, document.scaledOffset, document.backShoulderLength);

	
		// Calculate coordinates of shoulder dart along shoulder seam 
		document.shoulderDartXScaled = locatePointOnC(((document.backShoulderLength / 2)), document.pointHXScaled - document.backNeck, document.backShoulderLength);
		document.shoulderDartYScaled = locatePointOnC(((document.backShoulderLength / 2)), document.pointHYScaled, (document.backShoulderLength));
			// Calculate points of shoulder dart along shoulder seam 
		document.shoulderDartLeg2XScaled = locatePointOnC(((document.backShoulderLength / 2 + (0.25 * document.scale))), document.pointHXScaled - document.backNeck, document.backShoulderLength);
		document.shoulderDartLeg2YScaled  = locatePointOnC(((document.backShoulderLength / 2 )), document.pointHYScaled, (document.backShoulderLength));
			// Calculate points of shoulder dart along shoulder seam 
		document.shoulderDartLeg1XScaled = locatePointOnC(((document.backShoulderLength / 2 - (0.25  * document.scale))), document.pointHXScaled - document.backNeck, document.backShoulderLength);
		document.shoulderDartLeg1YScaled  = locatePointOnC(((document.backShoulderLength / 2 - (0.375  * document.scale))), document.pointHYScaled, document.backShoulderLength);


		//Calculate point for shoulder dart along line
			//Set up function as follows: (axisWanted1, axisWanted2, secondAxis1, secondAxis2, distance to travel)
		document.shoulderDartApexX = findAxisForPointOnLine(document.shoulderDartXScaled,((document.dartPlacement + (document.backDartIntake / 2)), document.shoulderDartYScaled , (document.fullLengthBack - document.sideLength), 3 * document.scale));
			// Offset my axis point by the point at which the line starts on my grid at the shoulder
		document.offsetShoulderDartApexX = (document.shoulderDartXScaled + document.backNeck) + document.shoulderDartApexX ;
		document.shoulderDartApexY = Math.abs(findAxisForPointOnLine(document.shoulderDartYScaled , (document.fullLengthBack - document.sideLength),document.shoulderDartXScaled,((document.dartPlacement + (document.backDartIntake / 2)), 3 * document.scale)));
			// Offset my axis point by the point at which the line starts on my grid at the shoulder
		document.offsetShoulderDartApexY = document.shoulderDartYScaled  + document.shoulderDartApexY ;


	}

	document.processSkirtForm = function(scaleIn) {
		document.scale = scaleIn || 20;
		document.offsetFromTop = 2 * document.scale; // allows for room at top of draft for hip details

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



