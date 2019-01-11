const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var MongoClient = require('mongodb').MongoClient;
var request = require('request');

var countenter = 0;
var countleave = 0;

var url = "mongodb://localhost:27017/mydb";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("Hardware", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
}); 

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("Line", function(err, res) {
    if (err) throw err;
    console.log("Line Collection created!");
    db.close();
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


app.post('/',(req,res) => {
    var data = [];
    data = req.body.DevEUI_uplink.payload_hex;
    time = req.body.DevEUI_uplink.time;
    console.log(data);

    temp = hexToSignedInt(data[4]+data[5]+data[6]+data[7])*0.1;
    hum = hexToSignedInt(data[12]+data[13])*0.5 ;
    pin = hexToSignedInt(data[18]+data[19]+data[20]+data[21]);
    pout = hexToSignedInt(data[22]+data[23]+data[24]+data[25]);
   MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { Temp: temp, Humid: hum };
    dbo.collection("Hardware").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  }); 
});




app.post('/webhook', (req,res) => {
  var a = []
  let reply_token = req.body.events[0].replyToken
  let user = req.body.events[0].source.userId
  console.log(user)
  let msg = req.body.events[0].message.text
  console.log(msg)
  if(msg == 'Admin_Mon')
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var mysort = { _id: -1 };
    var dbo = db.db("mydb");
    dbo.collection("Hardware").find().sort(mysort).toArray(function(err, result) {
      if (err) throw err;
      a=result[0].Temp.toString()
      b=result[0].Humid.toString()

      let data = {
        to: user,
        messages: [
            {
                type: 'flex',
                altText: 'Flex Message',
                contents: {
                  type: 'bubble',
                  header: {
                    type: 'box',
                    layout: 'vertical',
                    contents: [
                      {
                        type: 'text',
                        text: 'Sanam Chandra Palace ',
                        size: 'xs',
                        weight: 'bold',
                        color: '#AAAAAA'
                      }
                    ]
                  },
                  hero: {
                    type: 'image',
                    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chali_Mongkol_Asana.jpg/1200px-Chali_Mongkol_Asana.jpg',
                    flex: 3,
                    align: 'start',
                    size: 'full',
                    aspectRatio: '20:13',
                    aspectMode: 'cover',
                    action: {
                      type: 'uri',
                      label: 'Action',
                      uri: 'https://linecorp.com/'
                    }
                  },
                  body: {
                    type: 'box',
                    layout: 'horizontal',
                    spacing: 'md',
                    contents: [
                      {
                        type: 'box',
                        layout: 'vertical',
                        flex: 1,
                        contents: [
                          {
                            type: 'image',
                            url: 'https://static.bhphotovideo.com/explora/sites/default/files/styles/top_shot/public/Color-Temperature.jpg?itok=yHYqoXAf',
                            gravity: 'bottom',
                            size: 'sm',
                            aspectRatio: '4:3',
                            aspectMode: 'cover'
                          },
                          {
                            type: 'image',
                            url: 'https://www.clipartmax.com/png/middle/251-2517394_backpacking-package-tour-tourism-cartoon-tourist-cartoon-png.png',
                            margin: 'md',
                            size: 'sm',
                            aspectRatio: '4:3',
                            aspectMode: 'cover'
                          }
                        ]
                      },
                      {
                        type: 'box',
                        layout: 'vertical',
                        flex: 2,
                        contents: [
                          {
                            type: 'text',
                            text: 'Temperature : '+a,
                            flex: 1,
                            size: 'xs',
                            gravity: 'top',
                            weight: 'bold'
                          },
                          {
                            type: 'separator',
                            color: '#2ABA11'
                          },
                          {
                            type: 'text',
                            text: 'Humidity     : '+b,
                            flex: 2,
                            size: 'xs',
                            gravity: 'center',
                            weight: 'bold'
                          },
                          {
                            type: 'separator',
                            color: '#54BC0A'
                          },
                          {
                            type: 'text',
                            text: 'P In      :',
                            flex: 2,
                            size: 'xs',
                            gravity: 'center',
                            weight: 'bold',
                            color: '#141813'
                          },
                          {
                            type: 'separator',
                            color: '#06BC0B'
                          },
                          {
                            type: 'text',
                            text: 'P Out    :',
                            flex: 1,
                            size: 'xs',
                            gravity: 'bottom',
                            weight: 'bold'
                          }
                        ]
                      }
                    ]
                  }
                }
              }
        ]
      }
      request({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer vkAoFTQJACw1uYwCNb05aAMq30C4QzVbLTCz4cTclj/FFdub70la4P00vdwHamyptmPU/JrGdd7roCBZ7ewc2rX/PWxDUCazquTAJqL/bCQwFm+2zTzh32qHM2jxecnhPs/LUTnDHugTdwHrH7JlVAdB04t89/1O/w1cDnyilFU='
        },
        url: 'https://api.line.me/v2/bot/message/push',
        method: 'POST',
        body: data,
        json: true
      }, function (err, res, body) {
        if (err) console.log('error')
        if (res) console.log('success')
        if (body) console.log(body)
      })
        res.sendStatus(200);

      db.close();
    });
  });

});





app.post('/receiveData/beacon/enter',(req,res) => {
  //console.log(req.body);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj1 = { In: 1, address: 0 };
    dbo.collection("Line").insertOne(myobj1, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted to line");
      db.close();
    });
  }); 
 res.sendStatus(200);
});

app.post('/receiveData/beacon/leave',(req,res) => {
  //console.log(req.body);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj1 = { In: 0, address: 1 };
    dbo.collection("Line").insertOne(myobj1, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted to line");
      db.close();
    });
  }); 
 res.sendStatus(200);
});







app.listen(4000,() => {

    console.log('Start server at port 4000.')
  });