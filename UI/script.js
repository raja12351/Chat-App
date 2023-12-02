const socket = io('http://localhost:3000');

const enter_btn = document.getElementById("join_btn");
const main_page = document.getElementById("main-page");
const chat_room = document.getElementById("chat-room");
const messages = document.getElementById("message-box");
const welcome = document.getElementById("welcome");
const input_sec = document.getElementById("input");
const send_btn = document.getElementById("send_btn");
const exit_btn = document.getElementById("exit_btn");
let username = '';

// main-page
enter_btn.addEventListener("click",(event)=>{
    event.preventDefault();
    username = document.getElementById('name_inp').value;
    console.log(username);

    if(username.trim() != ''){
        main_page.style.display = "none";
        chat_room.style.display = "block";
        input_sec.style.display = "flex";
        welcome.innerHTML = `
        <h3>Welcome To Chat-Room ${username}</h3>`;

        socket.emit('user enter',username);
        document.getElementById('name_inp').value = "";
    }
    else{
        alert("Username can't be empty!");
    }
});

// chat-room
send_btn.addEventListener("click",(event)=>{
    event.preventDefault();

    const data = {
        username: username,
        message: document.getElementById("messages").value
    }
    console.log(data);
    // message sent by me
    addMessage(data,true);

    socket.emit('message',data);

    document.getElementById("messages").value = "";
})

function addMessage(data, flag){
    var msgDiv = document.createElement("div");
    msgDiv.innerText = `${data.username}: ${data.message}`;

    if(flag){
        msgDiv.setAttribute('class','message sent');
    }
    else{
        msgDiv.setAttribute('class','message recieved');
    }
    messages.appendChild(msgDiv);
}

exit_btn.addEventListener("click",()=>{
    socket.emit('user exit',username);

    main_page.style.display = "block";
    chat_room.style.display = "none";
})

socket.on('user enter',(username) =>{
    console.log("user is ", username);

    var etr = document.createElement("div");
    etr.innerText = `${username} has joined`;
    etr.setAttribute('class',"info");
    
    messages.appendChild(etr);
});

socket.on('message',(data)=>{
    if(data.username != username){
        addMessage(data, false);
    }
});

socket.on('user exit',(userToExit)=>{
    if(userToExit != username){
        const msgDiv = document.createElement("div");
        msgDiv.innerText = `${userToExit} has left the chat`;
        msgDiv.setAttribute('class',"info");

        messages.append(msgDiv);
    }
});