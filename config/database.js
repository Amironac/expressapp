
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://amir123:amir123@test-cluster1-sozzi.mongodb.net/test?retryWrites=true&w=majority")
    .then(()=> console.log("Mongo DB connected"))
    .catch(err => console.log(err));


    