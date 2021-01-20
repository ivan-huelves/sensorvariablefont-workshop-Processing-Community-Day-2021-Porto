/*The ultrasound distance sensor needs a specific Firmata:
https://gist.githubusercontent.com/rwaldron/0519fcd5c48bfe43b827/raw/f17fb09b92ed04722953823d9416649ff380c35b/PingFirmata.ino

Johnny five distance sensor library: HCSR04
http://johnny-five.io/examples/proximity-hcsr04/
*/

//startup configuration
'use strict';
//Johnny-five is the library to control Arduino with Js
const five = require("johnny-five");
//Framework for Node.js
const express = require('express'); 
const app = express();
const server = require('http').createServer(app);
//Library to communicate client and server in real time 
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/client'));
app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/client/index.html')
});
//end configuration

//declaration of variables
let sensor;
let sensorValue;
let normalizedValue;

//Arduino's control
new five.Board().on('ready', function () {
  console.log('We have connection to Arduino :)');

  //Distance sensor configuration on the board
  sensor = new five.Proximity({
    controller: "HCSR04", //sensor's name
    pin: 7 //where the sensor is plugged in
  });

  //Real-time registration of values
  sensor.on("change", function () {
    //you collect in one variable the value recorded
    sensorValue = Math.round(this.cm); //Math.round is to round up the value
    
    //Normalizing Function & Signification Function (Note that the axes font values are reversed)
    //normalizedValue = five.Fn.map(sensorValue, minSensor, maxSensor, maxAxesFont, minAxesFont);
    //CHANGE HERE minSensor, maxSensor, maxAxesFont and or minAxesFont to your values
    normalizedValue = five.Fn.map(sensorValue, 2, 25, 900, 250);
    console.log(sensorValue);
  });
})

//Real time communication between server and client
io.on('connection', function (socket) {
  //this is to see that we are connected
  console.log(`client: ${socket.id}`)

  //I send the value every X time to the client
  setInterval(() => {
    socket.emit('sendNormalizedSensorValue', normalizedValue, sensorValue)
  }, 500)
})
//end communication

//At which port I see the app
const port = process.env.PORT || 3000;
server.listen(port);
console.log(`Visit http://localhost:${port}`);
