"use strict"
/* -------------------- INDEX.JS ------------------ */
//! Required Moduls:
const express = require('express')
const { dbConneciton } = require('./src/config/dbConnection')
const app = express()
require('dotenv').config()
const PORT = process.env?.PORT || "8000"
const HOST = process.env?.HOST || "127.0.0.1"
// console.log(process.env.PORT)

//! async-errors to errorHandler.js:
require('express-async-errors')

//? Cors Confg:
var cors = require('cors')
app.use(cors())
/* ------------------------------------------------ */
//! Configurations:

//? Connect to DB:
const { dbConnection } = require('./src/config/dbConnection')
dbConnection()

/* ------------------------------------------------ */
//! Middlewares:

//? Accept JSON:
app.use(express.json())

//? Call static uploadFile:
app.use('/img', express.static('./upload')) // browser'da: http:127.0.0.1:8000/img/image1.jpg

//? Authentication:
app.use(require('./src/middlewares/authentication'))

//? Run Logger:
app.use(require('./src/middlewares/logger'))

//? Searching & Sorting & Pagination:
app.use(require('./src/middlewares/findSearchSortPage'))

/* ------------------------------------------------ */
//! Routes:

//? Home Path:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to Rent a Car API',
        documents: {
            swagger: '/documents/swagger',
            redoc: '/documents/redoc',
            json: '/documents/json',
        },
        user: req.user
    })
})

app.use(require('./src/routes/index'))
/* ------------------------------------------------ */

/* ------------------------------------------------ */
//! Error-Handling Middleware:
app.use(require('./src/middlewares/errorHandler'))

//! Run Server:
app.listen(PORT, () => console.log(`Running: ${HOST}:${PORT}`))

//! Synchronization:
// require('./src/helpers/sync')()