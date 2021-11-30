// El paquete requerido para conectarse con Mongo
const { MongoClient, ObjectId } = require('mongodb')
// El puerto en el que se encuentra alojada la bbdd en local
const client = new MongoClient('mongodb://localhost:27017')

// Librería con vuestras funciones
const { createUser, updateUser, findUser, deleteUser } = require('./logic-mongo')

// Configuración inicial de Mongo
client.connect(error => {
    if (error) return console.error(error)
    // Delcaración de la BBDD a la que apunta nuestro programa
    const demo = client.db('demo')
    // La coleción específica
    const usersCollection = demo.collection('users')


    // ----- Demo de createUser ------
    // const user = 'Ventu'
    // const user = { name: 'Ventu'}
    // const user = { name: 'Coco Drilo', username: 'cocoPromise2', password: '123123123 '}

    // createUser(usersCollection, user)
    // .then(user => console.table(user))
    // .catch(err => console.error(err))


    // ----- Demo de updateUser -----
    // const find = {_id : new ObjectId("619bc1f95d42735f916a32be")}
    // const data = {username: 'xFNighTMaRe', password: '12345678'}

    // updateUser(usersCollection, find, data)
    // .then(users => console.table(users))
    // .catch(err => console.error(err))

    // ----- Demo de findUser -----
    // const search = {name: 'Coco Drilo', username: 'coco'}

    // findUser(usersCollection, search)
    // .then(users => console.table(users))
    // .catch(err => console.error(err))

    // ----- Demo de deleteUser -----
    // const search = {username: 'coco'}

    // deleteUser(usersCollection, search)
    // .then(users => console.table(users))
    // .catch(err => console.error(err))
})