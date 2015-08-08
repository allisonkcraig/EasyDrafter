
$(document).ready(function() {

	// right angle equations to find rise or run
	document.pythagoreanCAndA = function(c, a) {
		var sideB = Math.sqrt((Math.pow(c, y = 2)) - (Math.pow(a, y = 2)));
		return sideB
	};

	// right angle equations to find hypononeuse
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
		console.log('HI')
		var x = smallSideA * fullSideC;
		bigSideA =  x / smallSideC;
		return bigSideA
	};

	//Find point on a straight line with two (x,y) coordinates for each end where point 1 is the side you would like to start at.
	// The first two coordinates you evaluate will be the axis you return (ie, entering x before y will return x, entering y before x will return y)
	document.findAxisForPointOnLine = function(x1, x2, y1, y2, pixelsFromPoint1) {
		var leg1 = x1 - x2;
		// console.log("LEG 1: ", leg1)
		var leg2 = y1 - y2;
		// console.log("LEG 2: ", leg2)
		//rise over run
		var lenghtOfHypo = document.pythagoreanAAndB(leg1, leg2);
		// console.log("LENGTH OF HYPO: ", lenghtOfHypo)
		var x = pixelsFromPoint1 * leg1;
		// console.log("X: ", x)
		var axisFromOrigin = x / lenghtOfHypo;
		// console.log("axisFromOrigin: ", axisFromOrigin)
		return axisFromOrigin
	};

})