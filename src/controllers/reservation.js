"use strict"
/* ------------- RESERVATION CONTROLLER ----------- */

const Reservation = require('../models/reservation')
const Car = require('../models/car')

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags = ['Reservations']
            #swagger.summary = 'List Reservations'
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
        let filters = {}
        // Only self records. except admin:
        if (!req?.user.isAdmin) filters.userId = req.user._id

        const data = await res.getModelList(Reservation, filters, ['userId', 'carId'])
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Reservation, filters),
            data
        })
    },
    create: async (req, res) => {
        /*
            #swagger.tags = ['Reservations']
            #swagger.summary = 'Create Reservation'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "userId": "65343222b67e9681f937f001",
                    "carId": "65352f518a9ea121b1ca5001",
                    "startDate": "2023-10-10",
                    "endDate": "2023-10-16"
                }
            }
        */
        req.body.userId = req?.user._id

        const userReservationInDates = await Reservation.findOne({
            userId: req.body.userId,
            $nor: [
                { startDate: { $gt: req.body.endDate } },
                { endDate: { $lt: req.body.startDate } }
            ]
        })
        if (userReservationInDates) {
            res.errorStatusCode = 400
            throw new Error(
                'It can not be added because there is another reservation with the same date',
                { cause: { userReservationInDates: userReservationInDates } })
        } else {
            const data = await Reservation.create(req.body)
            res.status(201).send({
                error: false,
                data
            })
        }
    },
    read: async (req, res) => {
        /*
            #swagger.tags = ['Reservations']
            #swagger.summary = 'Read a single Reservation'
        */
        // Filters:
        let filters = {}
        // Only self records. except admin:
        if (!req?.user.isAdmin) filters.userId = req.user._id

        const data = await Reservation.findOne({ _id: req.params.id, ...filters }).populate(['userId', 'carId'])
        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
        /*
            #swagger.tags = ['Reservations']
            #swagger.summary = 'Update Reservation'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "userId": "65343222b67e9681f937f001",
                    "carId": "65352f518a9ea121b1ca5001",
                    "startDate": "2023-10-10",
                    "endDate": "2023-10-16"
                }
            }
        */
        const data = await Reservation.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
        res.status(202).send({
            error: false,
            data,
            new: await Reservation.findOne({ _id: req.params.id })
        })
    },
    delete: async (req, res) => {
        /*
            #swagger.tags = ['Reservations']
            #swagger.summary = 'Delete a Reservation'
        */
        const data = await Reservation.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}