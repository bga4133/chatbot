// run socket
const socket = io('http://localhost:3000')
// message form from dom
const messageForm = document.getElementById('send-container')
// message container from dom
const messageContainer = document.getElementById('message-container')
// message input from dom
const messageInput = document.getElementById('message-input')

// get Name
const name = prompt('What is your name')
appendMessage(` Welcome ${name}`);

// socket is ready
socket.on('chat-message', data => {
    appendMessage(data)
})

// getFood from api
getFood = async () => {
    const res = await axios.get(' http://localhost:4000/api/dishes');
    const response = res.data;
    return response;
}

// messgae form event submit 
 messageForm.addEventListener('submit',  async e => {
    e.preventDefault()
    // append message client
    const message = messageInput.value
    appendMessage(`You :  ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
    // get food function
    let dishes = await getFood();
    // append message boot
    let textBot = `Hi how are you ${name}? , Today's dish is ${dishes}, if you want to book you can do it, Thank you very much`
    appendMessage(textBot)
})

// function append different messages
function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.classList.add('divAppend');
    messageElement.innerText = message
    messageContainer.append(messageElement)
}