// *******************************************
// Express - Config. App
'use strict';

// require express (Framework for Node.js server)
const express = require('express'); 
// create the app
const app = express();
// create the server
const server = require('http').createServer(app);

// Client-Server communication 
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/client'));
app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/client/index.html')
});
// End Config.

//Port config.
const port = process.env.PORT || 3000;
server.listen(port);
console.log(`App served at http://localhost:${port}`);

// *******************************************



// *******************************************
// Johnny-five - Arduino & js communication)

// require Johnny-five (arduino + js)
const five = require("johnny-five");

let normalizedValue;
let sensorValue;
let sensor;

// Arduino access
new five.Board().on('ready', function () {
    console.log('Now you are connected to Arduino :)');
  
    // Distance sensor config.
    sensor = new five.Proximity({
      controller: "HCSR04", // sensor name
      pin: 7 // pin number (in the arduino board)
    });
  
    // Listen sensor change event 
    sensor.on("change", function () {      
      // Math.round to round the sensor value
      sensorValue = Math.round(this.cm); 
      
      // Normalize function
      // Constrain: limit max. and min. values
      // Map: data equivalence sensor (min, max) to font axis (min, max)
      normalizedValue = five.Fn.constrain(five.Fn.map(sensorValue, 3, 25, 250, 900), 250, 900);
      //console.log(sensorValue);
    });
  });
// *******************************************



// *******************************************
// Socket.io - Real time communication between server and client

// Listen Connection event
io.on('connection', function (socket) {
    // Connection log
    console.log(`cliente: ${socket.id}`)
  
    // Send value every certain amount of time to the client
    setInterval(() => {
      socket.emit('sendNormalizedValue', normalizedValue)
    }, 1)
});
// *******************************************
