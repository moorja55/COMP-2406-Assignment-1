// dragNDrop.js
//   Example from: Sebesta "Programming The World Wide Web" 6th ed. chapter 6
//   An example to illustrate the DOM 2 Event model
//   Allows the user to drag and drop words defined by HTML, <span> elements

//  In this example the javascript code will identify the DOM element
//  being targeted and modify it's position properties.

//  Define variables for the values computed by 
//  the grabber event handler but needed by mover
//  event handler

//  ***The actual <span> elements that will be dragged around
//  are being created and inserted into the DOM by a
//  javascript function that runs once the window has loaded.

var diffX, diffY, theElement;

// *******************************************************

// The event handler function for grabbing the word

function grabber(event) {

// Set the global variable for the element to be moved
// this uses a DOM 2 feature to ask for event's currentTarget

  theElement = event.currentTarget;

// Determine the position of the word to be grabbed,
//  first removing the units from left and top

  var posX = parseInt(theElement.style.left);
  var posY = parseInt(theElement.style.top);

// Compute the difference between where it is and 
//  where the mouse click occurred

  diffX = event.clientX - posX;
  diffY = event.clientY - posY;

// Now register the event handlers for moving and 
//  dropping the word (DOM 2 feature)
 
  document.addEventListener("mousemove", mover, true);
  document.addEventListener("mouseup", dropper, true);

// Stop propagation of the event and stop any default 
//  browser action

  event.stopPropagation();
  event.preventDefault();

}  //** end of grabber

// *******************************************************

// The event handler function for moving the word

function mover(event) {

// Compute the new position, add the units, and move the word

  theElement.style.left = (event.clientX - diffX) + "px";
  theElement.style.top = (event.clientY - diffY) + "px";

// Prevent propagation of the event

  event.stopPropagation();
}  //** end of mover

// *********************************************************
// The event handler function for dropping the word

function dropper(event) {

// Unregister the event handlers for mouseup and mousemove
// DOM 2 feature

  document.removeEventListener("mouseup", dropper, true);
  document.removeEventListener("mousemove", mover, true);

// Prevent propagation of the event

  event.stopPropagation();
}  //** end of dropper

//handle the button clicks
function chooseSong(){
	
	var userText = $('#userTextField').val(); //get text from user text input field
	
	if(userText && userText != ''){
		
		//user text was not empty
		var userRequestObj = {text: userText}; //make object to send to server
		var userRequestJSON = JSON.stringify(userRequestObj); //make json string
		$('#userTextField').val(''); //clear the user text field

		//Prepare a POST message for the server and a call back function
		//to catch the server repsonse.
		//alert("You typed: " + userText);
		//console.log("responseObj" + JSON.parse(data));
		
		console.log("You typed: " + userText);
		$.post("userText", userRequestJSON, 
			function(data, status){
		   
				console.log("data2: " + data);
				console.log("typeof: " + typeof data);
				//var responseObj = JSON.parse(data);
				//console.log("responseObj" + responseObj);
				//movingString.word = responseObj.text;
				//replace word array with new words if there are any
				//console.log("responseObj" + responseObj.wordArray);
				//if(responseObj.wordArray) words = responseObj.wordArray;
			}
		);
	}
	else{console.log("Was empty");}
	
  document.getElementById("main").innerHTML = "";
  buildElements(song);
  
}

var song = new Object(); 
song.chords = [["B",2,"C",3], ["B", 3,"C", 4]];
song.lyrics = [["I","like","the","way", "your", "sparkling", "earrings", "lay"],["I","like","the","way", "your", "sparkling", "earrings", "lay"]];
song.title = "Sister Golden Hair";

function buildElements(){
  //each i will be index of an array in array of chords, lyrics for each line
  //chords and lyrics will have the same number of arrays
  var vertical = 100;
  for(var i = 0; i < song.lyrics.length; i++){
    var horizontal = 20;
    chordLine = song.chords[i];
    lyricLine = song.lyrics[i];
    //iterate through chords in the first line
    for(var j = 0; j < chordLine.length; j++){
      if(j%2 == 1){
        continue;
      }
      var chordItem = document.createElement("span");
      var aChord = document.createTextNode(chordLine[j]);
      chordItem.appendChild(aChord);
      chordItem.style.backgroundColor = "#00ff00";      
      chordItem.style.position = "absolute";
      chordItem.style.left = "" + horizontal + "px";
      chordItem.style.top = "" + vertical + "px";
      chordItem.onmousedown = grabber;      
      horizontal += chordLine[j].length * 10 + 30;
      document.getElementById("main").appendChild(chordItem);
    }
    vertical += 50;
    horizontal = 20;
    //now do the same for lyrics
    var lyricItem = document.createElement("span");
    var lyricStr = "";
    for(var j = 0; j < lyricLine.length; j++){
      lyricStr += lyricLine[j];
      if (j != lyricLine.length - 1){
        lyricStr += " ";
      }
    }
    var aLyric = document.createTextNode(lyricStr);
    lyricItem.appendChild(aLyric);
    lyricItem.style.backgroundColor = "#EEEE00";
    lyricItem.style.position = "absolute";
    lyricItem.style.left = "" + horizontal + "px";
    lyricItem.style.top = "" + vertical + "px";
    document.getElementById("main").appendChild(lyricItem);
    vertical += 50;
  }
}