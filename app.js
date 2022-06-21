
const express = require('express');
const path = require('path');
const { response } = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

//add routes for the index.html and grooming.html pages
app.set('/views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index', {
        appTitle: 'Home',
        appName: 'Pets-R-Us'
    });
});
app.get('/grooming', function(request, response) {
    response.render('index', {
        appTitle: 'Grooming',
        appName: 'Pets-R-Us'
    });
});

app.use(function(request, response) {
    response.status(404),render('404');
});

app.listen(PORT, () => {
    console.log('Application started and listening on port ' + PORT);
});

