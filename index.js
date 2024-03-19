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

// app.post('/phoneno', (req, res) => {
//     const phoneNumber = req.body.phoneno;

//     const maxPhoneNumberLength = 15; 
  
//     if (!phoneNumber || phoneNumber.length > maxPhoneNumberLength) {
//       return res.status(400).json({ error: 'Invalid phone number' });
//     }
// });

app.listen('3200',()=>{
    console.log('Server listening on port 3200');
})