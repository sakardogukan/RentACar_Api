"use strict"
/* -------------- AUTHORIZATION ROUTE -------------- */

const router = require('express').Router()

const auth = require('../controllers/auth')

router.post('/login', auth.login)
router.get('/logout', auth.logout)

module.exports = router