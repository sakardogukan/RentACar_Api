"use strict"
/* ---------------- SWAGGER AUTOGEN --------------- */

require('dotenv').config()
const PORT = process.env?.PORT || "8000"
const HOST = process.env?.HOST || "127.0.0.1"

const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')

const document = {
    info: {
        version: packageJson.version,
        title: packageJson.title,
        description: packageJson.description,
        termsOfservices: "http://localhost",
        contact: { name: packageJson.name, email: packageJson.email },
        license: { name: packageJson.license }
    },
    host: `${HOST}:${PORT}`,
    basePath: '/',
    schemes: ['http', 'https'],
    securityDefinitions: {
        Token: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'SimpleToken Auth * Example: <b>Token <i>...tokenKey...<i></b>'
        },
    },
    security: [{ Token: true }],
    definition: {
        Models: {
            'User': require('./src/models/user').schema.obj,
            'Car': require('./src/models/car').schema.obj,
            'Reservation': require('./src/models/reservation').schema.obj,
        }
    }
}

const routes = ['./index.js']
const outputFile = './src/config/swagger.json'

//? Create JSON file:
swaggerAutogen(outputFile, routes, document)