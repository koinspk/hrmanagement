const express = require('express')
const app = express();
const db = require('./dbconfig/db')();
const indexRoute = require('./routes');
const bodyParser = require('body-parser');
// const user = require('./model/user');
var cors = require('cors');
const cookieParser = require('cookie-parser');
   
app.use((req,res,next)=>{
    console.log(req.path + ' ' +req.method)
    next()
})

app.use(cookieParser());
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public/'))
app.use('/', indexRoute)



app.listen('3200', () => {
    console.log('Server listening on port 3200');
})