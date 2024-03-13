const express = require('express');
const app = express();
const db = require('./dbconfig/db')();
const indexRoute = require('./routes');
const bodyParser = require('body-parser');

var cors = require('cors');

app.use(cors());
app.use(express.json())    
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',indexRoute)

app.listen('3200',()=>{
    console.log('Server listening on port 3200');
})