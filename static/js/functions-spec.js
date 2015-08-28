// Test for functions.js


describe("My pythagoreanCAndA function should", function () {

    it("should take two numbers and use them to find the length of another side of a right triangle", function () {
        expect(pythagoreanCAndA(3, 1)).toBe(2.8284271247461903);
    });

    it("should give NAN for a A side that is longer than Hypotoneuse", function () {
        expect(pythagoreanCAndA(1, 2)).toBeNaN();
    });

});


describe("My pythagoreanAAndB function should", function () {

    it("should take two numbers and use them to find the length of Hypotoneuse of a right triangle", function () {
        expect(pythagoreanAAndB(1, 2)).toBe(2.23606797749979);
    });

    it("should take two numbers and use them to find the length of Hypotoneuse of a right triangle", function () {
        expect(pythagoreanAAndB(4, 6)).toBe(7.211102550927978);
    });

});


describe("My locatePointOnC function should", function () {

    it("take coordinates and find a point along the Hypotoneuse", function () {
        expect(locatePointOnC(3, 5, 5)).toBe(3);
    });

    it("should take two numbers and use them to find the length of Hypotoneuse of a right triangle", function () {
         expect(locatePointOnC(3, 8, 5)).toBe(4.8);
    });

});


describe("My findLengthOfBiggerTriangleSide function should", function () {

    it("take coordinates and find a proportionatly bigger side of a triangle", function () {
        expect(findLengthOfBiggerTriangleSide(3, 4, 6)).toBe(8);
    });

});


describe("My determineDartIntakeSkirt function should", function () {

    it("return an approximate difference of a waist and a hip measurement", function () {
        expect(determineDartIntakeSkirt(29,39)).toBe(10);
    });

    it("return an approximate difference rounded when one number is a float", function () {
        expect(determineDartIntakeSkirt(24.5,39)).toBe(13);
    });


});





