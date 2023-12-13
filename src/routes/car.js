"use strict"
/* --------------------- CAR ROUTE ---------------- */

const router = require('express').Router()

const car = require('../controllers/car')
const permissions = require('../middlewares/permissions')

const upload = require('../middlewares/upload')

//? URL: /cars
router.route('/')
    .get(car.list)
    // .post(permissions.isAdmin, upload.single('image'), car.create)
    .post(permissions.isAdmin, upload.array('images'), car.create)
    // .post(permissions.isAdmin, upload.any(), car.create)

router.route('/:id')
    .get(car.read)
    .put(permissions.isAdmin, upload.array('images'), car.update)
    .patch(permissions.isAdmin, upload.array('images'), car.update)
    .delete(permissions.isAdmin, car.delete)

module.exports = router