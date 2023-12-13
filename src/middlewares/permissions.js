"use strict"
/* -------------------- PERMISSIONS -------------- */

module.exports = {
    isLogin: (req, res, next) => {
        if (req.user && req.user.isActive) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('No Permission: You must login.')
        }
    },
    isAdmin: (req, res, next) => {
        if (req.user && req.user.isActive && req.user.isAdmin) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('No permission: you must login and to be admin')
        }
    }
}