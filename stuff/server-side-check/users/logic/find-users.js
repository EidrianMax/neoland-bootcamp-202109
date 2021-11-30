const { readFile } = require('fs')

function findUsers(query, callback) {
    readFile(`${__dirname}/../users.json`, 'utf8', (error, json) => {
        if (error) return callback(error)

        const users = JSON.parse(json)

        query = query.toLowerCase()

        const results = users.filter(({ name, username }) => name.toLowerCase().includes(query) || username.toLowerCase().includes(query))

        if (results.length < 0) return callback(new Error(`user doesn't find`))

        callback(null, results)
    })
}

module.exports = findUsers