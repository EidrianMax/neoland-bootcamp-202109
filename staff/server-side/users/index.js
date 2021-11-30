const registerUser = require('./logic/register-user')
const unregisterUser = require('./logic/unregister-user')
const authenticateUser = require('./logic/authenticate-user')
const retrieveUser = require('./logic/retrieve-user')
const findUsers = require('./logic/find-users')
const modifyUser = require('./logic/modify-user')
const context = require('./logic/modify-user')

module.exports = {
    registerUser,
    unregisterUser,
    authenticateUser,
    retrieveUser,
    findUsers,
    modifyUser,
    context
}