// const { expect } = require('chai')
// const authenticateUser = require('./authenticate-user')
// const { MongoClient } = require('mongodb')
// const context = require('./context')

// describe('authenticateUser', () => {
//     let client, db, users

//     before(done => {
//         client = new MongoClient('mongodb://localhost:27017')

//         client.connect(error => {
//             if (error) return done(error)

//             db = client.db('demo')

//             context.db = db

//             users = db.collection('users')

//             done()
//         })
//     })

//     beforeEach(done =>
//         users.deleteMany({}, done)
//     )

//     let user, userId

//     beforeEach(done => {
//         user = {
//             name: 'Wendy Pan',
//             username: 'wendypan',
//             password: '123123123'
//         }

//         users.insertOne(user, (error, result) => {
//             if (error) return done(error)

//             userId = result.insertedId.toString()

//             done()
//         })
//     })

//     it('should succeed with correct credentials for an already existing user', done => {
//         const { username, password } = user

//         authenticateUser(username, password, (error, id) => {
//             if (error) return done(error)

//             expect(id).to.exist
//             expect(id).to.equal(userId)

//             done()
//         })
//     })

//     it('should fail with incorrect password', done => {
//         const { username, password } = user

//         authenticateUser(username, password + '-wrong', (error, id) => {
//             expect(error).to.exist
//             expect(error.message).to.equal('wrong credentials')

//             expect(id).to.be.undefined

//             done()
//         })
//     })

//     it('should fail with incorrect username', done => {
//         const { username, password } = user

//         authenticateUser(username + '-wrong', password, (error, id) => {
//             expect(error).to.exist
//             expect(error.message).to.equal('wrong credentials')

//             expect(id).to.be.undefined

//             done()
//         })
//     })

//     it('should fail with incorrect username and password', done => {
//         const { username, password } = user

//         authenticateUser(username + '-wrong', password + '-wrong', (error, id) => {
//             expect(error).to.exist
//             expect(error.message).to.equal('wrong credentials')

//             expect(id).to.be.undefined

//             done()
//         })
//     })

//     describe('when parameters are not valid', () => {
//         describe('when username is not valid', () => {
//             it('should fail when username is not a string', () => {
//                 expect(() => authenticateUser(true, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

//                 expect(() => authenticateUser(123, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

//                 expect(() => authenticateUser({}, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

//                 expect(() => authenticateUser(() => { }, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

//                 expect(() => authenticateUser([], '123123123', () => { })).to.throw(TypeError, 'username is not a string')
//             })

//             it('should fail when username is empty', () => {
//                 expect(() => authenticateUser('', '123123123', () => { })).to.throw(Error, 'username is empty or blank')

//                 expect(() => authenticateUser('   ', '123123123', () => { })).to.throw(Error, 'username is empty or blank')
//             })

//             it('should fail when username has spaces', () => {
//                 expect(() => authenticateUser(' wendypan ', '123123123', () => { })).to.throw(Error, 'username has blank spaces')

//                 expect(() => authenticateUser('wendy pan', '123123123', () => { })).to.throw(Error, 'username has blank spaces')
//             })

//             it('should fail when username length is less that 4 characters', () => {
//                 expect(() => authenticateUser('wp', '123123123', () => { })).to.throw(Error, 'username has less than 4 characters')
//             })
//         })

//         describe('when password is not valid', () => {
//             it('should fail when password is not a string', () => {
//                 expect(() => authenticateUser('wendypan', true, () => { })).to.throw(TypeError, 'password is not a string')

//                 expect(() => authenticateUser('wendypan', 123, () => { })).to.throw(TypeError, 'password is not a string')

//                 expect(() => authenticateUser('wendypan', {}, () => { })).to.throw(TypeError, 'password is not a string')

//                 expect(() => authenticateUser('wendypan', () => { }, () => { })).to.throw(TypeError, 'password is not a string')

//                 expect(() => authenticateUser('wendypan', [], () => { })).to.throw(TypeError, 'password is not a string')
//             })

//             it('should fail when password is empty', () => {
//                 expect(() => authenticateUser('wendypan', '', () => { })).to.throw(Error, 'password is empty or blank')

//                 expect(() => authenticateUser('wendypan', '   ', () => { })).to.throw(Error, 'password is empty or blank')
//             })

//             it('should fail when password has spaces', () => {
//                 expect(() => authenticateUser('wendypan', ' 123123123 ', () => { })).to.throw(Error, 'password has blank spaces')

//                 expect(() => authenticateUser('wendypan', '123 123 123', () => { })).to.throw(Error, 'password has blank spaces')
//             })

//             it('should fail when password length is less that 8 characters', () => {
//                 expect(() => authenticateUser('wendypan', '123123', () => { })).to.throw(Error, 'password has less than 8 characters')
//             })
//         })

//         describe('when callback is not valid', () => {
//             it('should fail when callback is not a string', () => {
//                 expect(() => authenticateUser('wendypan', '123123123', true)).to.throw(TypeError, 'callback is not a function')

//                 expect(() => authenticateUser('wendypan', '123123123', 123)).to.throw(TypeError, 'callback is not a function')

//                 expect(() => authenticateUser('wendypan', '123123123', {})).to.throw(TypeError, 'callback is not a function')

//                 expect(() => authenticateUser('wendypan', '123123123', '...')).to.throw(TypeError, 'callback is not a function')

//                 expect(() => authenticateUser('wendypan', '123123123', [])).to.throw(TypeError, 'callback is not a function')
//             })
//         })
//     })

//     after(done => client.close(done))
// })