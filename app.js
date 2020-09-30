require ("dotenv").config();
require ('module-alias/register')
const express = require ('express')
const router = express.Router()
const bodyParser = require('body-parser')
const routes = require('@Utils/routes')
require('./src/database');

const app = express()

app.use(bodyParser.json())

Object.keys(routes).forEach((key, index) => {
    routes[key].forEach((route) => {
        const {methods ,path ,controller} = route
        router[methods.toLowerCase()](`/${key}${path}`, controller)
    })
})

app.use('/api', router)

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});