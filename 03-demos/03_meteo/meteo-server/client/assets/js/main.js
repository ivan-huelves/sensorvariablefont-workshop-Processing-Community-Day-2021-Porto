window.onload = function() {

// Create Socket.io object  
const socket = io()

// Listen server sensor values emit by socket.io
socket.on('sendNormalizedSensorValue', function(normalizedValue, sensorValue){
 
  // get the id DOM element
  let variationAxes = document.getElementById("valueChangeVariationAxes");

  //Signification Function
  variationAxes.style.setProperty('--italicWeight', normalizedValue);//--name axis variation in CSS

  //Show the values in HTML
  let value = document.getElementById("showSensorValue");
  let value2 = document.getElementById("showAxesVariationValue");

  value.innerHTML = `${sensorValue}`;
  value2.innerHTML = `${normalizedValue}`;

})
};