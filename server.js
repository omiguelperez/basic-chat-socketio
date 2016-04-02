'use strict'

const express = require('express')
const http = require('http')
const swig = require('swig')

const path  = require('path')

const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)

server.on('listening', onListening)

// Configurando la aplicación
app.use(express.static(path.join(__dirname, 'public')))
app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'public', 'views'))

// Cambiando el enrutamiento a ./router/index.js
require('./router/index')(app)

function onListening() {
  console.log(`Server running on port ${port}`)
}

server.listen(port)
