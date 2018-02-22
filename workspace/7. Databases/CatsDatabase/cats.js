var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cats_app");

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

var Cat = mongoose.model("Cat", catSchema);
// ADDING A CAT TO THE DATABASE (VIA JS VARIABLE)
// var milly = new Cat({
//     name: "Milly",
//     age: "14",
//     temperament: "adorable"
// });

// milly.save(function(err, cat){
//     if (err){
//         console.log("SOMETHING WENT WRONG");
//     } else {
//         console.log("WE SAVED A CAT TO THE DATABASE");
//         console.log(cat);
//     }
// });

// ADDING A CAT TO THE DATABASE (VIA .CREATE)
Cat.create({
   name: "Dilly",
   age: 4,
   temperament: "Nice"
}, function(err, newcat){
    if (err){
        console.log("AAAAA ERROR!!!");
        console.log(err);
    } else {
        console.log(newcat);
    }
});

//retrieve all cats from the database and console.log each one
Cat.find({}, function(err, cats){
   if (err){
       console.log("OH NO, ERROR!");
       console.log(err);
   } else {
       console.log("We found these cats:");
       console.log(cats);
   }
});