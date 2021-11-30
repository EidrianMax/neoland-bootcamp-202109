const context = require('./context')
const { userId } = require('mongodb')

function retrieveUser(id, callback) {
    if (typeof id !== 'string') throw new TypeError('id is not a string')
    if (!id.trim().length) throw new Error('id is empty or blank')
    if (/\r?\n|\r|\t| /g.test(id)) throw new Error('id has blank spaces')
    if (id.length !== 24) throw new Error('id doesn\'t have 24 characters')

    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    const users = context.db.collection('users')

    users.findOne({ _id: ObjectId(id) }, (error, user) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user with id ${id} doesn't found`))

        user.id = user._id.toString()

        delete user._id
        delete user.password

        callback(null, user)
    })
}

module.exports = retrieveUser