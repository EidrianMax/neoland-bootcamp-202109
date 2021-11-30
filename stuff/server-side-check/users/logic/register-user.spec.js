const { expect } = require('chai')
const registerUser = require('./register-user')
const { readFile, writeFile } = require('fs')

describe('registerUser', () => {
    beforeEach(done => {
        writeFile('./users.json', '[]', done)
    })

    it('should succeed when register new user', done => {
        const name = 'Coco'
        const username = 'cocodrian'
        const password = '12345678'

        registerUser(name, username, password, err => {
            if (err) return done(err)

            readFile('./users.json', 'utf-8', (err, content) => {
                if (err) return done(err)

                const users = JSON.parse(content)

                const user = users.find(user => user.username === username)

                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.username).to.equal(username)
                expect(user.password).to.equal(password)

                done()
            })
        })
    })

    describe('unhappy path', () => {
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

        it('should fail when user already exist', done => {
            const { name, username, password } = user

            registerUser(name, username, password, err => {
                expect(err).to.exist
                expect(err.message).to.equal(`user with username ${username} already exists`)
                done()
            })
        })
    })

    describe('when parametres are incorrect', () => {
        describe('when name is incorrect', () => {
            it('should fail when name is not a string', () => {
                expect(() => registerUser(123, '.', '.', () => { })).to.throw(TypeError, 'name is not a string')
                expect(() => registerUser(true, '.', '.', () => { })).to.throw(TypeError, 'name is not a string')
                expect(() => registerUser([], '.', '.', () => { })).to.throw(TypeError, 'name is not a string')
                expect(() => registerUser({}, '.', '.', () => { })).to.throw(TypeError, 'name is not a string')
                expect(() => registerUser(() => { }, '.', '.', () => { })).to.throw(TypeError, 'name is not a string')
            })
        })

        describe('when username is incorrect', () => {
            it('should fail when name is not a string', () => {
                expect(() => registerUser('.', 123, '.', () => { })).to.throw(TypeError, 'username is not a string')
                expect(() => registerUser('.', true, '.', () => { })).to.throw(TypeError, 'username is not a string')
                expect(() => registerUser('.', [], '.', () => { })).to.throw(TypeError, 'username is not a string')
                expect(() => registerUser('.', {}, '.', () => { })).to.throw(TypeError, 'username is not a string')
                expect(() => registerUser('.', () => { }, '.', () => { })).to.throw(TypeError, 'username is not a string')
            })
        })
    })

    afterEach(done => {
        writeFile('./users.json', '[]', done)
    })
})