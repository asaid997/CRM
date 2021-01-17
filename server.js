const express = require('express')
const app = express()

const clientsApi = require('./server/routes/client')
const actionsApi = require('./server/routes/actions')
const dashboardApi = require('./server/routes/dashboard')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.use('/clients', clientsApi)
app.use('/actions', actionsApi)
app.use('/dashboard', dashboardApi)

const port = 3001
app.listen(port, () => console.log("running on port " + port));