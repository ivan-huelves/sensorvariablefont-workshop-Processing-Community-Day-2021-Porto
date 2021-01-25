window.onload = function() {

// Create Socket.io object
const socket = io()

// Listen server sensor values emit by socket.io
socket.on('sendNormalizedSensorValue', function(normalizedValue, sensorValue){
  
  // get the id DOM element
  let variationAxes = document.getElementById("valueChangeVariationAxes");
  let variationAxes2 = document.getElementById("valueChangeVariationAxes2");
  
  //Signification Function
  variationAxes.style.setProperty('--weight', normalizedValue);//--name axis variation in CSS
  variationAxes2.style.setProperty('--weight', normalizedValue);//--name axis variation in CSS

  //Show the values in HTML
  let value = document.getElementById("showSensorValue");
  let value2 = document.getElementById("showAxesVariationValue");
  let value3 = document.getElementById("showAxesVariationValue2");

  value.innerHTML = `${sensorValue}`;
  value2.innerHTML = `${normalizedValue}`;
  value3.innerHTML = `${normalizedValue}`;
})
};