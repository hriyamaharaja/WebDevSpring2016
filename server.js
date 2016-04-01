var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var connectionString = 'mongodb://127.0.0.1:27017/cs5610spring2016';


if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require('./public/assignments/server/app.js')(app,db,mongoose);
require('./public/project/server/app.js')(app);

app.listen(port, ipaddress);
