const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var multer  = require('multer');
const fs = require('fs');
//Roues Declare
const userroutes = require('./routes/userroutes');
const vehicleroutes = require('./routes/vehicleroutes');
const productroutes = require('./routes/productroutes');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './my-uploads')},
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)//
  }
});
const upload = multer({ storage: storage });
//const upload = multer({ dest: 'uploads/' });

const connection = mysql.createConnection({
  host     : 'localhost',
  port: '4447',
  user     : 'root',
  password : 'MEdeiLDemO@2010',
  //database : 'medc_fixedsettings'
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
});

const port = process.env.PORT || 8080;
var corsOptions = {
  origin: "http://localhost:8080"
};
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userroutes(connection,upload));
app.use(vehicleroutes(connection,upload));
app.use(productroutes(connection,upload));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});