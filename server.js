const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const cors = require('cors');

const dbconn = require('./dbconn');
require('dotenv').config();
//Import routes
const getRoutes = require('./routes/routes');




//Middleware
app.use(bodyParser.json());
//app.use(cors());
app.use('/', getRoutes);



dbconn.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

//Start listening server
  app.listen (3001, () => console.log("Server is listening to port 3001"));
});
