// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  const inputDate = req.params.date         
  const isValidDate = (Date.parse(inputDate) > 1) ? true : false;
  const isValidUnix = isNaN(inputDate) == false

  if(isValidDate && isValidUnix == false){
    console.log('valid date')    
    const utcDate = new Date(inputDate).toUTCString()        
    const unixDate = new Date(inputDate).getTime()
    console.log('unix: ', typeof unixDate)
    res.json({"unix":unixDate,"utc":utcDate})
  }
  else if(isValidUnix && isValidDate == false){
    const unixDate = parseInt(inputDate)
    const utcDate = new Date(parseInt(inputDate)).toUTCString()
    res.json({"unix":unixDate, "utc":utcDate})
  }
  else if(isValidDate == false && isValidUnix == false){
    console.log('invalid date')    
    res.status(400).json({error: "Invalid Date"})
  }
  else{
    console.log('default')    
    const currentTime = new Date()    
    const currentUnix = Math.floor(currentTime.getTime() / 1000);    
    res.json({"unix":currentUnix,"utc":currentTime})
  }

    
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
