const express = require('express');
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var app = express();

mongoose.connect('mongodb://localhost:4000/TestDatabase');
var db = mongoose.connection;
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var SensorDataSchema = new Schema({
    Tempurature: SchemaTypes.Double,
    Humidity: SchemaTypes.Double,
    PIN:Number,
    POUT:Number,
    Timestamp:String
});

var SensorData = mongoose.model('Sensor',SensorDataSchema);