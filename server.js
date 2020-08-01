const io = require('socket.io')(8080)

const users = {}

io.on('connection', socket => {

  socket.on('new-user', name =>{
    console.log("New User Joined ")
    users[socket.id] = name
    console.log(name)
    socket.broadcast.emit('user-connected',name)
  })

  socket.on('send-chat-message',message =>{
    // emits the message to all the connect clients except the sender
    console.log("Message Sent")
    socket.broadcast.emit('chat-message',{message: message, name: users[socket.id]})
  })

  socket.on('disconnect', () =>{
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})
