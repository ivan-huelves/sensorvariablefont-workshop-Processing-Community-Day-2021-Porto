const socket = io()

//With "on" I listen to the values sent by emit
socket.on('sendNormalizedSensorValue', function(normalizedValue, sensorValue){
 
  //I send the value of arduino sensor to a variable defined in CSS
  let variationAxes = document.getElementById("valueChangeVariationAxes");

  //Signification Function
  variationAxes.style.setProperty('--italicWeight', normalizedValue);//--name axis variation in CSS

  //To show the values in HTML
  let value = document.getElementById("showSensorValue");
  let value2 = document.getElementById("showAxesVariationValue");

  value.innerHTML = `${sensorValue}`;
  value2.innerHTML = `${normalizedValue}`;

})
