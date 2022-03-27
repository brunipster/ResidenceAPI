require('dotenv-flow').config();
require ('module-alias/register')
const express = require ('express')
const router = express.Router()
const bodyParser = require('body-parser')
const routes = require('./src/routes')
const preValidationRequest = require('@Middleware/preValidationRequest')

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

require('./src/database');

const app = express()

app.use(bodyParser.json())

Object.keys(routes).forEach((key, index) => {
    routes[key].forEach((route) => {
        const {methods ,path ,controller, roles} = route
        router[methods.toLowerCase()](`/${key}${path}`, preValidationRequest(controller,roles))
    })
})

app.use('/api', router)

app.route('/', (req, res) => {
    res.send("Hello");
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});