const socket = io()

//With "on" I listen to the values sent by emit
socket.on('sendNormalizedSensorValue', function(normalizedValue, sensorValue){
  
  //I send the value of arduino sensor to a variable defined in CSS
  let variationAxes = document.getElementById("valueChangeVariationAxes");
  let variationAxes2 = document.getElementById("valueChangeVariationAxes2");
  
  //Signification Function
  variationAxes.style.setProperty('--weight', normalizedValue);//--name axis variation in CSS
  variationAxes2.style.setProperty('--weight', normalizedValue);//--name axis variation in CSS

  //To show the values in HTML
  let value = document.getElementById("showSensorValue");
  let value2 = document.getElementById("showAxesVariationValue");
  let value3 = document.getElementById("showAxesVariationValue2");

  value.innerHTML = `${sensorValue}`;
  value2.innerHTML = `${normalizedValue}`;
  value3.innerHTML = `${normalizedValue}`;
})