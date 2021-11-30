const context = require('./context')
const { ObjectId } = require('mongodb')

function modifyUser(id, data, callback) { // data => { name: ?, username: ?, password: ? }
    if (typeof id !== 'string') throw new TypeError('id is not a string')
    if (!id.trim().length) throw new Error('id is empty or blank')

    if (typeof data !== 'object') throw new TypeError('data is not an object')

    if (typeof callback !== 'function') throw new TypeError('callback is not a function')

    const users = context.db.collection('users')

    const idMongo = { _id: ObjectId(id) }

    users.findOne(idMongo, (error, user) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user with id ${idMongo} not found`))

        const { password, oldPassword } = data

        if (password)
            if (oldPassword !== user.password)
                return callback(new Error('wrong password'))
            else
                delete data.oldPassword

        users.updateOne(idMongo, { $set: data }, error => {
            if (error) {
                if (error.code === 11000)
                    callback(new Error(`user with username ${data.username} already exist`))
                else
                    callback(error)
                return
            }
            callback(null)
        })
    })
}

module.exports = modifyUser