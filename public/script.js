const socket = io('/')
const messageForm = document.getElementById('send-container')
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')

const name = prompt("Whats your name")
appendMessage('You Joined')
socket.emit('new-user',name)


socket.on('chat-message', data =>{
  appendMessage(`${data.name}` + ': '+ `${data.message}`)
})

socket.on('user-connected', name =>{
  appendMessage(`${name} joined the room`)
})

socket.on('user-disconnected', name =>{
  appendMessage(`${name} left the room`)
})


messageForm.addEventListener('submit', e =>{
  e.preventDefault()
  const message = messageInput.value
  appendMessage('You: '+ message)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})


function appendMessage(message){
  const messageElement = document.createElement("div");
  messageElement.className = "message-item pl-2"
  messageElement.innerHTML = message
  // const user = document.createElement("h5");
  // user.innerHTML = message.name;
  // user.className = "card-title";

  // const msg = document.createElement("p");
  // msg.className = "card-text";
  // msg.innerHTML = message.message;

  // messageElement.append(user);
  // messageElement.append(msg);

  messageContainer.append(messageElement);

}
