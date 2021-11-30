const express = require('express')
const bodyParser = require('body-parser')
const formBodyParser = bodyParser.urlencoded({ extended: false })
const { registerUser, authenticateUser, retrieveUser, unregisterUser } = require('users')
const { register, postRegister, login, home, landing } = require('./components')

const app = express()

// app.use(express.static('public')) // go to public folder and run the index.html for default // middleware

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

    const [, id] = cookie.split('=')

    if (id)
        try {
            retrieveUser(id, user => {
                if (error) return res.send(register())
            })
            return res.send(home())
        } catch (error) {
            if (error) return res.send(register())
        }

    res.send(landing())
})

app.get('/signup', (req, res) => {
    res.send(register())
})

app.post('/signup', formBodyParser, (req, res) => {
    const { body: { name, username, password } } = req

    try {
        registerUser(name, username, password, error => {
            if (error) return res.send(
                register({ name, username, password, feedback: error.message })
            )

            res.send(postRegister())
        })
    } catch (error) {
        if (error) return res.send(
            register({ name, username, password, feedback: error.message })
        )
    }
})

app.get('/signin', (req, res) => {
    res.send(login())
})

app.post('/signin', formBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        authenticateUser(username, password, (error, id) => {
            if (error) return res.send(
                login({ username, password, feedback: error.message })
            )

            res.setHeader('Set-Cookie', `user-id=${id}; Max-Age=3600`)

            res.redirect('/')
        })
    } catch (error) {
        if (error) return res.send(
            login({ username, password, feedback: error.message })
        )
    }
})

app.get('/unregister', (req, res) => {
    res.send(
        `${openHtml}
            <h1>Sign In</h1>
            <form method="POST" action="/unregister">
                <input type="password" name="password" placeholder="password">
                <button>Unregister</button>
            </form>
        ${closeHtml}`
    )
})

app.post('/unregister', formBodyParser, (req, res) => {
    const { headers: { cookie }, body: { password } } = req

    if (!cookie) return res.redirect('/')

    const [, id] = cookie.split('=')

    unregisterUser(id, password, error => {
        if (error) return res.send(
            `
                ${openHtml}
                    <h1>${error.message}</h1>
                    <p><a href="/home">Go Back</a></p>
                ${closeHtml}
            `
        )

        res.send(
            `
                ${openHtml}
                    <h1>You have unregistered succssesfully</h1>
                    <p><a href="/home">Go Back</a></p>
                ${closeHtml}
            `
        )

        res.redirect('/')
    })
})

app.listen(8000, () => {
    console.log('Server is ready on localhost port 8000');
})

