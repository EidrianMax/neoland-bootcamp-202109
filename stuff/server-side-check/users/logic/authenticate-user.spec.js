const { expect } = require('chai')
const authenticateUser = require('./authenticate-user')
const { readFile, writeFile } = require('fs')

describe('authenticateUser', () => {
    let user

    beforeEach(done => {
        user = {
            id: '1234',
            name: 'Coco',
            username: 'cocodrian',
            password: '12345678'
        }

        const users = [user]

        writeFile('./users.json', JSON.stringify(users), done)
    })

    it('should succeed when authenticate an user', done => {
        const { username, password } = user

        authenticateUser(username, password, (err, id) => {
            if (err) return done(err)

            expect(id).to.equal(user.id)

            done()
        })
    })

    afterEach(done => {
        writeFile('./users.json', '[]', done)
    })
})