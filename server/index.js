
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();



// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(function(req,res,next){
//    req.db = db;
//    next();
//});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/issuelist', function(req, res) {
    //var db = req.db;
    var collection = db.get('issues');
    collection.find({},{},function(e,docs){
        res.send({"issues" : docs});
    });
});


app.post('/newissue', function(req, res){
	console.log('body: ' + JSON.stringify(req.body));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})



