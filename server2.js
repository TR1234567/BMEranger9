const express = require('express')

var app = express();
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var data = [];

var url = "mongodb://localhost:27017/hwData";
MongoClient.connect(url, function(err, db) {   //here db is the client obj
    if (err) throw err;
    var dbase = db.db("hwData"); //here
    
    dbase.createCollection("tempurature", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();   //close method has also been moved to client obj
    });
},{"auth":{"user":"admin","password":"helloworld"}});

function hexToSignedInt(hex) {
    if (hex.length % 2 != 0) {
        hex = "0" + hex;
    }
    var num = parseInt(hex, 16);
    var maxVal = Math.pow(2, hex.length / 2 * 8);
    if (num > maxVal / 2 - 1) {
        num = num - maxVal
    }
    return num;
  };

  app.listen(4000, () => {

    console.log('Start server at port 4000.')
  
  });

  app.post('/receiveData',(req,res) => {
         //data = req.body.DevEUI_uplink.payload_hex;
         console.log(data);
         var jsonsensor = {
             teamID:hexToSignedInt('0af0')*0.01,
             temp:hexToSignedInt('0118')*0.1
         };

         console.log(JSON.stringify(jsonsensor));
         MongoClient.connect(url, function(err, db) {   //here db is the client obj
            if (err) throw err;
            var dbase = db.db("hwData"); //here
            dbase.collection("tempurature").insertOne(jsonsensor, function(err, res) {
                if (err) throw err;
                console.log("Document inserted");
                db.close();
              });
        });
         //hexToSignedInt(data[13]+data[14]+data[15]+data[16])*0.1
         //hexToSignedInt(data[5]+data[6]+data[7]+data[8])*0.01,
  });

  app.get('/showData',(req,res) => {
    MongoClient.connect(url, function(err, db) {   //here db is the client obj
        if (err) throw err;
        var dbase = db.db("hwData"); //here
        dbase.collection("tempurature").find({}).toArray(function(err , result){  
            if(err) throw err;
            console.log(result);
            module.exports = {result};
            db.close();
          });
    });
});

app.post('/addData',(req,res) => {
    var json = req.body;
    dbase.collection("tempurature").insertOne(json, function(err, res) {
        if (err) throw err;
        console.log("Document inserted");
        db.close();
      });
});

// app.put('/editData/:teamID',(req,res) => {
//     var json = req.body;

// });

// app.delete('/deleteData/:teamID',(req,res) => {
//     MongoClient.connect(url, function(err, db) {   //here db is the client obj
//         if (err) throw err;
//         var dbase = db.db("hwData"); //here
//         dbase.collection("tempurature").find({}).toArray(function(err , result){  
//             if(err) throw err;
//             console.log(result);
//             var sel = result;
//             sel[req.params.teamID] = 
//           });

//     });
// });

