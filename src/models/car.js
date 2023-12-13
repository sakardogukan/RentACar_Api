"use strict"
/* --------------------- CAR MODEL ---------------- */

const { mongoose } = require('../config/dbConnection')

const CarSchema = new mongoose.Schema({
    plateNumber: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    brand: {
        type: String,
        trim: true,
        required: true
    },
    model: {
        type: String,
        trim: true,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: 2000
    },
    isAutomatic: {
        type: Boolean,
        default: false
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    isPublish: {
        type: Boolean,
        default: true
    },
    // images: []
    images: {
        type: Array,
        default: []
    },
    createdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { collection: 'cars', timestamps: true })

module.exports = mongoose.model('Car', CarSchema)