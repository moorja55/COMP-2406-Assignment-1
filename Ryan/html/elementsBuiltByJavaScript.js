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
  console.log(posX);
  var posY = parseInt(theElement.style.top);
  console.log(posY);
  

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

function format(sfile){
  //split text file by each new line
  var array = sfile.toString().split("\n");
  
  var song = new Object;

  var chords = [];
  var lyrics = [];

  for(i = 1; i < array.length; i++){
    line = array[i].split("[");
    var chordLine = [];
    var lyricLine = [];
    var chordSpaceCount = 0;
    for(j in line){
      if(line[j].includes("]")){
        var separate = line[j].split("]");
        console.log(separate);
        chordLine.push(chordSpaceCount);
        chordLine.push(separate[0]);
        chordSpaceCount = 0;

        lyricLine.push(separate[1]);
        chordSpaceCount = separate[1].length;
      }else{
        lyricLine.push(line[j]);
        chordSpaceCount = line[j].length;        
      }
    }
    chords.push(chordLine);
    chordLine = [];
    lyrics.push(lyricLine);
    lyricLine = [];
  }
  song = {title : array[0],chords : chords, lyrics : lyrics};
  console.log(song);
  return song;
}
//handle the button clicks
function chooseSong(){
  //the following code is taken from the tutorial3 problem
  //get text in textfield
  var userText = $("#userTextField").val();
  if(userText && userText != ' '){
    //text field is not blank
    console.log("text field is not empty");
    document.getElementById("main").innerHTML = "";
    console.log("cleared main div" + document.getElementById("main")); 
    userTextObj = {text : userText};
  $('#userTextField').val('');      
    //user text was not empty
    var userRequestObj = {text: userText}; //make object to send to server
    var userRequestJSON = JSON.stringify(userRequestObj); //make json string
    $('#userTextField').val(''); //clear the user text field

    //Prepare a POST message for the server and a call back function
    //to catch the server repsonse.
    //alert("You typed: " + userText);
    //console.log("responseObj" + JSON.parse(data));
    
    console.log("You typed: " + userText);
    $.post("songs\\" + userText + ".txt", userRequestJSON, 
      function(data, status){
        
        console.log("data2: " + data);
        console.log("typeof: " + typeof data);
        buildElements(format(data));
        //var responseObj = JSON.parse(data);
        //console.log("responseObj" + responseObj);
        //movingString.word = responseObj.text;
        //replace word array with new words if there are any
        //console.log("responseObj" + responseObj.wordArray);
        //if(responseObj.wordArray) words = responseObj.wordArray;
      });
    }else{
      console.log("Bad Song");
      var messageHeader = document.createElement("h1");
      var message = document.createTextNode("Please select song from list");
      messageHeader.appendChild(message);
      messageHeader.style.backgroundColor = "#ff0000";
      document.getElementById("main").appendChild(messageHeader);
    }
}



function buildElements(song){
  //each i will be index of an array in array of chords, lyrics for each line
  //chords and lyrics will have the same number of arrays
  var vertical = 250;
  var songTitle = document.createTextNode(song.title);
  var titleHeader = document.createElement("h3");
  titleHeader.appendChild(songTitle);
  titleHeader.style.position = "absolute";
  titleHeader.style.left = "20px";
  titleHeader.style.top = "" + vertical + "px";
  titleHeader.onmousedown = grabber;      
  document.getElementById("main").appendChild(titleHeader);
  vertical += 50
  for(var i = 0; i < song.lyrics.length; i++){
    var horizontal = 20;
    chordLine = song.chords[i];
    lyricLine = song.lyrics[i];
    //iterate through chords in the ith line
    for(var j = 0; j < chordLine.length; j++){
      //we only want every second value in the array
      if(j%2 == 0){
        continue;
      }
      //create element for that chord that can be dragged
      //create chordSpace to know where to place the chord above the line
      var chordItem = document.createElement("span");
      var aChord = document.createTextNode(chordLine[j]);
      var chordSpace = chordLine[j-1];
      chordItem.appendChild(aChord);
      chordItem.style.backgroundColor = "#00ff00";      
      chordItem.style.position = "absolute";
      horizontal += (chordSpace) * 5.7;
      chordItem.style.left = "" + horizontal + "px";
      horizontal += 5;
      horizontal += aChord.length * 5;      
      chordItem.style.top = "" + vertical + "px";
      chordItem.onmousedown = grabber;      
      document.getElementById("main").appendChild(chordItem);
    }
    vertical += 20;
    horizontal = 20;
    //now do the same for lyrics
    var lyricItem = document.createElement("span");
    var lyricStr = "";
    for(var j = 0; j < lyricLine.length; j++){
      lyricStr += lyricLine[j];
      if (j != lyricLine.length - 1){
        lyricStr;
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
  console.log(document.getElementById("main"));
}