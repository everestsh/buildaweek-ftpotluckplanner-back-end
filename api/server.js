const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require('./auth/auth-router.js')
const usersRouter = require("./users/users-router.js");
const path = require('path')

const db = require('./data/db-config')


function getAllUsers() { return db('users') }


const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', authRouter)
server.use("/api/users", usersRouter);
server.use(express.static(path.join(__dirname, 'client/build')))
server.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'client', 'index.html'))
})

server.get('/hello', (req, res) => {
  res.status(200).json('hello world!!!!!!')
})



server.use('*', (req, res, next) => {
  next({ status: 404, message: 'not found!' })
})

server.use((err, req, res, next) => { // eslint-disable-line 
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server
