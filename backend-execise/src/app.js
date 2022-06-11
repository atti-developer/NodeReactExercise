"use strict";

const http = require('http');
const path = require("path");
const config = require('./config');
require('./config/dbconfig');


// Express Server Setup
const express = require('express');
const app = express();
const server = http.Server(app);
//Changed  by 
// Set HTTP Request Acceptance Format
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ extended: true, limit: '50mb' }));



// Set Static Path To Access Assets and Web Builds
app.use("/", express.static('public'));
app.use("/", express.static('public/web/customer/build'));

// Set CORS For HTTP Request
app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization,device_token,device_type,language,timezone');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});


// Set Routing For Backend HTTP Requests
const { Customer } = require('./routes');
app.use('/api/customer/', Customer);



//Set Response For Invalid Route (404)
app.use('/api/*', function (req, res, next) {
    try {
        res.send("URL NOT_FOUND");
    } catch (error) {
        res.send(error);
    }

});

// Run Server
server.listen(config.expressPort, function () {
    console.log(config.projectName + ' is running on port %s', config.expressPort);
});
