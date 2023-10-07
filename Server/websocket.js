const ws = require('ws')
require("dotenv").config()
const PORT = process.env.PORT || 5000

const wss = new ws.WebSocketServer({
    port: PORT,
}, () => console.log(`Server started on ${PORT}`))

wss.on('connection', function connection(ws) {
    ws.on('message', (message) => {
        message = JSON.parse(message)
        switch (message.event){
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})

const broadcastMessage = (message, id) => {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}