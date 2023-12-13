"use strict"
/* ----------------- DB CONNECTION ---------------- */

const mongoose = require('mongoose')

const dbConnection = function () {
    // mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.connect(process.env.MONGODB)
        .then(() => console.log('* DB Conneciton *'))
        .catch((err) => console.log('* DB Not Conneciton *', err))
}

module.exports = {
    mongoose,
    dbConnection
}