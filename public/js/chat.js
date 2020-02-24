var socket = io.connect("http://localhost:8080");

//DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var send = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var to = document.getElementById('to');
var save = document.getElementById('save');
var chat = document.getElementById('chat')
var buttons = document.getElementsByClassName("buttons")
var body = document.getElementById('balls');

var testArr = []
var senderArr =[]

// Emit events

window.onload = () => {
    $.get({
        type: "POST",
        url: "/api/user",    
    }
    ).then(function(response) {
        console.log(response)
        senderArr.push(response)
        var username = senderArr[0]
        socket.emit("add-user", { "username": username });
        
        
    }).fail(function(err) {
        console.log(err)
    });
};

// save.addEventListener("click", () => {
//     var username = senderArr[0]
//     socket.emit("add-user", { "username": username });

//     var id = { sender: senderArr[0], reciever: testArr[0], chat: message.value }

//     $.ajax({
//         type: "POST",
//         url: "/api/post",
//         data: id
//     }
//     );




// });

send.addEventListener("click", (event) => {

    event.preventDefault();
    socket.emit('chat', {
        message: message.value,
        handle: senderArr[0]
    });

    socket.emit("private-message", {
        message: message.value,
        handle: senderArr[0],
        to: testArr[0]
    });

    var id = { sender: senderArr[0], reciever: testArr[0], chat: message.value }

    $.ajax({
        type: "POST",
        url: "/api/post",
        data: id
    }
    );


});


message.addEventListener("keypress", () => {
    socket.emit('typing', senderArr[0])
})


// display users
chat.addEventListener("click", (event) => {

    event.preventDefault();






    $.ajax({
        type: "POST",
        url: "/api/users",
        success: function (response) {
            console.log(response)

            var messages = JSON.parse(response)

            for (var i = 0; i < messages.length; i++) {
                var btn = document.createElement("BUTTON");   // Create a <button> element
                btn.innerHTML = messages[i];                   // Insert text
                document.body.appendChild(btn);               // Append <button> to <body>
                btn.className = "buttons";
                btn.onclick = function () {
                   

                    var username = senderArr[0]
                    socket.emit("add-user", { "username": username });
                    var userData = { reciever: this.innerHTML, sender: senderArr[0]}
                    

                    testArr = [this.innerHTML]

                    // testArr.push(recieverArr)
                    // console.log(recieverArr)
                    console.log(testArr)


                    $.ajax({
                        type: "POST",
                        url: "/api/chats",
                        data: userData,
                        success: function (response) {
                            
                            var chats = JSON.parse(response)
                            console.log(chats)

                                // Removes an element from the document
                            $( ".chats" ).remove();
                            
                            for(var i =0; i<chats.length; i++){

                                var listItem = document.createElement("LI")
                                listItem.innerHTML = chats[i].sender + " says: " + chats[i].chats;     
                                listItem.className = "chats";             
                                 $("#output").append(listItem);
                            }
                          
                            
                        }
                    }
                    );

                };
            }


        }
    }
    );

});
//listen for events

socket.on('chat', data => {
    feedback.innerHTML = ""
    output.innerHTML += `<p><strong> ${data.handle} </strong> ${data.message} </p>`
})

socket.on('private-message', data => {
    feedback.innerHTML = ""
    // output.innerHTML += `<p><strong> ${data.handle} </strong> ${data.message} </p>`
    $("#output").append(`<li class="chats">${data.handle} says: ${data.message}</li>`);
    
})

socket.on('typing', data => {
    feedback.innerHTML = `<p><em> ${data} is typing a message...</em></p>`
})


