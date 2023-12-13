"use strict"
/* -------------------- USER MODEL ---------------- */

const { mongoose } = require('../config/dbConnection')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, { collection: 'users', timestamps: true })

const passwordEncrypt = require('../helpers/passwordEncrypt')

UserSchema.pre(['save', 'updateOne'], function (next) {

    const isUpdate = this?._update
    const data = isUpdate ? this._update : this

    const isEmailValidated = data?.email
        ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
        : true

    if (isEmailValidated) {
        const isPasswordValidated = data?.password
            ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{8,}$/.test(data.password)
            : true

        if (isPasswordValidated) {
            if (data?.password) {
                this.password = data.password = passwordEncrypt(data.password)
                this._update = data // updateOne will wait data from "this._update".
            }
            next() // Allow to save.
        } else {
            next(new Error('Password not validated.'))
        }
    } else {
        next(new Error('Email not validated.'))
    }
})

module.exports = mongoose.model('User', UserSchema)