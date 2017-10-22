var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require('mongoose'),
  Task = require('./api/models/blogModel'),
  bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Blogdb'); 

var fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

var listRoutes = require('./api/routes/blogRoute');
listRoutes(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);