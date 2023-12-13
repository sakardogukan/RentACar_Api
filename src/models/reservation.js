"use strict"
/* ------------------ RESERVATION MODEL ----------- */

const { mongoose } = require('../config/dbConnection')

const ReservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
}, { collection: 'reservations', timestamps: true })

module.exports = mongoose.model('Reservation', ReservationSchema)