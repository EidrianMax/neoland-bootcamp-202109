const { readFile, writeFile } = require('fs')

function registerUser(name, username, password, callback) {
    readFile(`${__dirname}/../users.json`, 'utf8', (error, json) => {
        if (error) return callback(error)

        const users = JSON.parse(json)

        const user = users.find(user => user.username === username)

        if (user) return callback(new Error(`user with username ${username} already exists`))

        users.push({ id: Date.now().toString(36), name, username, password })

        const json2 = JSON.stringify(users, null, 4)

        writeFile(`${__dirname}/../users.json`, json2, error => {
            if (error) return callback(error)

            callback(null)
        })
    })
}

module.exports = registerUser