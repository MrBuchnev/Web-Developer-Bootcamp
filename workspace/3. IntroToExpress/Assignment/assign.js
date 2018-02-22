var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("Hi there, welcome to my assignment!");
});

// MY ANIMALS SOLUTION
app.get("/speak/:animal", function(req, res){
    var animals = ["cow", "dog", "cat", "pig", "dinosaur"]; 
    var sounds = ["Moo", "Woof woof", "Meow", "Oink", "Rawr"];
    var pageName = req.params.animal.toLowerCase();
    var index = animals.indexOf(pageName);
    if (animals.includes(pageName) === true){
        res.send("The " + animals[index] + " says '" + sounds[index] +"'");
    } else {res.send("Sorry, I don't know what this animal says")}
});
//COLT'S ANIMALS SOLUTION
// app.get("/speak/:animal", function(req, res){
//     var sounds = {
//         pig: "Oink",
//         cat: "Meow",
//         dog: "Woof Woof",
//         cow: "Moo",
//         dinosaur: "Rawr"
//     }
//     var animal = req.params.animal.toLowerCase();
//     var sound = sounds[animal];
//     res.send("The " + animal + " says '" + sound + "'");
// });

//MY REPEATED WORDS SOLUTION
app.get("/repeat/:word/:numOfTimes", function(req, res){
    var word = req.params.word;
    var num = Number(req.params.numOfTimes);
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(word);
    }
    var str = String(arr);
    var result = str.replace(/,/g,' ');
    res.send(result);
});
//COLT'S REPEATED WORDS SOLUTION
// app.get("/repeat/:message/:times", function(req, res){
//   var message = req.params.message;
//   var times = Number(req.params.times);
//   var result = "";
//   for (var i = 0; i < times; i++){
//       result += message + " ";
//   }
//   res.send(result);
// });

app.get("*", function(req, res){
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server ready");
});