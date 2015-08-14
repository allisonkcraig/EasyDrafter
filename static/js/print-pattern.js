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
                    doc.save("pattern.pdf");
                }, 500);
});

$('#save-back').on('click', 
    function(){

        setTimeout(function() { 
            
            document.draftingTableFront = document.getElementById("drafting-table-back");

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
                    doc.save("pattern.pdf");
                }, 500);
});
