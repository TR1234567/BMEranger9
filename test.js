const fs = require('fs')
const express = require('express');
var app = express();
const csv = fs.readFileSync('sanam.csv','utf8')
const mongoose = require('mongoose');
const request  = require('request');
mongoose.Promise = global.Promise;
var MongoClient = require('mongodb').MongoClient;
mongoose.connect('mongodb://localhost:27017/DATABASE',{ useNewUrlParser: true });
var db = mongoose.connection;
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;


var SD = new Schema({
  Date : Date,
  Value: String
});


var url = 'mongodb://localhost:27017/DATABASE';
function csvToArray (csv) {
    rows = csv.split("\n");
    return rows.map(function (row) {
    	return row.split(";");
    });
};  
var newarr =[]
var array = csvToArray(csv);
    array.splice(0,1)
    array.slice(366,1)
    for(j in array)
    array[j].splice(0,6)
    for(i in array)
    array[i].splice(16,3)

    

    function toObject(arr) {
      var rv = {};
      for (var i = 0; i < arr.length; ++i)
        if (arr[i] !== undefined) rv[i] = arr[i];
      return rv;
    }
    
var schema = new mongoose.Schema({
	person: String
});
    var Cat = require("./model/cat");

    

    app.get('/save', function(req, res) {


      for(i in array)
      for(let j =0 ;j<16 ;j++)
      var cat = new Cat({ person: array[i][j] });


      cat.save(function(err) {
        if (err) console.log(err);
        else res.json({ results: "Complete" });
        console.log(cat)
      });
    });


    app.get('/get', function(req, res) {
      Cat.find({}, function(err, records) {
        if (err) console.log(err)
        else res.json({ results: records });
       });
    })
    

    var ta = MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("DATA");
      dbo.collection("SensorData").find(null, function(err, result) {
        if (err) throw err;
        console.log("test");
        db.close();
      });
 
      
    });
    
    

   
   
    mongoose.connect('mongodb://localhost:27017/testdb', {useNewUrlParser: true});
    var db = mongoose.connection;
  
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    
    
    
   
   


    app.listen(8765, () => console.log(`Example app listening on port`))