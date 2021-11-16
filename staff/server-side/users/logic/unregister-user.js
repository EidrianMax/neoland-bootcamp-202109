const { readFile, writeFile } = require('fs')

function unregisterUser(id, password, callback) {
    readFile('./users.json', 'utf8', (error, json) => {
        if (error) return callback(error)

        const users = JSON.parse(json)

        const index = users.findIndex(user => user.id === id)

        if (index < 0) return callback(new Error(`user with id ${id} not found`))

        const user = users[index]

        if (user.password !== password) return callback(new Error(`wrong credentials`))

        users.splice(index, 1)

        const json2 = JSON.stringify(users, null, 4)

        writeFile('./users.json', json2, error => {
            if (error) return callback(error)

            callback(null)
        })
    })
}

module.exports = unregisterUser