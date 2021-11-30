require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()
const { registerUser, authenticateUser, retrieveUser, modifyUser, unregisterUser } = require('users')
const jwt = require('jsonwebtoken')

const { env: { PORT, SECRET }, argv: [, , port = PORT || 8080] } = process

const app = express()

app.post('/api/users', jsonBodyParser, (req, res) => {
    const { body: { name, username, password } } = req

    try {
        registerUser(name, username, password, error => {
            if (error) return res.status(409).json({ error: error.message })

            res.status(201).send()
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.post('/api/users/auth', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        authenticateUser(username, password, (error, id) => {
            if (error) return res.status(401).json({ error: error.message })

            const token = jwt.sign({ sub: id, exp: Math.floor(Date.now() / 1000) + 3600 }, SECRET)

            res.json({ token })
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.get('/api/users', (req, res) => {
    const { headers: { authorization } } = req

    try {
        const [, token] = authorization.split(' ')
        const payload = jwt.verify(token, SECRET)
        const { sub: id } = payload

        retrieveUser(id, (error, user) => {
            if (error) return res.status(404).json({ error: error.message })
            res.json(user)
        })

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

app.patch('/api/users', jsonBodyParser, (req, res) => {
    const { headers: { authorization }, body: data } = req

    try {
        const [, token] = authorization.split(' ')
        const payload = jwt.verify(token, SECRET)
        const { sub: id } = payload
        debugger
        modifyUser(id, data, error => {
            if (error) {
                const { message } = error
                let status = 400

                if (message.includes('user with id'))
                    status = 404
                else if (message.includes('username already exist'))
                    status = 409
                else if (message.includes('wrong password'))
                    status = 401

                return res.status(status).json({ error: message })
            }

            return res.status(201).send()
        })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// app.get('/unregister', (req, res) => {
//     res.send(unregister())
// })

// app.post('/unregister', formBodyParser, (req, res) => {
//     const { headers: { cookie }, body: { password } } = req

//     const id = getId(cookie)

//     try {
//         unregisterUser(id, password, error => {
//             if (error) return res.send(
//                 unregister({ feedback: error.message }))

//             res.send(postUnregister())
//         })
//     } catch (error) {
//         res.send(fail({ error: error.message }))
//     }

// })

// app.get('/exit', (req, res) => {
//     res.setHeader('Set-Cookie', `user-id=null; Max-Age=0`)
//     res.redirect('/')
// })

// app.get('*', (req, res) => {
//     res.send(fail({ message: `Opps, we can't seem to find the page you're looking for` }))
// })

app.listen(port, () => {
    console.log(`Server is ready on localhost port ${port}`)
})

