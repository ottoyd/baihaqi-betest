const express = require('express')
const app = express()
require('dotenv').config()

const routers = require('./routers/index')
const { errHandle } = require('./middlewares/errHandle')
const { log } = require('./middlewares/log')

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(log)

app.use(routers)

app.use(errHandle)

module.exports = app