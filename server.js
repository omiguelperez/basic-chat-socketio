'use strict'

const express = require('express')
const http = require('http')
const swig = require('swig')
const socketIO = require('socket.io')

const path  = require('path')

const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

server.on('listening', onListening)

io.on('connection', onConnection)

// Configurando la aplicación
app.use(express.static(path.join(__dirname, 'public')))
app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'public', 'views'))

// Cambiando el enrutamiento a ./router/index.js
require('./router/index')(app)

function onConnection(socket) {
	console.log('a user connected')

	socket.on('disconnect', function() {
		console.log('user disconnected')
	})

	socket.on('chat message', function(message) {
		io.emit('chat message', message)
	})
}

function onListening() {
  console.log(`Server running on port ${port}`)
}

server.listen(port)
