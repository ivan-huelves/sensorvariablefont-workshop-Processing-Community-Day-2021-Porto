/*Sensor info
http://johnny-five.io/examples/temperature-lm35/
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
app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/client/index.html')
});
//end configuration

//declaration of variables
let sensor;
let sensorValue;
let normalizedValue;

//Arduino's control
new five.Board().on('ready', function() {
  console.log('We have connection to Arduino :)');
 
  //Water level sensor configuration on the board
   sensor = new five.Sensor({
    pin: "A5", //where the sensor is plugged in
    //freq: 100 //frequency of sensor reading
  });

  //Real-time registration of values
  sensor.on("change", function() {
    //you collect in one variable the value recorded
    sensorValue = this.value;

    //Normalizing Function
    //normalizedValue = five.Fn.map(sensorValue, minSensor, maxSensor, minAxesFont, maxAxesFont);
    //CHANGE HERE minSensor, maxSensor, minAxesFont and or maxAxesFont to your values
    normalizedValue = five.Fn.map(sensorValue, 2, 300, 200, 900);
    console.log("Water level: " + sensorValue);
  });

})

//Real time communication between server and client
io.on('connection', function(socket){
    //this is to see that we are connected
    console.log(`client: ${socket.id}`)
    //I send the value every X time to the client
    setInterval(() => {
      socket.emit('sendNormalizedSensorValue', normalizedValue, sensorValue) //I send the value with emit
    }, 100)

})
//end communication

//At which port I see the app
const port = process.env.PORT || 3000;
server.listen(port);
console.log(`Visit http://localhost:${port}`);
