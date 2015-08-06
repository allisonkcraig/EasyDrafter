$( document ).ready(function() {
	
// establish drafting table and pen
var draftingTable = document.getElementById("drafting-table-front");

var gridPenFront = draftingTable.getContext("2d");

// y axis grid lines
for (var y = 0.5; y < 461; y += 20) {
	gridPenFront.beginPath();
	gridPenFront.moveTo(0, y);
	gridPenFront.lineTo(601, y);
	gridPenFront.strokeStyle = "#E8E8EE";
	gridPenFront.stroke();
	};

// x axis grid lines
for (var x = 0.5; x < 601; x += 20) {
	gridPenFront.beginPath();
	gridPenFront.strokeStyle = "#E8E8EE";
	gridPenFront.moveTo(x, 0);
	gridPenFront.lineTo(x, 601);
	gridPenFront.stroke();
	};


// basic measurements
var pattern_nickname = "Allison's-First-Pattern.png"
var bust = 36.00;
var waist = 26.00;
var abdomen = 34.25;

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
var sideLength = 8.5

// calculating rises and runs for right angle formulas
document.frontShoulderSlopeRise = document.pythagoreanCAndA((document.frontShoulderSlope + 0.125), document.frontAcrossShoulder);
document.shoulderLengthRun = document.pythagoreanCAndA(document.shoulderLength,(document.fullLength - document.frontShoulderSlopeRise));
document.strapRise = document.pythagoreanCAndA((document.strap + 0.375), ((document.bustArc +0.25)- document.shoulderLengthRun));
document.sideLengthRise = document.pythagoreanCAndA(sideLength, 1.25)

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


// START TEMPORARY LINES ////////////////////////////////////////////////////////
// set up pen and set colors for temporary lines
var pen = draftingTable.getContext("2d");
pen.fillStyle="#83AF9B";
pen.strokeStyle = "#EA8C86";


// draw lines and dots
pen.beginPath()
pen.moveTo(0, 0);


// FULL LENGTH ***********************************************************
pen.lineTo(0, (document.scaledFullLength)); // a to b
pen.moveTo(0, (((document.fullLength - document.centerFront) -0.375)*document.scale)); // move to neckline
pen.lineTo(80, (((document.fullLength - document.centerFront) -0.375)*document.scale)); // d squared off


// ACROSS SHOULDER *******************************************************
pen.moveTo(0, 0);
pen.lineTo((document.scaledFrontAcrossShoulder), 0); // a to c
pen.lineTo((document.scaledFrontAcrossShoulder), 100); // square off c


// BUST ARC **************************************************************
pen.moveTo(0, (document.scaledFullLength)); 
pen.lineTo(document.scaledBustArc, (document.scaledFullLength)); // b to e
pen.lineTo(document.scaledBustArc, 60) // square up from e
pen.moveTo(document.scaledDartPlacement, (document.scaledFullLength)); 


// SHOULDER STRAP *********************************************************
pen.moveTo(0, document.scaledFullLength); 
pen.lineTo(document.scaledFrontAcrossShoulder, document.scaledOffset) // b to g


// BUST POINT *************************************************************
pen.fillRect(document.scaledPointHX, (document.scaledOffset + document.scaledPointHY), 3, 3); //calculate point h
pen.moveTo(0, (document.scaledOffset + document.scaledPointHY)) // point L


// BUST POINT **************************************************************
pen.lineTo((document.bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY)); // to point M (bust point)


// DART LEGS ***************************************************************
pen.moveTo((document.bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY))
pen.lineTo(document.scaledDartPlacement, (document.scaledFullLength))// line to f
// second dart
pen.moveTo((document.bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY))
pen.lineTo(document.dartX * document.scale, document.dartY * document.scale);// line to second dart leg


// ACROSS CHEST ***************************************************************
pen.moveTo(0, (((document.scaledPointHY)- ((document.fullLength - document.centerFront) -0.375 * document.scale))) /3 + document.scaledOffset);
pen.lineTo((document.acrossChest + 0.25) * document.scale, (((document.scaledPointHY)- ((document.fullLength - document.centerFront) -0.375 * document.scale))) /3 + document.scaledOffset, 5, 5); //to point O


// SHOULDER ***************************************************************
pen.moveTo((document.scaledFrontAcrossShoulder), (document.scaledOffset)) // b to g
pen.lineTo(((document.frontAcrossShoulder - document.shoulderLengthRun) * document.scale), 0); // g to i

 
// HELPER LINES **********************************************************
pen.lineTo( document.scaledBustArc, (document.strapRise * document.scale)) // i to j
pen.lineTo(((document.bustArc + 1.5)* document.scale), ((document.strapRise * document.scale) + (document.sideLengthRise * document.scale)) )// j to k
pen.lineTo(document.scaledDartPlacement, (document.scaledFullLength))// line to f


// apply stroke to lines
pen.stroke();




// START FINAL LINES ////////////////////////////////////////////////////////
var penFinalFront = draftingTable.getContext("2d");
penFinalFront.fillStyle= "black";
penFinalFront.strokeStyle = "black";


// instantiate lines and dots
penFinalFront.beginPath();
penFinalFront.moveTo(0, 0);


// CENTERFRONT 
penFinalFront.moveTo(0, (document.scaledFullLength), 3, 3); // b
penFinalFront.lineTo(+0.5, (((document.fullLength - document.centerFront) -0.375)*document.scale)); // move to neckline, ofset half a pixel so it shows on the canvas better


// DART LEGS ***************************************************************
penFinalFront.moveTo((document.bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY));
penFinalFront.lineTo(document.scaledDartPlacement, (document.scaledFullLength)); // line to f
penFinalFront.lineTo(0, (document.scaledFullLength))
penFinalFront.moveTo((document.bustSpan * document.scale), (document.scaledOffset + document.scaledPointHY));
penFinalFront.lineTo(document.dartX * document.scale, document.dartY * document.scale);// line to second dart leg


// WAIST SIDE OF DART ******************************************************
penFinalFront.lineTo(((document.bustArc + 1.5)* document.scale), ((document.strapRise * document.scale) + (document.sideLengthRise * document.scale)) )


// SIDE SEAM ******************************************************
penFinalFront.lineTo( document.scaledBustArc, (document.strapRise * document.scale)) // i to j


// SHOULDER ***************************************************************
penFinalFront.moveTo((document.scaledFrontAcrossShoulder), (document.scaledOffset)); // b to g
penFinalFront.lineTo(((document.frontAcrossShoulder - document.shoulderLengthRun) * document.scale), 0); // g to i


// ARMHOLE ***************************************************************
var controlx = (document.acrossChest * 0.725) * document.scale;
var controly = (document.strapRise / 0.886) * document.scale;
penFinalFront.moveTo((document.scaledFrontAcrossShoulder), (document.scaledOffset));
penFinalFront.quadraticCurveTo(controlx ,controly ,document.scaledBustArc, (document.strapRise * document.scale)); // needs to be calibrated


// NECKLINE ***************************************************************
var fNeckControlX = (document.frontAcrossShoulder - document.shoulderLengthRun) * document.scale;
var fNeckControlY = ((document.fullLength - document.centerFront) - 0.375)*document.scale;
penFinalFront.moveTo((document.frontAcrossShoulder - document.shoulderLengthRun) * document.scale, 0); //starting point of curve
penFinalFront.quadraticCurveTo(fNeckControlX ,fNeckControlY ,0, (((document.fullLength - document.centerFront) - 0.375)*document.scale)); // needs to be calibrated
penFinalFront.lineTo(0, (((document.fullLength - document.centerFront) - 0.375)*document.scale));


// apply stroke to lines
penFinalFront.stroke();

// create an image from the canvas

var blockURL = draftingTable.toDataURL();

var image = $('<img>').attr('src', blockURL);
$('body').append(image);

// console.log(blockURL)
// followed the tutorial at this link to use jQuery to save an image http://www.htmlgoodies.com/html5/markup/using-the-html5-download-attribute.html#fbid=69jJQ3N3m89
 $('#save-front').on('click', function(){ 	
 	$('body').append($('<a>')       				//append a new '<a>' element to the DOM
        .css('display', 'none')             		//hide the new '<a>' element
          .attr('href', image.attr('src'))  		//make the image path the link href
            .attr('download', pattern_nickname)     //keep the file name
              .append(image.clone()))       		//copy the image into the new '<a>' element
                .find('img:last()')         		//obtain a reference to the copied image
                  .trigger( 'click' );
	//image.attr('download', 'my_pattern.jpg').trigger('click');

//  	$('save-front').attr('download', 'blockURL');
 })
// DECIDE HOW TO USE URL OBJECT TO EITHER SAVE OR VIEW IMAGE

// var output = blockURL.replace(/^data:image\/(png|jpg);base64,/, "");
// console.log(output)
// $('#thing').attr('action', 'output');


// document.getElementById('canvasImg').src = blockURL;

});


