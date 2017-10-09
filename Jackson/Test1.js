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
	var urlString = request.url;
	var index = urlString.indexOf("?name=");
	if(index > 0) {
		var name = urlString.substring(index + "?name=".length, urlString.length);
		response.write(name + "\n");
	}
	else response.write('World\n');
	
	function read(callback) {
		setTimeout(function(){
		var fs = require('fs');
		fs.readFile('songs/Sister Golden Hair.txt', function(err, data) {
			if(err) throw err;
			var array = data.toString().split("\n");
			for(var i=0; i<array.length; i++) {response.write(array[i]); }
			//for(var i=0; i<array.length; i++) { console.log(array[i]); }
			response.write('\n');
		});
		console.log("DONE");
		console.log("read data");
		callback();
		}
		, Math.floor((Math.random() * 1000) + 1));
	}

	read(function () {
		setTimeout(function procces(){
		console.log("process data");
		setTimeout(function output (){
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
