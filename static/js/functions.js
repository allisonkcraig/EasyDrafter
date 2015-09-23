

	// right angle equations to find rise or run
	var pythagoreanCAndA = function(c, a) {
		var sideB = Math.sqrt((Math.pow(c, y = 2)) - (Math.pow(a, y = 2)));
		return sideB
	};

	// right angle equations to find hypononeuse
	var pythagoreanAAndB = function(a, b) {
		var sideC = Math.sqrt((Math.pow(a, y = 2)) + (Math.pow(b, y = 2)));
		return sideC
	};


	// find the coordinates for a point on side c of a right trainagle with the sides of a proportionatly bigger trinagle
	var locatePointOnC = function(distanceOnC, fullSideX, fullSideC) {
		var x = distanceOnC * fullSideX;
		return x / fullSideC
	};


	// find a proportionatly bigger traingle from sides of smaller traingle given 
	var findLengthOfBiggerTriangleSide = function(smallSideC, smallSideA, fullSideC) {
		var x = smallSideA * fullSideC;
		bigSideA =  x / smallSideC;
		return bigSideA
	};


	// Find point on a straight line with two (x,y) coordinates for each end where point 1 is the side you would like to start at.
	// The first two coordinates you evaluate will be the axis you return (ie, entering x before y will return x, entering y before x will return y)
	var findAxisForPointOnLine = function(x1, x2, y1, y2, pixelsFromPoint1) {
		var leg1 = x1 - x2;
		// console.log("LEG 1: ", leg1)
		var leg2 = y1 - y2;
		// console.log("LEG 2: ", leg2)
		//rise over run
		var lenghtOfHypo = pythagoreanAAndB(leg1, leg2);
		// console.log("LENGTH OF HYPO: ", lenghtOfHypo)
		var x = pixelsFromPoint1 * leg1;
		// console.log("X: ", x)
		var axisFromOrigin = x / lenghtOfHypo;
		// console.log("axisFromOrigin: ", axisFromOrigin)
		return axisFromOrigin
	};


	// Clear the canvas so I can re-draft using update measurements 
	var clearCanvas = function(context) {
		context.clearRect(0, 0, 461, 461);
	};
	

	var determineDartIntakeSkirt =  function(waist, hip, scale){
		var difference = hip - waist

		if (difference > 12) {
			document.frontDartIntake = 0.625 * scale;
			document.backDartIntake = 1.375 * scale;
			document.frontNumOfDarts = 2;
			document.backNumOfDarts = 2;
			document.dartDifferent = 13;
			return document.dartDifferent 
		} else if (difference > 11) {
			document.frontDartIntake = 0.625 * scale;
			document.backDartIntake = 1.375 * scale;
			document.frontNumOfDarts = 2;
			document.backNumOfDarts = 2;
			document.dartDifferent = 12;
			return document.dartDifferent 
		} else if (difference > 10) {
			document.frontDartIntake = 0.625 * scale;
			document.backDartIntake = 1.25 * scale;
			document.frontNumOfDarts = 2;
			document.backNumOfDarts = 2;
			document.dartDifferent = 11;
			return document.dartDifferent 
		} else if (difference > 9) {
			document.frontDartIntake = 0.5 * scale;
			document.backDartIntake = 1 * scale;
			document.frontNumOfDarts = 2;
			document.backNumOfDarts = 2;
			document.dartDifferent = 10;
			return document.dartDifferent 
		} else if (difference > 7) {
			document.frontDartIntake = 0.375 * scale;
			document.backDartIntake = 0.875 * scale;
			document.frontNumOfDarts = 2;
			document.backNumOfDarts = 2;
			document.dartDifferent = 8;
			return document.dartDifferent 
		} else if (difference > 6) {
			document.frontDartIntake = 0.5 * scale;
			document.backDartIntake = 0.75 * scale;
			document.frontNumOfDarts = 1;
			document.backNumOfDarts = 2;
			document.dartDifferent = 7;
			return document.dartDifferent 
		} else if (difference > 5) {
			document.frontDartIntake = 0.5 * scale;
			document.backDartIntake = 0.625 * scale;
			document.frontNumOfDarts = 1;
			document.backNumOfDarts = 2;
			document.dartDifferent = 6;
			return document.dartDifferent 
		} else if (difference > 4) {
			document.frontDartIntake = 0.5 * scale;
			document.backDartIntake = 1 * scale;
			document.frontNumOfDarts = 1;
			document.backNumOfDarts = 1;
			document.dartDifferent = 5;
			return document.dartDifferent 
		} else if (difference > 3) {
			document.frontDartIntake = 0.5 * scale;
			document.backDartIntake = 0.75 * scale;
			document.frontNumOfDarts = 1;
			document.backNumOfDarts = 1;
			document.dartDifferent = 4
			return document.dartDifferent 
		}

	}


