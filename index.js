let express = require('express');
let mongoose = require('mongoose');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');
let http = require('http');
let setUpPassport = require('./setuppassport');
let routes = require('./routes');
let app = express();

mongoose.connect('mongodb://localhost:27017/test');
setUpPassport();
app.set('port', process.env.PORT || 3000);

app.set('views', path.resolve(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');


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
app.use(routes);



http.createServer(app).listen(3000);