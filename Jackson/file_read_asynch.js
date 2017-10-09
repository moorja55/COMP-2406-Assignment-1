
/*
Example of ASYNCHRONOUS file read.
Function readFile does not block (wait) for the file to be read.

Instead its argument function(err,data) will be called once the file has been read.
function(err,data) is the "call back" function that will be called when readFile's task is done.
*/


var fs = require('fs');
fs.readFile('songs/Sister Golden Hair.txt', 
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
				console.log(new_line);
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
				console.log(chords);
				console.log(new_line);
				//console.log(array[i]);
				}
			}
		}
	}
);
console.log("DONE");
