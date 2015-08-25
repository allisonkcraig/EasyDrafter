// Test for functions.js


describe("My pythagoreanCAndA function should", function () {

    it("should take two numbers and use them to find the length of another side of a right triangle", function () {
        expect(document.pythagoreanCAndA(3, 1)).toBe(2.8284271247461903);
    });

    it("should give NAN for a A side that is longer than Hypotoneuse", function () {
        expect(document.pythagoreanCAndA(1, 2)).toBeNaN();
    });

});


describe("My pythagoreanAAndB function should", function () {

    it("should take two numbers and use them to find the length of Hypotoneuse of a right triangle", function () {
        expect(document.pythagoreanAAndB(1, 2)).toBe(2.23606797749979);
    });

    it("should take two numbers and use them to find the length of Hypotoneuse of a right triangle", function () {
        expect(document.pythagoreanAAndB(1, 2)).toBe(2.23606797749979);
    });

});


describe("My locatePointOnC function should", function () {

    it("take coordinates and find a point along the Hypotoneuse", function () {
        expect(document.locatePointOnC(3, 5, 5)).toBe(3);
    });

    it("should take two numbers and use them to find the length of Hypotoneuse of a right triangle", function () {
         expect(document.locatePointOnC(3, 8, 5)).toBe(4.8);
    });

});


describe("My findLengthOfBiggerTriangleSide function should", function () {

    it("take coordinates and find a proportionatly bigger side of a triangle", function () {
        expect(document.findLengthOfBiggerTriangleSide(3, 4, 6)).toBe(8);
    });

});


// describe("My findAxisForPointOnLine function should", function () {

//     it("take coordinates and find a point along the Hypotoneuse", function () {
//         expect(document.findLengthOfBiggerTriangleSide(3, 4, 6)).toBe(8);
//     });

//     // it("should take two numbers and use them to find the length of Hypotoneuse of a right triangle", function () {
//     //      expect(document.findLengthOfBiggerTriangleSide(8, 3, 9)).toBe(3.375);
//     // });

// });


	// // Find point on a straight line with two (x,y) coordinates for each end where point 1 is the side you would like to start at.
	// // The first two coordinates you evaluate will be the axis you return (ie, entering x before y will return x, entering y before x will return y)
	// document.findAxisForPointOnLine = function(x1, x2, y1, y2, pixelsFromPoint1) {
	// 	var leg1 = x1 - x2;
	// 	// console.log("LEG 1: ", leg1)
	// 	var leg2 = y1 - y2;
	// 	// console.log("LEG 2: ", leg2)
	// 	//rise over run
	// 	var lenghtOfHypo = document.pythagoreanAAndB(leg1, leg2);
	// 	// console.log("LENGTH OF HYPO: ", lenghtOfHypo)
	// 	var x = pixelsFromPoint1 * leg1;
	// 	// console.log("X: ", x)
	// 	var axisFromOrigin = x / lenghtOfHypo;
	// 	// console.log("axisFromOrigin: ", axisFromOrigin)
	// 	return axisFromOrigin
	// };


