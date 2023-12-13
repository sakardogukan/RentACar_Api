"use strict"
/* -------------------- INDEX ROUTE ---------------- */

const router = require('express').Router()

router.use('/auth', require('./auth'))

router.use('/users', require('./user'))

router.use('/tokens', require('./token'))

router.use('/cars', require('./car'))

router.use('/reservations', require('./reservation'))

router.use('/documents', require('./document'))

module.exports = router