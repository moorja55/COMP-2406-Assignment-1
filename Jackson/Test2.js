/*
Hello World example to serving string to client
*/
//To test use browser to view http://localhost:3000
//Cntl+C to stop server

var http = require('http');
var fs = require('fs');
var counter = 1000;

http.createServer(function (request,response){

	//console.log("url: " + request.url);
	//console.log("method: " + request.method);

	//respond to client
	response.writeHead(200, {'Content-Type': 'text/plain'});
	var songName = "ReadMe"
	var urlString = request.url;
	//Getting name of song from user
	var index = urlString.indexOf("?song=");
	if(index > 0) {
		songName = urlString.substring(index + "?song=".length, urlString.length);
		response.write(songName + "\n");
	}
	
	function read(callback) {setTimeout(function(){fs.readFile('songs/'+songName+'.txt',function(err, data) {
		if(err) throw err;
				
		//split text file by each new line
		var array = data.toString().split("\n");
				
		//initialize variables
		let search = "";
		let start = "";
		let end = "";
		let chordName = "";
		let chordText = "";
		let chordArray = [];
		let lyricArray = [];
		var song = new Object();
		song.title = songName;
		song.chords = [];
		song.lyrics = [];
				
		//loop through each line in the text file
		for(i in array) {
					
			//set the current line
			let new_line = array[i];
					
			//search for a chord 
			search = new_line.indexOf("[");
					
			//make a new chords line
			let chords = "";
					
			//if there are no chords on the line then just write the line
			//and add chord array to song.chords
			if (search == -1){

				response.write(new_line);
						
			}
					
			//if there is a chord
			while (search != -1){
						
				//get the index of the start and end of a chord
				start = new_line.indexOf("[");
				end = new_line.indexOf("]");
						
				//get the actual chord
				chordName = new_line.substring(start+1,end);
						
				//get the chord with the brackets
				chordText = new_line.substring(start,end+2);
						
				//get rid of the chord with brakets 
				new_line = new_line.replace(chordText,"");
						
				//check if there is another chord
				search = new_line.indexOf("[");
						
						
				//add spaces to the chord line for formating
				for (let j=0; j < (end + chordText.length + 1 - chords.length); j++){
					chords += " ";
				}
						
				//Add chord text to the chords line
				chords += chordName;
						
				//Add chord to chord array
				chordArray.push(chordName); 
						
				//Add chord spacing to chord array
				chordArray.push((end + chordText.length + 1));
						
				//if no more chords write out the chords and lyrics
				if (search == -1){
							
					lyricArray = new_line.split(" ");
					song.lyrics.push(lyricArray);
					song.chords.push(chordArray);
					response.write(chords);
					response.write('\n');
					response.write(new_line);
					chordArray = [];
					lyricArray = [];
				}
			}
		}
	console.log(song);});callback();},Math.floor((Math.random() * 1000) + 1));}

	read(function (x) {setTimeout(function output (x){
		
		//end HTTP response and provide final data to send
		response.end("["+ counter++ + "]\n");
		
	},Math.floor((Math.random() * 1000) + 1));});

}).listen(3000);
//console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');
//console.log('To test with browser visit: http://localhost:3000/sisterGoldenHair');
