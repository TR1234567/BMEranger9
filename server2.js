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
});

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
//           });

//     });
// });

//   app.post('/', (req,res) => {
//     data = req.body.DevEUI_uplink.payload_hex;
//     timestamp = req.body.DevEUI_uplink.Time;
    
//      var jsontem = {
//         Sensor:"Tempuratue",
//          Value:hexToSignedInt(data[12]+data[13]+data[14]+data[15]),
//          Date:timestamp
//      };
     
//     var jsonanalog = {
//         Sensor:"analoginput",
//         Value:hexToSignedInt(data[58]+data[59]+data[60]+data[61])*0.01,
//         Date:timestamp
//     };

//     var jsonsensor =
//     {
//         Valuetem:hexToSignedInt(data[12]+data[13]+data[14]+data[15]),
//         Valuecom:hexToSignedInt(data[58]+data[59]+data[60]+data[61])*0.01,
//         time:timestamp
//     };
    
//     var barometer = Number('0'+'X'+data[4]+data[5]+data[6]+data[7])*0.1;
//     var tempurature = hexToSignedInt(data[12]+data[13]+data[14]+data[15]);

//     var humidity = Number('0'+'X'+data[20]+data[21]);

//     var acelerometerX =  hexToSignedInt(data[26]+data[27]+data[28]+data[29])*0.001;
//     var acelerometerY =  hexToSignedInt(data[30]+data[31]+data[32]+data[33])*0.001;
//     var acelerometerZ =  hexToSignedInt(data[34]+data[35]+data[36]+data[37])*0.001;

//     var gyroscopeX =  hexToSignedInt(data[42]+data[43]+data[44]+data[45])*0.001;
//     var gyroscopeY =  hexToSignedInt(data[46]+data[47]+data[48]+data[49])*0.001;
//     var gyroscopeZ =  hexToSignedInt(data[50]+data[51]+data[52]+data[53])*0.001;

//     var analoginput = hexToSignedInt(data[58]+data[59]+data[60]+data[61])*0.01;

//     var sensordata = [barometer,tempurature,humidity,acelerometerX,acelerometerY,acelerometerZ,gyroscopeX,gyroscopeY,gyroscopeZ,analoginput];
    
//     console.log(sensordata[0] *0.1 + ' hectopascal');
//     console.log(sensordata[1] *0.1 + ' celcius');
//     console.log(sensordata[2] *0.5 + '%');
//     console.log(hexToSignedInt(data[26]+data[27]+data[28]+data[29])*0.001 +' degree in X angle');
//     console.log(hexToSignedInt(data[30]+data[31]+data[32]+data[33])*0.001 +' degree in Y angle');
//     console.log(hexToSignedInt(data[34]+data[35]+data[36]+data[37])*0.001 +' degree in Z angle');
//     console.log(hexToSignedInt(data[42]+data[43]+data[44]+data[45])*0.001+' degree per second');
//     console.log(hexToSignedInt(data[46]+data[47]+data[48]+data[49])*0.001+' degree per second');
//     console.log(hexToSignedInt(data[50]+data[51]+data[52]+data[53])*0.001+' degree per second');
//     console.log(hexToSignedInt(data[58]+data[59]+data[60]+data[61])*0.01 +' degree');

//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("DATA");
//         var myobj = jsonsensor;
            
//         dbo.collection("SENSOR").insertOne(myobj, function(err, res) {
//           if (err) throw err;
//           console.log("Document inserted");
//           db.close();
//         });


//         dbo.collection("SENSOR").find({}).limit(20).toArray(function(err , result){  
//             if(err) throw err;
//             console.log(result);
//             module.exports = {result};
//             db.close();
//           });

//         dbo.collection("SENSOR").deleteMany();
          
//       });
// });

