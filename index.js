let express = require('express');
let path = require('path');
let http = require('http');

let app = express();


app.engine('.html', require('ejs').__express);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'html');


// render static files
let publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/', function(req, res) {
    res.render('index', {
        appPage: 'Home'
    });
});

app.get('/grooming', function(req, res) {
    res.render('grooming', {
        appPage: 'Grooming'
    });
});

app.get('/boarding', function(req, res) {
    res.render('boarding', {
        appPage: 'Boarding'
    });
});

app.get('/training', function(req, res) {
    res.render('training', {
        appPage: 'Training'
    });
});






http.createServer(app).listen(3000);