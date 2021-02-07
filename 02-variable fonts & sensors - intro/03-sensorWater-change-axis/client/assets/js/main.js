window.onload = function() {
    console.log("yuuuaaa");
    // Create Socket.io object
    const socket = io();

    // Listen server sensor values emit by socket.io
    socket.on('sendNormalizedValue', function (normalizedValue) {
        console.log("yuuuiii");
        // get the title DOM element
        let title = document.querySelector("#title");
        
        // Signification Function
        title.style.setProperty('--weightH1', normalizedValue);//--name axis variation in CSS

        //Show the values in HTML
        let value = document.getElementById("showAxesValue");
        value.innerHTML = `Weight axes value: ${normalizedValue}`;
    })
};

