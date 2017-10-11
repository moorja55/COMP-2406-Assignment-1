
//Cntl+C to stop server

var http = require('http'); //need to http
var fs = require('fs'); //need to read static files
var url = require('url');  //to parse url strings

//var counter = 1000; //to count invocations of function(req,res)

var ROOT_DIR = 'html'; //dir to serve static files from

var MIME_TYPES = {
    'css': 'text/css',
    'gif': 'image/gif',
    'htm': 'text/html',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'text/javascript', //should really be application/javascript
    'json': 'application/json',
    'png': 'image/png',
    'txt': 'text/text'
};

var get_mime = function(filename) {
    var ext, type;
    for (ext in MIME_TYPES) {
        type = MIME_TYPES[ext];
        if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
            return type;
        }
    }
    return MIME_TYPES['txt'];
};

http.createServer(function (request,response){
    var urlObj = url.parse(request.url, true, false);
    console.log('\n============================');
	console.log("PATHNAME: " + urlObj.pathname);
    console.log("REQUEST: " + ROOT_DIR + urlObj.pathname);
    console.log("METHOD: " + request.method);
	
	var receivedData = '';

    //attached event handlers to collect the message data
    request.on('data', 
		function(chunk) {
			receivedData += chunk;
		}
	);
	 
	//event handler for the end of the message
    request.on('end', function(){
		
		console.log('received data: ', receivedData);
		console.log('type: ', typeof receivedData);
		
		//if it is a POST request then echo back the data.
		if(request.method == "POST"){
			var dataObj = JSON.parse(receivedData);
			console.log('received data object: ', dataObj);
			console.log('type: ', typeof dataObj);
			//Here we can decide how to process the data object and what
			//object to send back to client.
			//FOR NOW EITHER JUST PASS BACK AN OBJECT
			//WITH "text" PROPERTY 
		   
			//TO DO: return the words array that the client requested
			//if it exists

			console.log("USER REQUEST: " + dataObj.text );
			var songName = dataObj.text;
			
			
			
			console.log("Song name : " + songName);
			
			function read(callback) {setTimeout(function(){fs.readFile(ROOT_DIR + '/songs/'+songName+'.txt',function(err, data) {
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

						//response.write(new_line);
						
					}
					
					//if there is a chord
					while (search != -1){
						
						//get the index of the start and end of a chord
						start = new_line.indexOf("[");
						end = new_line.indexOf("]");
						
						//get the actual chord
						chordName = new_line.substring(start+1,end);
						
						//get the chord with the brackets
						chordText = new_line.substring(start,end+1);
						
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
						
						//Add chord spacing to chord array
						chordArray.push((start - chords.length));

						//Add chord to chord array
						chordArray.push(chordName); 
						
						//if no more chords write out the chords and lyrics
						if (search == -1){
							
							lyricArray = new_line.split(" ");
							song.lyrics.push(lyricArray);
							song.chords.push(chordArray);
							//response.write(chords);
							//response.write('\n');
							//response.write(new_line);
							chordArray = [];
							lyricArray = [];
						}
					}
				}
					
			//console.log(song);
			//var returnObj = song;
			response.write(data);

			
			});callback();},Math.floor((Math.random() * 1000) + 1));}
		
			read(function (x) {setTimeout(function output (x){
		
					//end HTTP response and provide final data to send
					response.end();
					//var returnObj = [["B",2,"C",3], ["B", 3,"C", 4]];
					//object to return to client
					//console.log(returnObj);
					//response.end(JSON.stringify(returnObj)); //send just the JSON object
				
			},Math.floor((Math.random() * 1000) + 1));});
			
			
			
		}
	});
	 
	if(request.method == "GET"){
		//handle GET requests as static file requests
		var filePath = ROOT_DIR + urlObj.pathname;
		if(urlObj.pathname === '/') filePath = ROOT_DIR + '/index.html';
	 
		fs.readFile(filePath, function(err,data){
			if(err){
				
				//report error to console
				console.log('ERROR: ' + JSON.stringify(err));
				
				//respond with not found 404 to client
				response.writeHead(404);
				response.end(JSON.stringify(err));
				return;
			}
		response.writeHead(200, {'Content-Type': get_mime(filePath)});response.end(data);});
	}

 }).listen(3000);

console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');