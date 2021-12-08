// const { expect } = require('chai')
// const { readFile, writeFile } = require('fs')
// const { findUsers } = require('./index')

// describe('findUser', () => {
//     let user
//     beforeEach(done => {
//         user = {
//             id: '1234',
//             name: 'Coco',
//             username: 'cocodrian',
//             password: '12345678'
//         }

//         const users = [user]

//         writeFile('./users.json', JSON.stringify(users), done)
//     })

//     it('ok', done => {
//         const { id, name, username } = user
//         findUsers(id, (err, results) => {
//             if (err) return done(err)

//             expect(id).to.equal(results.id)
//         })
//     })

//     afterEach(done => {
//         writeFile('./users.json', '[]', done)
//     })
// })

// TO-DO