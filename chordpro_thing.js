// this format function is the logic behind reformatting the chord pro files.
// just need to change the out put to retrun as an array for each line when the time comes.
format = function(lines) {
    for(line in lines){
        var lyrics = " ";
        var chords = " ";
        var spaces = 0;
        var words = lines[line].split(" ");
        for(word in words){
            if(words[word].startsWith("[")){
                chord = words[word].slice(1, words[word].length -1) + " ";
                spaces
                chords += chord;
            }else{
                lyric = words[word] + " ";
                for(i = 0; i < lyric.length; i++){
                    spaces++;
                }
                lyrics += lyric;
            }
        }
        console.log(lyrics[0]);
        console.log(chords);
        console.log(lyrics);
    }
}
//asynchronus file read from tutorial 2
var fs = require('fs'); 
fs.readFile('songs/Sister Golden Hair.txt', function(err, data) {
  if(err) throw err; 
  var array = data.toString().split("\n"); 
  for(i in array) { console.log(array[i]); } 
  format(array);
});
console.log("DONE");

