const registerUser = require('./register-user')
const unregisterUser = require('./unregister-user')
const authenticateUser = require('./authenticate-user')
const retrieveUser = require('./retrieve-user')
const findUsers = require('./find-users')
const modifyUser = require('./modify-user')

module.exports = {
    registerUser,
    unregisterUser,
    authenticateUser,
    retrieveUser,
    findUsers,
    modifyUser
}