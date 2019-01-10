
const mongoose = require('mongoose');
const express = require('express');
var app = express();
var request = require('request');
var bodyparser = require('body-parser');
app.use(bodyparser.json());

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/FinalData";
console.log('Starting Server');

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

  var count = 0;

app.post('/receiveBeacon/enter', (req,res) => {
    //data = req.body.DevEUI_uplink.payload_hex;
    //timestamp = req.body.DevEUI_uplink.Time;
    (req) => {
        count = count++;
    };

    console.log('req.body');
    res.sendStatus(200);
    // var SensorData =
    // {
    //     Tempurature: Number,
    //     Humidity: Number,
    //     PIN: Number,
    //     POUT: Number,
    //     Timestamp: String
    // };
    
    
    // var tempurature = hexToSignedInt(data[12]+data[13]+data[14]+data[15]);

    // var humidity = Number('0'+'X'+data[20]+data[21]);
    
    
    // console.log(sensordata[1] *0.1 + ' celcius');
    // console.log(sensordata[2] *0.5 + '%');
    // console.log(hexToSignedInt(data[26]+data[27]+data[28]+data[29])*0.001 +' degree in X angle');
    
    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("DATA");
    //     var myobj = SensorData;
            
    //     dbo.collection("SensorData").insertOne(myobj, function(err, res) {
    //       if (err) throw err;
    //       console.log("Document inserted");
    //       db.close();
    //     });


    //     dbo.collection("SENSOR").find({}).limit(20).toArray(function(err , result){  
    //         if(err) throw err;
    //         console.log(result);
    //         module.exports = {result};
    //         db.close();
    //       });

        //dbo.collection("SENSOR").deleteMany();
          
     // });
});
app.post('/receiveBeacon/leave', (req,res) => {

    console.log('1');
    res.sendStatus(200);
    // (req) => {
    //     let i = 0;
    //     if(req) {
    //         i = i++;
    //         console.log(i);
    //     }

    // }
});

app.listen(4000, () => {

    console.log('Start server at port 4000.')
  
  });

function send(showdb,ok){
    request.post({
        url:'https://10f31339.ngrok.io/' + showdb,
        



    },(err,) => {

    })
}
