"use strict"
/* ----------------- USER CONTROLLER -------------- */
const User = require('../models/user')
const Token = require('../models/token')
const passwordEncrypt = require('../helpers/passwordEncrypt')
const sendMail = require('../helpers/sendMail')

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ['Users']
            #swagger.summary = 'List Users'
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
        const data = await res.getModelList(User)
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            data
        })
    },
    create: async (req, res) => {
        /*
            #swagger.tags = ['Users']
            #swagger.summary = 'Create User'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "admin",
                    "password": "aA*123456",
                    "email": "admin@test.com",
                    "isActive": true,
                    "isAdmin": false
                }
            }
        */
        req.body.isAdmin = false

        const data = await User.create(req.body)

        let tokenKey = passwordEncrypt(data._id + Date.now())
        let tokenData = await Token.create({ userId: data._id, token: tokenKey })

        /* SENDING MAIL */
        sendMail(
            data.email, // user mail address
            'Welcome', // Subject
            ` 
                <p>Welcome to Rent A Car API</p>
                Bla bla bla
                Verify Email: http://127.0.0.1:8000/users/verify/?id=${data._id}&verifyCode=${passwordEncrypt(data.email)}
            ` // Message
        )
        /* SENDING MAIL */


        res.status(201).send({
            error: false,
            token: tokenData.token,
            data
        })
    },
    read: async (req, res) => {
        /*
            #swagger.tags = ['Users']
            #swagger.summary = 'Read a single user'
        */
        let filters = {}
        if (!req.user?.isAdmin) filters = { _id: req.user._id }

        const data = await User.findOne({ _id: req.params.id, ...filters })
        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
        /*
            #swagger.tags = ['Users']
            #swagger.summary = 'Update User'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "admin",
                    "password": "aA*123456",
                    "email": "admin@test.com",
                    "isActive": true,
                    "isAdmin": false
                }
            }
        */
        let filters = {}
        if (!req.user?.isAdmin) {
            filters = { _id: req.user._id }
            req.body.isAdmin = false
        }

        const data = await User.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
        res.status(202).send({
            error: false,
            data,
            new: await User.findOne({ _id: req.params.id })
        })
    },
    delete: async (req, res) => {
        /*
            #swagger.tags = ['Users']
            #swagger.summary = 'Delete a user'
        */
        const data = await User.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },

    verify: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Email Authentication'
            #swagger.description = `
                <p>id: "...userId..."</p>
                <p>verifyCode: "...passwordEncrypt(email)..."</p>
            `
        */
        // console.log(req.query)
        const { id: _id, verifyCode } = req.query
        const user = await User.findOne({ _id })
        if (
            user &&
            verifyCode == passwordEncrypt(user.email)
        ) {
            await User.updateOne({ _id }, { emailVerified: true })
            sendMail(
                user.email,
                'Email Verified',
                'Email Verified'
            )
            res.status(200).send({
                error: false,
                message: 'Email Verified'
            })
        } else {
            res.errorStatusCode = 402
            throw new Error('User not found')
        }

    }
}