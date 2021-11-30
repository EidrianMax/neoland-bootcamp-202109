const express = require('express')
const bodyParse = require('body-parser')

const app = express()

app.use(express.static('public')) // middleware

app.get('/hello', function (req, res) {
    const name = req.query.name

    const userAgent = req.headers['user-agent']

    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <title>Document</title>
</head>
<body>
    <h1>Hola ${name} </h1>
    <p>te has conectado con ${userAgent} </p>
    
</body>
</html>`)
})

app.get('/signup', function (req, res) {
    const name = req.query.name

    const userAgent = req.headers['user-agent']

    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <title>Document</title>
</head>
<body>
    <form method="post" action="/signup">
        <input type="text" name="name" placeholder="name">
        <input type="text" name="username" placeholder="usernaname">
        <input type="password" name="password" placeholder="password">
        <button type="send">Sign Up</button>
    </form>
</body>
</html>`)
})

const formBodyParse = bodyParse.urlencoded({ extends: false })

app.post('/signup', formBodyParse, function (req, res) {
    const { body: { name, usrename, password } } = req

    registerUser(name, usrename, password, function (error) {
        if (error) {
            res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <title>Document</title>
</head>
<body>
    <h1>Lo siento ${error.message}</h1>
    <a href="/signup">Intenta de nuevo</a>
</body>
</html>`)
        }
    })
})

app.listen(8000)

