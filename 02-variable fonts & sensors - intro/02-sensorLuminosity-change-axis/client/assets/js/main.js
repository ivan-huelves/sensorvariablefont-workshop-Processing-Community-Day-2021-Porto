window.onload = function() {
   
    // Create Socket.io object
    const socket = io();

    // Listen server sensor values emit by socket.io
    socket.on('sendNormalizedValue', function (normalizedValue) {

        // get the title DOM element
        let title = document.querySelector("#title");
        
        // Signification Function
        title.style.setProperty('--weightH1', normalizedValue);//--name axis variation in CSS

        //Show the values in HTML
        let value = document.getElementById("showAxesValue");
        value.innerHTML = `Weight axes value: ${normalizedValue}`;
    })
};

