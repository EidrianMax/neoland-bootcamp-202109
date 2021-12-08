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

    describe('when parametres are incorrect', () => {
        describe('whem format name is incorrect', () => {
            it('should fail when username is not a string', () => {
                expect(() => { authenticateUser(123, '.', () => { }) }).to.throw(TypeError, 'username is not a string')
                expect(() => { authenticateUser(true, '.', () => { }) }).to.throw(TypeError, 'username is not a string')
                expect(() => { authenticateUser([], '.', () => { }) }).to.throw(TypeError, 'username is not a string')
                expect(() => { authenticateUser({}, '.', () => { }) }).to.throw(TypeError, 'username is not a string')
                expect(() => { authenticateUser(() => { }, '.', () => { }) }).to.throw(TypeError, 'username is not a string')
            })

            it('should fail when username is empty or blank', () => {
                expect(() => authenticateUser(' ', '.', () => { })).to.throw(Error, 'username is empty or blank')
            })

            it('should fail when username has blank spaces around', () => {
                expect(() => authenticateUser(' ... ', '.', () => { })).to.throw(Error, 'username has blank spaces')
            })

            it('should fail when username has less than 4 characters', () => {
                expect(() => authenticateUser('...', '.', () => { })).to.throw(Error, 'has less than 4 characters')
            })
        })

        describe('when format password is incorrect', () => {
            it('should fail when name is not a string', () => {
                expect(() => authenticateUser('....', 123, () => { })).to.throw(TypeError, 'password is not a string')
                expect(() => authenticateUser('....', true, () => { })).to.throw(TypeError, 'password is not a string')
                expect(() => authenticateUser('....', [], () => { })).to.throw(TypeError, 'password is not a string')
                expect(() => authenticateUser('....', {}, () => { })).to.throw(TypeError, 'password is not a string')
                expect(() => authenticateUser('....', () => { }, () => { })).to.throw(TypeError, 'password is not a string')
            })

            it('should fail when password is empty or blank', () => {
                expect(() => authenticateUser('....', ' ', () => { })).to.throw(Error, 'password is empty or blank')
            })

            it('should fail when password has blank spaces around', () => {
                expect(() => authenticateUser('....', ' ... ', () => { })).to.throw(Error, 'password has blank spaces')
            })

            it('should fail when password has less than 8 characters', () => {
                expect(() => authenticateUser('....', '.......', () => { })).to.throw(Error, 'password has less than 8 characters')
            })
        })

        describe('when format callback is incorrect', () => {
            it('should fail when callback is not a function', () => {
                expect(() => authenticateUser('....', '........', 123)).to.throw(TypeError, 'callback is not a function')
                expect(() => authenticateUser('....', '........', true)).to.throw(TypeError, 'callback is not a function')
                expect(() => authenticateUser('....', '........', [])).to.throw(TypeError, 'callback is not a function')
                expect(() => authenticateUser('....', '........', {})).to.throw(TypeError, 'callback is not a function')
                expect(() => authenticateUser('....', '........', '.')).to.throw(TypeError, 'callback is not a function')
            })
        })
    })

    afterEach(done => {
        writeFile('./users.json', '[]', done)
    })
})