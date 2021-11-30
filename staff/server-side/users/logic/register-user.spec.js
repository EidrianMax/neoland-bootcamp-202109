// const { expect } = require('chai')
// const registerUser = require('./register-user')
// const { MongoClient } = require('mongodb')
// const context = require('./context')

// describe('registerUser', () => {
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

//     beforeEach(done => {
//         // users.drop(error => {
//         //     if (error) return done(error)

//         //     done()
//         // })

//         //users.drop(done)
//         //db.dropCollection('users', done)

//         users.deleteMany({}, done)
//     })

//     it('should succeed with new user', done => {
//         const name = 'Wendy Pan'
//         const username = 'wendypan'
//         const password = '123123123'

//         registerUser(name, username, password, error => {
//             if (error) return done(error)

//             users.findOne({ username }, (error, user) => {
//                 if (error) return done(error)

//                 expect(user).to.exist
//                 expect(user.name).to.equal(name)
//                 expect(user.username).to.equal(username)
//                 expect(user.password).to.equal(password)

//                 done()
//             })
//         })
//     })

//     describe('when user already exists', () => {
//         let user

//         beforeEach(done => {
//             user = {
//                 name: 'Wendy Pan',
//                 username: 'wendypan',
//                 password: '123123123'
//             }

//             users.insertOne(user, done)
//         })

//         it('should fail when user already exists', done => {
//             const { name, username, password } = user

//             registerUser(name, username, password, error => {
//                 expect(error).to.exist
//                 expect(error.message).to.equal(`user with username ${username} already exists`)

//                 done()
//             })
//         })
//     })

//     describe('when parameters are not valid', () => {
//         describe('when name is not valid', () => {
//             it('should fail when name is not a string', () => {
//                 expect(() => registerUser(true, 'wendypan', '123123123', () => { })).to.throw(TypeError, 'name is not a string')

//                 expect(() => registerUser(123, 'wendypan', '123123123', () => { })).to.throw(TypeError, 'name is not a string')

//                 expect(() => registerUser({}, 'wendypan', '123123123', () => { })).to.throw(TypeError, 'name is not a string')

//                 expect(() => registerUser(() => { }, 'wendypan', '123123123', () => { })).to.throw(TypeError, 'name is not a string')

//                 expect(() => registerUser([], 'wendypan', '123123123', () => { })).to.throw(TypeError, 'name is not a string')
//             })

//             it('should fail when name is empty', () => {
//                 expect(() => registerUser('', 'wendypan', '123123123', () => { })).to.throw(Error, 'name is empty or blank')

//                 expect(() => registerUser('   ', 'wendypan', '123123123', () => { })).to.throw(Error, 'name is empty or blank')
//             })

//             it('should fail when name has spaces around', () => {
//                 expect(() => registerUser(' Wendy Pan ', 'wendypan', '123123123', () => { })).to.throw(Error, 'blank spaces around name')
//             })
//         })

//         describe('when username is not valid', () => {
//             it('should fail when username is not a string', () => {
//                 expect(() => registerUser('Wendy Pan', true, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

//                 expect(() => registerUser('Wendy Pan', 123, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

//                 expect(() => registerUser('Wendy Pan', {}, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

//                 expect(() => registerUser('Wendy Pan', () => { }, '123123123', () => { })).to.throw(TypeError, 'username is not a string')

//                 expect(() => registerUser('Wendy Pan', [], '123123123', () => { })).to.throw(TypeError, 'username is not a string')
//             })

//             it('should fail when username is empty', () => {
//                 expect(() => registerUser('Wendy Pan', '', '123123123', () => { })).to.throw(Error, 'username is empty or blank')

//                 expect(() => registerUser('Wendy Pan', '   ', '123123123', () => { })).to.throw(Error, 'username is empty or blank')
//             })

//             it('should fail when username has spaces', () => {
//                 expect(() => registerUser('Wendy Pan', ' wendypan ', '123123123', () => { })).to.throw(Error, 'username has blank spaces')

//                 expect(() => registerUser('Wendy Pan', 'wendy pan', '123123123', () => { })).to.throw(Error, 'username has blank spaces')
//             })

//             it('should fail when username length is less that 4 characters', () => {
//                 expect(() => registerUser('Wendy Pan', 'wp', '123123123', () => { })).to.throw(Error, 'username has less than 4 characters')
//             })
//         })

//         describe('when password is not valid', () => {
//             it('should fail when password is not a string', () => {
//                 expect(() => registerUser('Wendy Pan', 'wendypan', true, () => { })).to.throw(TypeError, 'password is not a string')

//                 expect(() => registerUser('Wendy Pan', 'wendypan', 123, () => { })).to.throw(TypeError, 'password is not a string')

//                 expect(() => registerUser('Wendy Pan', 'wendypan', {}, () => { })).to.throw(TypeError, 'password is not a string')

//                 expect(() => registerUser('Wendy Pan', 'wendypan', () => { }, () => { })).to.throw(TypeError, 'password is not a string')

//                 expect(() => registerUser('Wendy Pan', 'wendypan', [], () => { })).to.throw(TypeError, 'password is not a string')
//             })

//             it('should fail when password is empty', () => {
//                 expect(() => registerUser('Wendy Pan', 'wendypan', '', () => { })).to.throw(Error, 'password is empty or blank')

//                 expect(() => registerUser('Wendy Pan', 'wendypan', '   ', () => { })).to.throw(Error, 'password is empty or blank')
//             })

//             it('should fail when password has spaces', () => {
//                 expect(() => registerUser('Wendy Pan', 'wendypan', ' 123123123 ', () => { })).to.throw(Error, 'password has blank spaces')

//                 expect(() => registerUser('Wendy Pan', 'wendypan', '123 123 123', () => { })).to.throw(Error, 'password has blank spaces')
//             })

//             it('should fail when password length is less that 8 characters', () => {
//                 expect(() => registerUser('Wendy Pan', 'wendypan', '123123', () => { })).to.throw(Error, 'password has less than 8 characters')
//             })
//         })

//         describe('when callback is not valid', () => {
//             it('should fail when callback is not a string', () => {
//                 expect(() => registerUser('Wendy Pan', 'wendypan', '123123123', true)).to.throw(TypeError, 'callback is not a function')

//                 expect(() => registerUser('Wendy Pan', 'wendypan', '123123123', 123)).to.throw(TypeError, 'callback is not a function')

//                 expect(() => registerUser('Wendy Pan', 'wendypan', '123123123', {})).to.throw(TypeError, 'callback is not a function')

//                 expect(() => registerUser('Wendy Pan', 'wendypan', '123123123', '...')).to.throw(TypeError, 'callback is not a function')

//                 expect(() => registerUser('Wendy Pan', 'wendypan', '123123123', [])).to.throw(TypeError, 'callback is not a function')
//             })
//         })
//     })

//     after(done => {
//         // client.close(error => {
//         //     if (error) return done(error)

//         //     done()
//         // })
//         client.close(done)
//     })
// })