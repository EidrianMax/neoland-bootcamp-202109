const createUser = (collection, data) => {
    return new Promise((resolve, reject) => {
        collection.insertOne(data, err => {
            if (err) reject(err)
            else {
                collection.find({}).toArray((err, users) => {
                    if (err) reject(err)
                    resolve(users)
                })
            }
        })
    })
}

const findUser = (collection, query) => {
    return new Promise((resolve, reject) => {
        collection.findOne(query, (err, user) => {
            if (err) reject(err)

            resolve(user)
        })
    })
}

const updateUser = (collection, query, whatUpdate, callback) => {
    collection.updateOne(query, whatUpdate, err => {
        if (err) callback(err)

        collection.findOne(query, (err, user) => {
            if (err) return callback(err)
            callback(null, user)
        })
    })
}

const deleteUser = (collection, username, callback) => {
    collection.deleteOne(username, err => {
        if (err) callback(err)

        collection.find({}).toArray((err, users) => {
            if (err) return callback(err)
            callback(null, users)
        })
    })
}

module.exports = {
    createUser,
    findUser,
    updateUser,
    deleteUser
}