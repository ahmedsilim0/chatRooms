const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const getUser = document.getElementById("display-users")

if (messageForm != null) {
  const name = prompt('What is your name?')

  socket.emit('new-user', roomName, name)

  messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = ''
  })


}

socket.on('room-created', room => {
  const roomElement = document.createElement('div')
  roomElement.innerText = room
  const roomLink = document.createElement('a')
  roomLink.href = `/${room}`
  roomLink.innerText = 'join'
  roomContainer.append(roomElement)
  roomContainer.append(roomLink)

})


socket.on('user-connected', (names) => {
  // getUservat 
  getUser.innerHTML = "";
  for (var name of names) {
    var item = document.createElement('li')
    item.textContent = name
    getUser.append(item)
  }

})

socket.on('user-in' , (name)=>{
  appendMessage(`${name} connected`)
})

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
  //users.push(data.name);
})
socket.on('user-disconnected', names => {
  getUser.innerHTML = "";
  for (var name of names) {
    var item = document.createElement('li')
    item.textContent = name
    getUser.append(item)

  }
})
socket.on('user-left' , (name)=>{
  appendMessage(`${name} disconnected`)
})
function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
  messageContainer.scrollTo(0, messageContainer.scrollHeight)

}
