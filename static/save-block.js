$(document).ready(function() {

document.blockURL = document.draftingTableFront.toDataURL();

document.image = $('<img>').attr('src', document.blockURL);
$('body').append(document.image);

// console.log(document.blockURL)
// followed the tutorial at this link to use jQuery to save an image http://www.htmlgoodies.com/html5/markup/using-the-html5-download-attribute.html#fbid=69jJQ3N3m89
 $('#save-front').on('click', function(){ 	
 	$('body').append($('<a>')       				//append a new '<a>' element to the DOM
        .css('display', 'none')             		//hide the new '<a>' element
          .attr('href', document.image.attr('src')) //make the image path the link href
            .attr('download', document.pattern_nickname)     //keep the file name
              .append(document.image.clone()))      //copy the image into the new '<a>' element
                .find('img:last()')         		//obtain a reference to the copied image
                  .trigger( 'click' );
	//image.attr('download', 'my_pattern.jpg').trigger('click');

//  	$('save-front').attr('download', 'document.blockURL');
 });


// document.blockURL = document.draftingTableBack.toDataURL();
// document.image = $('<img>').attr('src', document.blockURL);s
// // document.image = $('<img>').attr('src', document.blockURL);
// // $('body').append(document.image);

//  $('#save-back').on('click', function(){ 	
//  	$('body').append($('<a>')       				//append a new '<a>' element to the DOM
//         .css('display', 'none')             		//hide the new '<a>' element
//           .attr('href', document.image.attr('src')) //make the image path the link href
//             .attr('download', document.pattern_nickname)     //keep the file name
//               .append(document.image.clone()))      //copy the image into the new '<a>' element
//                 .find('img:last()')         		//obtain a reference to the copied image
//                   .trigger( 'click' );

//  });

})


