const { MongoClient } = require('mongodb')
const { createUser, findUser, updateUser, deleteUser } = require('.')

const uri = 'mongodb://localhost:27017'

const client = new MongoClient(uri)

client.connect(err => {
    if (err) return console.error(err)
    const demo = client.db('demo')
    const users = demo.collection('users')
    console.log('Connected successfully to server')

    // users.find({}).toArray((err, users) => {
    //     if (err) return console.error(err)

    //     console.table(users)

    //     client.close()
    // })

    // const user = { name: 'Mario Bros', username: 'mariobros', password: '123123' }

    // createUser(users, user)
    //     .then(users => console.table(users))
    //     .catch(err => console.error(err))

    const query = { name: 'Mario Bros' }
    // const whatUpdate = { $set: { age: 600 } }
    findUser(users, query)
        .then(user => console.table(user))
        .catch(err => console.error(err))

    // updateUser(users, query, whatUpdate, (err, user) => {
    //     if (err) return console.error(err)
    //     console.table(user)
    // })

    // const name = { name: 'Mario Bros' }

    // deleteUser(users, name, (err, users) => {
    //     if (err) return console.error(err)

    //     console.table(users)
    // })

    // users.updateOne({ name: 'Luigi Bros' }, { $set: { username: 'amigoluigi', age: 100 } }, err => {
    //     if (err) return console.error(err)
    //     users.find({}).toArray((err, users) => {
    //         if (err) return console.error(err)

    //         console.table(users)

    //         client.close()
    //     })
    // })
})