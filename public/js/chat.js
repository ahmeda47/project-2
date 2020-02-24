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


document.querySelector('#message').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
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
    
    }
});

// send.addEventListener("click", (event) => {

//     event.preventDefault();
//     socket.emit('chat', {
//         message: message.value,
//         handle: senderArr[0]
//     });

//     socket.emit("private-message", {
//         message: message.value,
//         handle: senderArr[0],
//         to: testArr[0]
//     });

//     var id = { sender: senderArr[0], reciever: testArr[0], chat: message.value }

//     $.ajax({
//         type: "POST",
//         url: "/api/post",
//         data: id
//     }
//     );


// });


message.addEventListener("keypress", () => {
    socket.emit('typing',{sender: senderArr, reciever: testArr[0]})
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
                // var btn = document.createElement("BUTTON");   
                // btn.innerHTML = messages[i];                  
                // document.body.appendChild(btn);               
                // btn.className = "buttons";

                var btn = document.createElement("BUTTON");   
                btn.innerHTML = messages[i];                  
                $("#conversation-list").append(btn);               
                btn.className = "buttons";
                // var btn = document.createElement("div");   
                // // btn.innerHTML = messages[i];  
                // btn.className = "conversation";             
                // $(".conversation-list").appendChild(btn); 
                // var title = document.createElement("div")
                // title.innerHTML = messages[i];
                // title.className = "title-text"
                // $(".title-text").appendChild(title); 

                // $('<div/>', {
                //     "class": "conversation active",
                //     "id": i
                
                // }).appendTo($("#conversation-list"));

                // $('<div/>', {
                //     "class": "title-text",
                //     text: messages[i]
                
                // }).appendTo(i);

                btn.onclick = function () {

                    var username = senderArr[0]
                    socket.emit("add-user", { "username": username });
                    var userData = { reciever: this.innerHTML, sender: senderArr[0]}
                    

                    testArr = [this.innerHTML]

                    // testArr.push(recieverArr)
                    // console.log(recieverArr)
                    console.log(testArr)

                    $("#firstName").text(testArr[0])


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
                                 $("#ulChats").append(listItem);

                                 if(chats[i].sender === senderArr[0]){
                                    listItem.className = "sender";   
            
                                 }else{
                                    listItem.className = "reciever"; 
                                 }
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

    
    if(data.handle === senderArr[0]){
        $("#ulChats").append(`<li class="sender">${data.handle} says: ${data.message}</li>`);   

     }else{
        $("#ulChats").append(`<li class="reciever">${data.handle} says: ${data.message}</li>`);
    
     }
    
})

socket.on('typing', data => {
    feedback.innerHTML = `<p><em> ${data.sender} is typing a message...</em></p>`
})


