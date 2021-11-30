const { readFile } = require('fs')

function retrieveUser(id, callback) {

    readFile(`${__dirname}/../users.json`, 'utf8', (error, json) => {
        if (error) return callback(error)

        const users = JSON.parse(json)

        const user = users.find(user => user.id === id)

        if (!user) return callback(new Error(`user with id ${id} doesn't found`))

        delete user.id
        delete user.password

        callback(null, user)
    })
}

module.exports = retrieveUser