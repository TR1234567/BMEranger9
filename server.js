var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
 var app = express();
app.use(bodyParser.json());

var server  = app.listen(8080, function() {
    var port = server.address().port
    console.log("Sample code for RESTful API run at ", port)
});
app.get('/listUser',function(req,res){
    fs.readFile(__dirname + "/" + "users.json", 'utf8',function(err,data){
        console.log(data);
        res.end(data);
    });
});
app.post('/addUser', function(req,res) {
    var json = req.body;

    fs.readFile(__dirname + "/" + "users.json",'utf8', function (err,data) {
        data = JSON.parse(data);
        data["user4"] = req.body;
        console.log(data);
        res.end(JSON.stringify(data));
    });
});


