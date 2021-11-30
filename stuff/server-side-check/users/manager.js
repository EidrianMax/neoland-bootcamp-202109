const registerUser = require('./logic/register-user')
const unregisterUser = require('./logic/unregister-user')
const authenticateUser = require('./logic/authenticate-user')
const retrieveUser = require('./logic/retrieve-user')
const findUsers = require('./logic/find-users')
const modifyUser = require('./logic/modify-user')

const { argv: [, , command] } = process

if (command === 'register') { // $ node manager register "Peter Pan" peterpan 123123123
    const { argv: [, , , name, username, password] } = process

    registerUser(name, username, password, error => {
        if (error) return console.error(error.message)

        console.log('user registered')
    })
} else if (command === 'unregister') { // $ node manager unregister kw0mnxlk 123123123
    const { argv: [, , , id, password] } = process

    unregisterUser(id, password, error => {
        if (error) return console.error(error.message)

        console.log(`user ${id} unregistered`)
    })
} else if (command === 'authenticate') { // $ node manager authenticate username password
    const { argv: [, , , username, password] } = process

    authenticateUser(username, password, (error, id) => {
        if (error) return console.error(error.message)

        console.log(`${id} has signin succssesfully`)
    })
} else if (command === 'retrieve') { // $ node manager retrieve kw0ms3h9
    const { argv: [, , , id] } = process

    retrieveUser(id, (error, user) => {
        if (error) return console.error(error.message)

        console.log(`Your name is ${user.name} and your username is ${user.username}`)
    })
} else if (command === 'find') { // $ node manager find pan
    const { argv: [, , , query] } = process

    findUsers(query, (error, results) => {
        if (error) return console.error(error.message)

        results.forEach(user => { console.log(user.name, user.username) })
    })
} else if (command === 'modify') { // $ node manager modify kw0ms3h9 . . 123123123:234234234
    const { argv: [, , , id, name, username, passwords] } = process

    const [oldPassword, password] = passwords.split(':')

    modifyUser(id, { name, username, oldPassword, password }, error => {
        if (error) return console.error(error.message)

        console.log(`user with ${id} modify`)
    })
}