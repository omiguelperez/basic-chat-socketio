'use strict'

const express = require('express')
const http = require('http')

const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)

server.on('listening', onListening)

// Cambiando el enrutamiento a ./router/index.js
require('./router/index')(app)

function onListening() {
  console.log(`Server running on port ${port}`)
}

server.listen(port)
