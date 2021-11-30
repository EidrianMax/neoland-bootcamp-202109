
const createUser = (collection, data) => {

    return new Promise((resolve, reject) => {
        collection.insertOne(data, err => {
            if (err) reject(err)
            else {
                collection.find({}).toArray((err, users) => {
                    if (err) reject(err)
                    else resolve(users)
                })
            }
        })
    })
}

const updateUser = (collection, search, data) => {

    return new Promise((resolve, reject) => {
        collection.updateOne(search, { $set: data }, err => {
            if (err) reject(err)
            else {
                collection.find({}).toArray((err, users) => {
                    if (err) reject(err)
                    else resolve(users)
                })
            }
        })
    })
}

const findUser = (collection, search) => {
    return new Promise((resolve, reject) => {
        collection.find(search).toArray((err, users) => {
            if (err) reject(err)
            else resolve(users)
        })
    })
}

const deleteUser = (collection, search) => {
    return new Promise((resolve, reject) => {
        collection.deleteOne(search, err => {
            if (err) reject(err)
            else {
                collection.find({}).toArray((err, users) => {
                    if (err) reject(err)
                    else resolve(users)
                })
            }
        })
    })
}

module.exports = {
    createUser,
    updateUser,
    findUser,
    deleteUser
}