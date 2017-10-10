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
  buildElements(song);
}

var song = new Object(); 
song.chord = ["C", 2, "G", 3];
song.lyrics = ["I","like","the","way", "your", "sparkling", "earrings", "lay"];
song.title = "Sister Golden Hair";

function buildElements(song){
  var horizontal = 20;
  vertical = 100;
  for(var i = 0; i < song.chord.length; i++){
    if(i%2 != 0){
      continue;
    }else{
      var chordItem = document.createElement("aSpan");
      var aChord = document.createTextNode(song.chord[i]);
      chordItem.appendChild(aChord);
      chordItem.style.backgroundColor = "#EEEE00";
      chordItem.style.position = "absolute";
      chordItem.style.left = "" + horizontal + "px";
      chordItem.style.top = "" + vertical + "px";
      chordItem.onmousedown = grabber;
      horizontal += song.chord[i].length * 10 + 30;
      
      document.getElementById("main").appendChild(chordItem);
    }

  }
  vertical += 50;
  horizontal = 20;
	for(var i=0; i < song.lyrics.length; i++){
     var LyricItem  = document.createElement("li");
	   var lyric_line = document.createTextNode(song.lyrics[i]);
	   LyricItem.appendChild(lyric_line);
	   LyricItem.style.position = "absolute";
	   LyricItem.style.left = "" + horizontal + "px";
	   LyricItem.style.top = "200px";
     horizontal += song.lyrics[i].length * 10 + 30;
     LyricItem.setAttribute("id", "song_Lyrics")
	   document.getElementById("main").appendChild(LyricItem);
	}
}

/*function buildElements(){
  //each i will be index of an array in array of chords, lyrics for each line
  //chords and lyrics will have the same number of arrays
  for(var i = 0; i < song.lyrics.length; i++){
    chordLine = song.chords[i];
    lyricLine = song.lyrics[i];
    //iterate through chords in the first line
    for(var j = 0; j < chordLine.length; j++){
      
    }
  }
}*/