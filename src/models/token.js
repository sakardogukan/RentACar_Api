"use strict"
/* --------------------- TOKEN MODEL -------------- */

const { mongoose } = require('../config/dbConnection')

const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // sorgularda index ile verilere daha hızlı ulaşılır.
    },
    token: {
        type: String,
        trim: true,
        required: true,
        index: true // sorgularda index ile verilere daha hızlı ulaşılır.
    }

}, { collection: 'tokens', timestamps: true })

module.exports = mongoose.model('Token', TokenSchema)