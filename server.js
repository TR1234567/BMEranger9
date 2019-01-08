
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

app.post('/addUser', function(req,res) {
    var json = req.body;
    fs.readFile(__dirname + "/" + "users.json",'utf8', function (err,data) {
        data = JSON.parse(data);
        data["5"] = req.body;
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

app.get('/showbyID/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse(data);
       console.log(`${users.id}`);
       var user = users[req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
 })