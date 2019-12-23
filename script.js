const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')


const name = prompt('What is your name')
appendMessage(` Welcome ${name}`);


socket.on('chat-message', data => {
    appendMessage(data)
})

getFood = async () => {
    const res = await axios.get(' http://localhost:4000/api/dishes');
    const response = res.data;
    return response;
}

 messageForm.addEventListener('submit',  async e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You :  ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
    let dishes = await getFood();
    let textBot = `Hi how are you ${name}? , Today's dish is ${dishes}, if you want to book you can do it, Thank you very much`
    appendMessage(textBot)
})


function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.classList.add('divAppend');
    messageElement.innerText = message
    messageContainer.append(messageElement)
}