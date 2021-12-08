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

    describe('should fail when', () => {
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

        it('user already exist', done => {
            const { name, username, password } = user

            registerUser(name, username, password, err => {
                expect(err).to.exist
                expect(err.message).to.equal(`user with username ${username} already exists`)
                done()
            })
        })
    })

    describe('when parametres are incorrect', () => {
        describe('when format name is incorrect', () => {
            it('should fail when name is not a string', () => {
                expect(() => registerUser(123, '.', '.', () => { })).to.throw(TypeError, 'name is not a string')
                expect(() => registerUser(true, '.', '.', () => { })).to.throw(TypeError, 'name is not a string')
                expect(() => registerUser([], '.', '.', () => { })).to.throw(TypeError, 'name is not a string')
                expect(() => registerUser({}, '.', '.', () => { })).to.throw(TypeError, 'name is not a string')
                expect(() => registerUser(() => { }, '.', '.', () => { })).to.throw(TypeError, 'name is not a string')
            })

            it('should fail when name is empty or blank', () => {
                expect(() => registerUser(' ', '.', '.', () => { })).to.throw(Error, 'name is empty or blank')
            })

            it('should fail when name has blank spaces around', () => {
                expect(() => registerUser(' . ', '.', '.', () => { })).to.throw(Error, 'blank spaces around name')
            })
        })

        describe('when format username is incorrect', () => {
            it('should fail when username is not a string', () => {
                expect(() => registerUser('.', 123, '.', () => { })).to.throw(TypeError, 'username is not a string')
                expect(() => registerUser('.', true, '.', () => { })).to.throw(TypeError, 'username is not a string')
                expect(() => registerUser('.', [], '.', () => { })).to.throw(TypeError, 'username is not a string')
                expect(() => registerUser('.', {}, '.', () => { })).to.throw(TypeError, 'username is not a string')
                expect(() => registerUser('.', () => { }, '.', () => { })).to.throw(TypeError, 'username is not a string')
            })

            it('should fail when username is empty or blank', () => {
                expect(() => registerUser('.', ' ', '.', () => { })).to.throw(Error, 'username is empty or blank')
            })

            it('should fail when username has blank spaces around', () => {
                expect(() => registerUser('.', ' ... ', '.', () => { })).to.throw(Error, 'username has blank spaces')
            })

            it('should fail when username has less than 4 characters', () => {
                expect(() => registerUser('.', '...', '.', () => { })).to.throw(Error, 'has less than 4 characters')
            })
        })

        describe('when format password is incorrect', () => {
            it('should fail when name is not a string', () => {
                expect(() => registerUser('.', '....', 123, () => { })).to.throw(TypeError, 'password is not a string')
                expect(() => registerUser('.', '....', true, () => { })).to.throw(TypeError, 'password is not a string')
                expect(() => registerUser('.', '....', [], () => { })).to.throw(TypeError, 'password is not a string')
                expect(() => registerUser('.', '....', {}, () => { })).to.throw(TypeError, 'password is not a string')
                expect(() => registerUser('.', '....', () => { }, () => { })).to.throw(TypeError, 'password is not a string')
            })

            it('should fail when password is empty or blank', () => {
                expect(() => registerUser('.', '....', ' ', () => { })).to.throw(Error, 'password is empty or blank')
            })

            it('should fail when password has blank spaces around', () => {
                expect(() => registerUser('.', '....', ' ... ', () => { })).to.throw(Error, 'password has blank spaces')
            })

            it('should fail when password has less than 8 characters', () => {
                expect(() => registerUser('.', '....', '.......', () => { })).to.throw(Error, 'password has less than 8 characters')
            })
        })

        describe('when format callback is incorrect', () => {
            it('should fail when callback is not a function', () => {
                expect(() => registerUser('.', '....', '........', 123)).to.throw(TypeError, 'callback is not a function')
                expect(() => registerUser('.', '....', '........', true)).to.throw(TypeError, 'callback is not a function')
                expect(() => registerUser('.', '....', '........', [])).to.throw(TypeError, 'callback is not a function')
                expect(() => registerUser('.', '....', '........', {})).to.throw(TypeError, 'callback is not a function')
                expect(() => registerUser('.', '....', '........', '.')).to.throw(TypeError, 'callback is not a function')
            })
        })
    })

    afterEach(done => {
        writeFile('./users.json', '[]', done)
    })
})