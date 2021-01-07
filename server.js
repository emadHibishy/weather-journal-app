// Setup empty JS object to act as endpoint for all routes
projectData = {};

const bodyParser = require('body-parser');
const cors = require('cors');
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// routes
app.get('/all',(req, res, next)=>{
    res.send(projectData);
});

app.post('/addingData',(req, res, next)=>{
    projectData.temp    = req.body.temp;
    projectData.date    = req.body.date;
    projectData.feelings= req.body.feelings;
    res.end();
});

// Setup Server
const port = 8080;
app.listen(port,()=>{
    console.log(`app running on port ${port}`);
});