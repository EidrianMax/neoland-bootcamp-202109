const { expect } = require('chai')
const modifyUser = require('./modify-user')
const { MongoClient, ObjectId } = require('mongodb')
const context = require('./context')

describe('modifyUser', () => {
    let client, db, users

    before(done => {
        client = new MongoClient('mongodb://localhost:27017')

        client.connect(error => {
            if (error) return done(error)
            db = client.db('demo')
            context.db = db
            users = db.collection('users')
            done()
        })
    })

    beforeEach(done => users.deleteMany({}, done))

    describe('whe user already exist', () => {
        let user, userId

        beforeEach(done => {
            user = {
                name: 'Mario Bros',
                username: 'mariobros',
                password: '12345678'
            }

            users.insertOne(user, (error, result) => {
                if (error) return done(error)

                userId = result.insertedId.toString()
                done()
            })
        })

        it('should succeed updating name and username on a pre-existing user', done => {
            let { name, username } = user

            name = name + '-update'
            username = username + '-update'

            const data = { name, username }
            modifyUser(userId, data, error => {
                if (error) return done(error)

                users.findOne({ _id: ObjectId(userId) }, (error, user) => {
                    if (error) return done(error)
                    expect(user.name).to.equal(name)
                    expect(user.username).to.equal(username)

                    done()
                })
            })
        })

        it('should succeed updating password on a pre-existing user', done => {
            const { password: oldPassword } = user
            const password = oldPassword + '-updated'

            const data = { oldPassword, password }

            modifyUser(userId, data, error => {
                if (error) return done(error)

                users.findOne({ _id: ObjectId(userId) }, (error, user) => {
                    if (error) return done(error)

                    expect(user.password).to.equal(password)

                    done()
                })
            })
        })

        it('should fail updating password on a pre-existing user when old password is wrong', done => {
            let { password: oldPassword } = user

            const password = oldPassword + '-updated'

            oldPassword += '-wrong'

            const data = { oldPassword, password }

            modifyUser(userId, data, error => {
                expect(error).to.exist
                expect(error.message).to.equal('wrong password')

                done()
            })
        })

        describe('when another user already exists', () => {
            beforeEach(done => {
                const user = {
                    name: 'Peter Pan',
                    username: 'peterpan',
                    password: '123123123'
                }

                users.insertOne(user, done)
            })

            it('should fail on updating username to a one that already exists', done => {
                const username = 'peterpan'

                modifyUser(userId, { username }, error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`user with username ${username} already exists`)

                    done()
                })
            })
        })
    })



    after(done => users.deleteMany({}, error => {
        if (error) return done(error)

        client.close(done)
    }))
})