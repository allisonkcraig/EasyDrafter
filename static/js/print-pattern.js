var doc;
$('#save-front').on('click', 
	function(){

		setTimeout(function() {	
			
			document.draftingTableFront = document.getElementById("drafting-table-front-large");

			var imageData = document.draftingTableFront.toDataURL("image/jpeg");
			var image = new Image();
			image = Canvas2Image.convertToJPEG(document.draftingTableFront);
			var doc = new jsPDF();
			doc.addImage(imageData, 'JPEG', 12, 10);
			var croppingYPosition = 999;
			var croppingXPosition = 699;
			count = (image.height) / 1001;
			countx = (image.width) / 701;


			for (var i = 1; i < count; i++) {
				
				doc.addPage();
                        var sourceX = 0; // where we start stealing image
                        var sourceY = croppingYPosition;
                        var sourceWidth = image.width; // controls how big of an image we steal from the sourc image
                        var sourceHeight = image.height;
                        var destWidth = sourceWidth;  // controll how big image is on PDF
                        var destHeight = sourceHeight; // scales exponentially
                        var destX = 0; //where top left corver goes on PDF
                        var destY = 0;
                        var canvas1 = document.createElement('canvas');
                        canvas1.setAttribute('height', destHeight);
                        canvas1.setAttribute('width', destWidth);                         
                        var ctx = canvas1.getContext("2d");
                        ctx.drawImage(image, sourceX, 
                        	sourceY,
                        	sourceWidth,
                        	sourceHeight, 
                        	destX, 
                        	destY, 
                        	destWidth, 
                        	destHeight);
                        var image2 = new Image();
                        image2 = Canvas2Image.convertToJPEG(canvas1);
                        image2Data = image2.src;
                        doc.addImage(image2Data, 'JPEG', 12, 10);
                        croppingYPosition += destHeight;              
                    };    

                    for (var i = 1; i < count; i++) {
                    	
                    	doc.addPage();
                        var sourceX = croppingXPosition; // where we start stealing image
                        var sourceY = 0;
                        var sourceWidth = image.width; // controls how big of an image we steal from the sourc image
                        var sourceHeight = image.height;
                        var destWidth = sourceWidth; // controll how big image is on PDF
                        var destHeight = sourceHeight;
                        var destX = 0; //where top left corver goes on PDF
                        var destY = 0;
                        var canvas1 = document.createElement('canvas');
                        canvas1.setAttribute('height', destHeight);
                        canvas1.setAttribute('width', destWidth);                         
                        var ctx = canvas1.getContext("2d");
                        ctx.drawImage(image, sourceX, 
                        	sourceY,
                        	sourceWidth,
                        	sourceHeight, 
                        	destX, 
                        	destY, 
                        	destWidth, 
                        	destHeight);
                        var image2 = new Image();
                        image2 = Canvas2Image.convertToJPEG(canvas1);
                        image2Data = image2.src;
                        doc.addImage(image2Data, 'JPEG', 12, 10);
                        croppingYPosition += destHeight;              
                    };              
                    var croppingYPosition = 999;

                    for (var i = 1; i < count; i++) {
                    	console.log("Page 3")
                    	doc.addPage();
                        var sourceX = croppingXPosition; // where we start stealing image
                        var sourceY = croppingYPosition;
                        var sourceWidth = image.width; // controls how big of an image we steal from the sourc image
                        var sourceHeight = image.height;
                        var destWidth = sourceWidth; // controll how big image is on PDF
                        var destHeight = sourceHeight;
                        var destX = 0; //where top left corver goes on PDF
                        var destY = 0;
                        var canvas1 = document.createElement('canvas');
                        canvas1.setAttribute('height', destHeight);
                        canvas1.setAttribute('width', destWidth);                         
                        var ctx = canvas1.getContext("2d");
                        ctx.drawImage(image, sourceX, 
                        	sourceY,
                        	sourceWidth,
                        	sourceHeight, 
                        	destX, 
                        	destY, 
                        	destWidth, 
                        	destHeight);
                        var image2 = new Image();
                        image2 = Canvas2Image.convertToJPEG(canvas1);
                        image2Data = image2.src;
                        doc.addImage(image2Data, 'JPEG', 12, 10);
                        croppingYPosition += destHeight;              
                    };            
                    doc.save("pattern-front.pdf");
                }, 500);
});

$('#save-back').on('click', 
    function(){

        setTimeout(function() { 
            
            document.draftingTableFront = document.getElementById("drafting-table-back-large");

            var imageData = document.draftingTableFront.toDataURL("image/jpeg");
            var image = new Image();
            image = Canvas2Image.convertToJPEG(document.draftingTableFront);
            var doc = new jsPDF();
            doc.addImage(imageData, 'JPEG', 12, 10);
            var croppingYPosition = 999;
            var croppingXPosition = 699;
            count = (image.height) / 1001;
            countx = (image.width) / 701;


            for (var i = 1; i < count; i++) {
                
                doc.addPage();
                        var sourceX = 0; // where we start stealing image
                        var sourceY = croppingYPosition;
                        var sourceWidth = image.width; // controls how big of an image we steal from the sourc image
                        var sourceHeight = image.height;
                        var destWidth = sourceWidth;  // controll how big image is on PDF
                        var destHeight = sourceHeight; // scales exponentially
                        var destX = 0; //where top left corver goes on PDF
                        var destY = 0;
                        var canvas1 = document.createElement('canvas');
                        canvas1.setAttribute('height', destHeight);
                        canvas1.setAttribute('width', destWidth);                         
                        var ctx = canvas1.getContext("2d");
                        ctx.drawImage(image, sourceX, 
                            sourceY,
                            sourceWidth,
                            sourceHeight, 
                            destX, 
                            destY, 
                            destWidth, 
                            destHeight);
                        var image2 = new Image();
                        image2 = Canvas2Image.convertToJPEG(canvas1);
                        image2Data = image2.src;
                        doc.addImage(image2Data, 'JPEG', 12, 10);
                        croppingYPosition += destHeight;              
                    };    

                    for (var i = 1; i < count; i++) {
                        
                        doc.addPage();
                        var sourceX = croppingXPosition; // where we start stealing image
                        var sourceY = 0;
                        var sourceWidth = image.width; // controls how big of an image we steal from the sourc image
                        var sourceHeight = image.height;
                        var destWidth = sourceWidth; // controll how big image is on PDF
                        var destHeight = sourceHeight;
                        var destX = 0; //where top left corver goes on PDF
                        var destY = 0;
                        var canvas1 = document.createElement('canvas');
                        canvas1.setAttribute('height', destHeight);
                        canvas1.setAttribute('width', destWidth);                         
                        var ctx = canvas1.getContext("2d");
                        ctx.drawImage(image, sourceX, 
                            sourceY,
                            sourceWidth,
                            sourceHeight, 
                            destX, 
                            destY, 
                            destWidth, 
                            destHeight);
                        var image2 = new Image();
                        image2 = Canvas2Image.convertToJPEG(canvas1);
                        image2Data = image2.src;
                        doc.addImage(image2Data, 'JPEG', 12, 10);
                        croppingYPosition += destHeight;              
                    };              
                    var croppingYPosition = 999;

                    for (var i = 1; i < count; i++) {
                        console.log("Page 3")
                        doc.addPage();
                        var sourceX = croppingXPosition; // where we start stealing image
                        var sourceY = croppingYPosition;
                        var sourceWidth = image.width; // controls how big of an image we steal from the sourc image
                        var sourceHeight = image.height;
                        var destWidth = sourceWidth; // controll how big image is on PDF
                        var destHeight = sourceHeight;
                        var destX = 0; //where top left corver goes on PDF
                        var destY = 0;
                        var canvas1 = document.createElement('canvas');
                        canvas1.setAttribute('height', destHeight);
                        canvas1.setAttribute('width', destWidth);                         
                        var ctx = canvas1.getContext("2d");
                        ctx.drawImage(image, sourceX, 
                            sourceY,
                            sourceWidth,
                            sourceHeight, 
                            destX, 
                            destY, 
                            destWidth, 
                            destHeight);
                        var image2 = new Image();
                        image2 = Canvas2Image.convertToJPEG(canvas1);
                        image2Data = image2.src;
                        doc.addImage(image2Data, 'JPEG', 12, 10);
                        croppingYPosition += destHeight;              
                    };            
                    doc.save("pattern-back.pdf");
                }, 500);
});

$('#save-skirt').on('click', 
    function(){

        setTimeout(function() { 
            
            document.draftingTableSkirt = document.getElementById("drafting-table-skirt-large");

            var imageData = document.draftingTableSkirt.toDataURL("image/jpeg");
            var image = new Image();
            image = Canvas2Image.convertToJPEG(document.draftingTableSkirt);
            doc = new jsPDF();
            doc.addImage(imageData, 'JPEG', 12, 10);
            var croppingYPosition = 999;
            var croppingXPosition = 699;
            count = (image.height) / 1001;
            countx = (image.width) / 701;


                for (var i = 1; i < count; i++) {
                    doc.addPage(); // ADD FIRST AND SECOND PAGE
                        var sourceX = 0; // where we start stealing image
                        var sourceY = croppingYPosition;
                        var sourceWidth = image.width; // controls how big of an image we steal from the sourc image
                        var sourceHeight = image.height;
                        var destWidth = sourceWidth;  // controll how big image is on PDF
                        var destHeight = sourceHeight; // scales exponentially
                        var destX = 0; //where top left corver goes on PDF
                        var destY = 0;
                        var canvas1 = document.createElement('canvas');
                        canvas1.setAttribute('height', destHeight);
                        canvas1.setAttribute('width', destWidth);                         
                        var ctx = canvas1.getContext("2d");
                        ctx.drawImage(image, sourceX, 
                            sourceY,
                            sourceWidth,
                            sourceHeight, 
                            destX, 
                            destY, 
                            destWidth, 
                            destHeight);
                        var image2 = new Image();
                        image2 = Canvas2Image.convertToJPEG(canvas1);
                        image2Data = image2.src;
                        doc.addImage(image2Data, 'JPEG', 12, 10);
                        croppingYPosition += destHeight;              
                    };    

                    for (var i = 1; i < count; i++) {
                        
                        doc.addPage();
                        console.log("Page 2")
                        var sourceX = croppingXPosition; // where we start stealing image
                        var sourceY = 0;
                        var sourceWidth = image.width; // controls how big of an image we steal from the sourc image
                        var sourceHeight = image.height;
                        var destWidth = sourceWidth; // controll how big image is on PDF
                        var destHeight = sourceHeight;
                        var destX = 0; //where top left corver goes on PDF
                        var destY = 0;
                        var canvas1 = document.createElement('canvas');
                        canvas1.setAttribute('height', destHeight);
                        canvas1.setAttribute('width', destWidth);                         
                        var ctx = canvas1.getContext("2d");
                        ctx.drawImage(image, sourceX, 
                            sourceY,
                            sourceWidth,
                            sourceHeight, 
                            destX, 
                            destY, 
                            destWidth, 
                            destHeight);
                        var image2 = new Image();
                        image2 = Canvas2Image.convertToJPEG(canvas1);
                        image2Data = image2.src;
                        doc.addImage(image2Data, 'JPEG', 12, 10);
                        croppingYPosition += destHeight;              
                    };      

                    var croppingYPosition = 999;

                    for (var i = 1; i < count; i++) {
                        console.log("Page 3")
                        doc.addPage();
                        var sourceX = croppingXPosition; // where we start stealing image
                        var sourceY = croppingYPosition;
                        var sourceWidth = image.width; // controls how big of an image we steal from the sourc image
                        var sourceHeight = image.height;
                        var destWidth = sourceWidth; // controll how big image is on PDF
                        var destHeight = sourceHeight;
                        var destX = 0; //where top left corver goes on PDF
                        var destY = 0;
                        var canvas1 = document.createElement('canvas');
                        canvas1.setAttribute('height', destHeight);
                        canvas1.setAttribute('width', destWidth);                         
                        var ctx = canvas1.getContext("2d");
                        ctx.drawImage(image, sourceX, 
                            sourceY,
                            sourceWidth,
                            sourceHeight, 
                            destX, 
                            destY, 
                            destWidth, 
                            destHeight);
                        var image2 = new Image();
                        image2 = Canvas2Image.convertToJPEG(canvas1);
                        image2Data = image2.src;
                        doc.addImage(image2Data, 'JPEG', 12, 10);
                        croppingYPosition += destHeight; 
                        croppingXPosition += croppingXPosition;             
                    };            
                
                var croppingYPosition = 999;
   

                     for (var i = 1; i < count; i++) {
                        console.log("Page 3")
                        doc.addPage();
                        var sourceX = croppingXPosition; // where we start stealing image
                        var sourceY = 0;
                        var sourceWidth = image.width; // controls how big of an image we steal from the sourc image
                        var sourceHeight = image.height;
                        var destWidth = sourceWidth; // controll how big image is on PDF
                        var destHeight = sourceHeight;
                        var destX = 0; //where top left corver goes on PDF
                        var destY = 0;
                        var canvas1 = document.createElement('canvas');
                        canvas1.setAttribute('height', destHeight);
                        canvas1.setAttribute('width', destWidth);                         
                        var ctx = canvas1.getContext("2d");
                        ctx.drawImage(image, sourceX, 
                            sourceY,
                            sourceWidth,
                            sourceHeight, 
                            destX, 
                            destY, 
                            destWidth, 
                            destHeight);
                        var image2 = new Image();
                        image2 = Canvas2Image.convertToJPEG(canvas1);
                        image2Data = image2.src;
                        doc.addImage(image2Data, 'JPEG', 12, 10);
                        croppingYPosition += destHeight;              
                    };            

                    var croppingYPosition = 999;
   
                     for (var i = 1; i < count; i++) {
                        console.log("Page 3")
                        doc.addPage();
                        var sourceX = croppingXPosition; // where we start stealing image
                        var sourceY = croppingYPosition;
                        var sourceWidth = image.width; // controls how big of an image we steal from the sourc image
                        var sourceHeight = image.height;
                        var destWidth = sourceWidth; // controll how big image is on PDF
                        var destHeight = sourceHeight;
                        var destX = 0; //where top left corver goes on PDF
                        var destY = 0;
                        var canvas1 = document.createElement('canvas');
                        canvas1.setAttribute('height', destHeight);
                        canvas1.setAttribute('width', destWidth);                         
                        var ctx = canvas1.getContext("2d");
                        ctx.drawImage(image, sourceX, 
                            sourceY,
                            sourceWidth,
                            sourceHeight, 
                            destX, 
                            destY, 
                            destWidth, 
                            destHeight);
                        var image2 = new Image();
                        image2 = Canvas2Image.convertToJPEG(canvas1);
                        image2Data = image2.src;
                        doc.addImage(image2Data, 'JPEG', 12, 10);
                        croppingYPosition += destHeight;              
                    };           
                    doc.save("pattern-skirt.pdf");



                
                    
                }, 500);

});

////////Below I tried to send my pdf object to my flask server in hopes of sending to theDropbox API//////

/////////////////////////////////////////////////////////////////////////////////
//http://stackoverflow.com/questions/166221/how-can-i-upload-files-asynchronously?rq=1

// var pdfUpload = function(){
//     var formData = new FormData();
//     formData.append("pdf_file", doc);
//     console.log(doc);
//     console.log(formData);

//     $.ajax({
//             url: '/dropbox-save',  //Server script to process data
//             type: 'POST',
//             xhr: function() {  // Custom XMLHttpRequest
//                 var myXhr = $.ajaxSettings.xhr();
//                 if(myXhr.upload){ // Check if upload property exists
//                     myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
//                 }
//                 return myXhr;
//             },
//             // //Ajax events
//             // beforeSend: beforeSendHandler,
//             // success: completeHandler,
//             // error: errorHandler,
//             // Form data
//             data: formData,
//             //Options to tell jQuery not to process data or worry about content-type.
//             cache: false,
//             contentType: false,
//             processData: false
//         });

// };

///////////////////////////////////////////////////////////////////////////////////

//http://stackoverflow.com/questions/19580959/jquerysending-pdf-to-server-via-ajax
// var ajaxFileUpload = function(){
//     //starting setting some animation when the ajax starts and completes
//     // $("#loading")
//     // .ajaxStart(function(){
//     //     $(this).show();
//     // })
//     // .ajaxComplete(function(){
//     //     $(this).hide();
//     // });

    
//         prepareing ajax file upload
//         url: the url of script file handling the uploaded files
//                     fileElementId: the file type of input element id and it will be the index of  $_FILES Array()
//         dataType: it support json, xml
//         secureuri:use secure protocol
//         success: call back function when the ajax complete
//         error: callback function when the ajax failed

            
//     $.ajaxFileUpload
//     (
//         {
//             url:'/dropbox-save', 
//             secureuri:false,
//             data: doc,
//             dataType: 'json',
//             success: function (data, status)
//             {
//                 if(typeof(data.error) != 'undefined')
//                 {
//                     if(data.error != '')
//                     {
//                         alert(data.error);
//                     }else
//                     {
//                         alert(data.msg);
//                     }
//                 }
//             },
//             error: function (data, status, e)
//             {
//                 alert(e);
//             }
//         }
//     );

//     return false;

// };
