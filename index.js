let express = require('express');
let path = require('path');
let http = require('http');

let app = express();

//routes to the views folder
let viewsPath = path.resolve(__dirname, 'views');
app.use(express.static(viewsPath));

// routes to public folder
let publicPath = path.resolve(__dirname,'public');
app.use(express.static('public/'));







http.createServer(app).listen(3000);