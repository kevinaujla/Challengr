/*

server.js
express/node server 

*/

var express = require('express');
var morgan = require('morgan');
var request = require('request');

var path = require('path');

var Promise = require('bluebird');
var app = express();
var port = process.env.PORT || 3000;

app.use(morgan('dev')); 

app.use(express.static(__dirname + "/../client"));



app.listen(port);
console.log('Challengr is listening on port ', port);