![EasyDrafter Logo](/static/img/logo.png)

EasyDrafter is a web app created by Allison Craig which is used to create clothing pattern blocks for DIY enthusiasts.
In traditional clothing patternmaking, drafting blocks can take a lot of time and have human error. My app makes it quick and easy to make a block so the pattern drafter can get to making more complex patterns quicker. 

## Table of Contents
* [Terminology](#terms)
* [Technologies Used](#technologiesused)
* [Drafting with Canvas](#drafting)
* [Behind The User Drafting Expirience](#drafting)
* [Calculating the Block](#math)
* [Version 2.0](#v2)
* [Author](#author)

## <a name="terms"></a>Terminology
#### Pattern Block
A pattern block is a template pattern used in creating clothing patterns. This base pattern is the basic shape of a garnment with which you manipulate to create a specific style. This block does not include seam allowance needed to sew it into an actual garnment. This needs to be added by the pattern maker.
#### Drafting
Drafting is the process of creating your patterns. This can include creating pattern blocks or creating the final patterns with style and seam allowance added.

## <a name="technologiesused"></a>Technologies Used
* Javascript
* [Python](https://www.python.org/)
* [Flask](http://flask.pocoo.org/)
* [Flask - SQLAlchemy](http://flask.pocoo.org/)
* [jQuery](https://jquery.com/)
* [Jinja2](http://jinja.pocoo.org/docs/dev/)
* [Bootstrap](http://getbootstrap.com/2.3.2/)
* [jsPDF](https://parall.ax/products/jspdf)

## <a name="drafting"></a>Drafting with Canvas
####Using HTML5
HTML5 Canvas was used to draft my pattern blocks. Canvas uses a system of (x,y) axis on a grid that starts at (0,0) at the top left corner. This was counter intuitive to how blocks are drafted by hand but it was a fun challenge. 

## <a name="drafting"></a>Behind The User Drafting Expirience
####Selecting Base Block
![Selecting Base Measurements](/static/img/screen-shot-decide.png)
The user can decide between drafting a top or a skirt


####Selecting Base Measurements
![Selecting Base Measurements](/static/img/screen-shot-base.png)
On the first page of inputs a user sees when drafting with this app, the user must input 2 basic measurements which vary depending on the type of block.
When they hit "next", the server looks for these measurements and determines a template block that fits the user the best from the database.
The Flask Server determines these measruements by looking at the ratio of the two measurements, determines which is the more dominant measurement. It then queries the database for the block that will fit that dominant measurement.
These measurements are stored in the session for use in drafting. The template measurements are passed onto the drafting pages via Jinja templating, which selected by my Javascript drafting algorithms using jQuery.

####Making Drafts React to Input
![drafting](/static/img/screen-shot-draft.png)
While in the drafting screens, the user can change measurements in the inputs which triggers an event handler on blur with jQuery to clear the previous draft and draft a new block with the new measurements. 

####Storing Measurements
After the user hits next on any drafting page, the Flask server requests the measurements and overrides the template measurements in the session with the user input.

####Saving Blocks to Desktop in PDF
![save2desktop](/static/img/pdfprint.png)
After all the drafting is complete the user is brought to a final page which allows the user to save the block to thier desktop in PDF form. The PDF is rendered using jsPDF, a library by Parallax. This utilizes Canvas2Image, a tool for coverting the HTML5 Canvas into an image. 
There is hidden on the final page the pattern blocks scaled up with the specific goal of making them print so each square is an inch. jsPDF is able to select certain parts of the image and save to a PDF object which is then saved to the desktop.

####Saving Blocks to App
![drafting](/static/img/screen-shot-canvas.png)
The user is able to save the block measurements to their account with a block nickname. The user can then go back and edit, reprint, or delete the block from thier profile page. 
![save2app](/static/img/profile.png)

## <a name="math"></a>Calculating The Block
The main component of this app is the pattern drafting algorithms which were created to mimic traditional pattern drafting techniques using HTML5 Canvas and Javascript.
I created many functions to specialy help me calculate the axis of a specific coordinate. Many of my functions are based on the geometry of right triangles.

## <a name="v2"></a>Version 2.0
The next step for this app would be a smarter way to select template blocks.
There is a process in pattern drafting called "grading" which is taking a pattern and scaling up or down for the specific user. It would be neat to take this process and apply it to base templates so the user can both get a block the size they want but also the proportions they want.

## <a name="author"></a>Author
Allison Craig is a software engineer from San Francisco, CA.