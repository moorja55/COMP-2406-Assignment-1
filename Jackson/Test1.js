/*
Hello World example to serving string to client
*/
//To test use browser to view http://localhost:3000
//Cntl+C to stop server

var http = require('http');
var counter = 1000;

http.createServer(function (request,response){

	console.log("url: " + request.url);
	console.log("method: " + request.method);

	//respond to client
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write('Hello\n');
	var songName = "ReadMe"
	var urlString = request.url;
	var index = urlString.indexOf("?song=");
	if(index > 0) {
		songName = urlString.substring(index + "?song=".length, urlString.length);
		response.write(songName + "\n");
	}
	
	function read(callback) {
		setTimeout(function(){
		var fs = require('fs');
		fs.readFile('songs/'+songName+'.txt',
			function(err, data) {
				if(err) throw err;
				var array = data.toString().split("\n");
				let search = "";
				let start = "";
				let end = "";
				let chord = "";
				let chord2 = "";
				for(i in array) {
					let new_line = array[i];
					search = new_line.indexOf("[");
					let chords = "";
					if (search == -1){
						response.write(new_line);
					}
					while (search != -1){
						start = new_line.indexOf("[");
						end = new_line.indexOf("]");
						chord = new_line.substring(start+1,end);
						chord2 = new_line.substring(start,end+1);
						new_line = new_line.replace(chord2,"");
						search = new_line.indexOf("[");
						//console.log(start + " " + chords.length);
						for (let j=0; j < (end + chord2.length + 1 - chords.length); j++){
							chords += " ";
						}
						chords += chord;
						//console.log(start + " " + end +" "+ chords + " " + search);
						if (search == -1){
							response.write(chords);
							response.write('\n');
							response.write(new_line);
							//console.log(array[i]);
						}
					}
				}
			}
		);
		console.log("DONE");
		callback();
		}
		, Math.floor((Math.random() * 1000) + 1));
	}

	read(function (x) {
		setTimeout(function procces(x){
			console.log("process data");
			setTimeout(function output (x){
				console.log("output data");

				//end HTTP response and provide final data to send
				response.end("["+ counter++ + "]\n");
			},
			Math.floor((Math.random() * 1000) + 1));
        },
        Math.floor((Math.random() * 1000) + 1));
	});


}).listen(3000);
console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');
console.log('To test with browser visit: http://localhost:3000');
