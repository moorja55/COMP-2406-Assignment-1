
//Cntl+C to stop server

var http = require('http'); //need to http
var fs = require('fs'); //need to read static files
var url = require('url');  //to parse url strings


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

var songs = ["/songs//Brown%Eyed%Girl.txt", "/songs//Sister%Golden%Hair.txt", "/songs//Peaceful%Easy%Feeling.txt"];

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

	 var filePath = ROOT_DIR + urlObj.pathname;
     if(urlObj.pathname === '/') filePath = ROOT_DIR + '/index.html';
     console.log(filePath);
     console.log("USER REQUEST: " + dataObj.text );
     
     var receivedData = '';
     
         //attached event handlers to collect the message data
         request.on('data', 
             function(chunk) {
                 receivedData += chunk;
             }
         );
         console.log(receivedData);
         var dataObj = JSON.parse(receivedData);
     fs.readFile(filePath, function(err,data){
       if(err){
		  //report error to console
          console.log('ERROR: ' + JSON.stringify(err));
		  //respond with not found 404 to client
          response.writeHead(404);
          response.end(JSON.stringify(err));
          return;
         }
         console.log(songs.includes(urlObj.pathname));
         if(songs.includes(urlObj.pathname)){
            fs.readFile(filePath, function(err, song) {
                if(err){
                    //report error to console
                    console.log('ERROR: ' + JSON.stringify(err));
		            //respond with not found 404 to client
                    response.writeHead(404);
                    response.end(JSON.stringify(err));
                    return;
                } 
                var array = song.toString().split("\n"); 
                for(i in array) { console.log(array[i]); } 
                sendArr = JSON.stringify(song);
                //console.log(sendArr);
                response.end("sendArr");
              });
         }
         response.writeHead(200, {'Content-Type': get_mime(filePath)});
         response.end(data);
       });

 }).listen(3000);

console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');