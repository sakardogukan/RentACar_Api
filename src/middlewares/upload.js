"use strict"
/* -------------------- UPLOAD  -------------- */

/* UPLOAD FILES (multer middleware) */
const multer = require('multer')
const upload = multer({
    storage: multer.diskStorage({
        destination: './upload',
        filename: function (req, file, returnCallback) {
            // returnCallback(error, filename)
            returnCallback(null, file.originalname)
        }
    })
})

module.exports = upload