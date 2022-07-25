
//  Title: index.js
//  Author: Andres Macias
//  Date: 07/24/22
//  Description: This page contains the mongodb connection and paths

let express = require('express');
let mongoose = require('mongoose');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let session = require('cookie-session'); 
let flash = require('connect-flash');
let passport = require('passport');
let http = require('http');
let setUpPassport = require('./setuppassport');
let routes = require('./routes');
let app = express();
let helmet = require('helmet');
let csurf = require('csurf');


mongoose.connect('mongodb+srv://andres:web340@buwebdev-cluster-1.pldlt.mongodb.net/test');
setUpPassport();
app.set('port', process.env.PORT || 3000);

app.set('views', path.resolve(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(helmet.xssFilter());


// render static files
let publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'ASdfg5463FH7*$fgh^',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(csurf());
app.use(routes);



http.createServer(app).listen(process.env.PORT || 3000);