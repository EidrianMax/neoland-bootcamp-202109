// dot env
require('dotenv').config()

// externs package
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const { MongoClient } = require('mongodb')

// my logic
const { registerUser, authenticateUser, retrieveUser, modifyUser } = require('users')
const { searchVehicles } = require('vehicles')
const { context } = require('users')

const { env: { PORT, SECRET, MONGO_URL }, argv: [, , port = PORT || 8080] } = process

MongoClient.connect(MONGO_URL, (error, client) => {
    if (error) return console.error(error)

    context.db = client.db()

    const server = express()

    const api = express.Router()

    const jsonBodyParser = bodyParser.json()

    api.post('/users', jsonBodyParser, (req, res) => {
        const { body: { name, username, password } } = req

        try {
            registerUser(name, username, password, function (error) {
                if (error) return res.status(409).json({ error: error.message })

                res.status(201).send()
            })
        } catch ({ message }) {
            res.status(400).json({ error: message })
        }
    })

    api.post('/users/auth', jsonBodyParser, (req, res) => {
        const { body: { username, password } } = req

        try {
            authenticateUser(username, password, (error, id) => {
                if (error) return res.status(401).json({ error: error.message })

                const token = jwt.sign({ sub: id, exp: Math.floor(Date.now() / 1000) + 3600 }, SECRET)

                res.json({ token })
            })
        } catch ({ message }) {
            res.status(400).json({ error: message })
        }
    })

    api.get('/users', (req, res) => {
        const { headers: { authorization } } = req

        try {
            const [, token] = authorization.split(' ')

            const payload = jwt.verify(token, SECRET)

            const { sub: id } = payload

            retrieveUser(id, (error, user) => {
                if (error) return res.status(404).json({ error: message })

                res.json(user)
            })
        } catch ({ message }) {
            res.status(400).json({ error: message })
        }
    })

    api.patch('/users', jsonBodyParser, (req, res) => {
        const { headers: { authorization }, body: data } = req

        try {
            const [, token] = authorization.split(' ')

            const { sub: id } = jwt.verify(token, SECRET)

            modifyUser(id, data, function (error) {
                if (error) {
                    const { message } = error
                    let status = 400

                    if (message.includes('user with id'))
                        status = 404
                    else if (message.includes('username already exists'))
                        status = 409
                    else if (message.includes('wrong password'))
                        status = 401

                    return res.status(status).json({ error: error.message })
                }

                res.status(201).send()
            })
        } catch ({ message }) {
            res.status(400).json({ error: message })
        }
    })

    api.get('/hotwheels/vehicles', (req, res) => {
        const { query: { q } } = req

        try {
            searchVehicles(q, (error, vehicles) => {
                if (error) return res.status(400).json({ error: 'client error' })

                res.json(vehicles)
            })
        } catch (error) {
            res.status(400).json({ error: 'client error' })
        }
    })

    api.all('*', (req, res) => {
        res.status(404).json({ message: 'sorry, this endpoint isn\'t available' })
    })

    server.use('/api', api)

    server.listen(port, () => console.log(`server up and listening on port ${port}`))
})