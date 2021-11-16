const registerUser = require('./logic/register-user')
const unregisterUser = require('./logic/unregister-user')

const { argv: [, , command] } = process

if (command === 'register') { // $ node manager register "Peter Pan" peterpan 123123123
    const { argv: [, , , name, username, password] } = process

    registerUser(name, username, password, error => {
        if (error) return console.log(error.message)

        console.log('user registered')
    })
} else if (command === 'unregister') { // $ node manager unregister kw0mnxlk 123123123
    const { argv: [, , , id, password] } = process

    unregisterUser(id, password, error => {
        if (error) return console.log(error.message)

        console.log(`user ${id} unregistered`)
    })
} else if (command === 'retrieve') { // $ node manager retrieve kw0ms3h9
    // TODO implement me
} else if (command === 'find') { // $ node manager find pan
    // TODO implement me
} else if (command === 'modify') { // $ node manager modify kw0ms3h9 . . 123123123:234234234
                                   // $ node manager modify kw0ms3h9 "Juanito Perez" . .
    // TODO implement me
}