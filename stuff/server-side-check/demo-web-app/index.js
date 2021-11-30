require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const formBodyParser = bodyParser.urlencoded({ extended: false })
const { registerUser, authenticateUser, retrieveUser, unregisterUser } = require('users')
const { register, postRegister, login, home, landing, unregister, postUnregister, fail } = require('./components')
const { getId } = require('./helpers')

const { env: { PORT }, argv: [, , port = PORT || 8080] } = process

const app = express()

// app.use(express.static('public')) // go to public folder and run the index.html for default // middleware

// este get es para obtener la query y el user-agent 
app.get('/hello', (req, res) => { // http://localhost:8000/hello?name=query
    const name = req.query.name
    const userAgent = req.headers['user-agent']

    res.send(
        `${openHtml}
            <h1>Hola ${name} </h1>
            <p>te has conectado con ${userAgent} </p>
        ${closeHtml}`
    )
})

app.get('/', (req, res) => {
    const { headers: { cookie } } = req

    const id = getId(cookie)

    if (id)
        return retrieveUser(id, (error, user) => {
            if (error) return res.send(fail({ message: error.message }))

            res.send(home({ username: user.username }))
        })

    res.send(landing())
})

app.get('/register', (req, res) => {
    res.send(register())
})

app.post('/register', formBodyParser, (req, res) => {
    const { body: { name, username, password } } = req

    try {
        registerUser(name, username, password, error => {
            if (error) return res.send(
                register({ name, username, password, feedback: error.message })
            )

            res.send(postRegister())
        })
    } catch (error) {
        res.send(register({ name, username, password, feedback: error.message }))
    }
})

app.get('/login', (req, res) => {
    res.send(login())
})

app.post('/login', formBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        authenticateUser(username, password, (error, id) => {
            if (error) return res.send(
                login({ username, feedback: error.message })
            )

            res.setHeader('Set-Cookie', `user-id=${id}; Max-Age=3600`)

            res.redirect('/')
        })
    } catch (error) {
        res.send(login({ username, feedback: error.message }))
    }
})

app.get('/unregister', (req, res) => {
    res.send(unregister())
})

app.post('/unregister', formBodyParser, (req, res) => {
    const { headers: { cookie }, body: { password } } = req

    const id = getId(cookie)

    try {
        unregisterUser(id, password, error => {
            if (error) return res.send(
                unregister({ feedback: error.message }))

            res.send(postUnregister())
        })
    } catch (error) {
        res.send(fail({ error: error.message }))
    }

})

app.get('/exit', (req, res) => {
    res.setHeader('Set-Cookie', `user-id=null; Max-Age=0`)
    res.redirect('/')
})

app.get('*', (req, res) => {
    res.send(fail({ message: `Opps, we can't seem to find the page you're looking for` }))
})

app.listen(port, () => {
    console.log(`Server is ready on localhost port ${port}`)
})

