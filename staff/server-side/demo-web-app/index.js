const express = require('express')

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

app.listen(8000)

