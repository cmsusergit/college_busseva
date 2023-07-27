var express = require('express');
const bodyParser = require('body-parser');

var app = express();
// 
// app.use(bodyParser.urlencoded({ extended: true }));
var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring'),
    ccavReqHandler = require('./ccavRequestHandler.js'),
    ccavResHandler = require('./ccavResponseHandler.js');

app.use(express.static('public'));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

app.get('/about', function (req, res){
    res.render('dataFrom.html');
});

app.post('/ccavRequestHandler', function (request, response){
    console.log('----',request.body);
	ccavReqHandler.postReq(request, response);
});


app.post('/ccavResponseHandler', function (request, response){
        ccavResHandler.postRes(request, response);
});
app.listen(8080);













