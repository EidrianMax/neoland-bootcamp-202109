require('dotenv').config()
const { expect } = require('chai')
const { mongoose } = require('data')
const { NotFoundError, FormatError } = require('customs-errors')
const searchGames = require('./search-games')

const { env: { MONGO_URL } } = process

describe('searchGames', () => {
    before(() => mongoose.connect(MONGO_URL))

    it('should succeed with found correct games', async () => {
        const query = 'grand'

        const games = await searchGames(query)
        expect(games).to.be.instanceOf(Array)
        games.forEach(game => {
            expect(game).to.exist
            expect(game.id).to.exist
            expect(game.name).to.exist
            expect(game.platform).to.exist
            expect(game.description).to.exist
            expect(game.released).to.exist
            expect(game.backgroundImage).to.exist
        })
    })

    it(`should fail with doesn't found any game`, async () => {
        const query = 'grandtheft'

        try {
            const games = await searchGames(query)
            expect(games).to.be.instanceOf(Array)
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`game with that ${query} doesn't found`)
        }
    })

    describe('when parameters are not valid', () => {
        describe('when query is not valid', () => {
            it('should fail when query is not a string', () => {
                expect(() => searchGames(true)).to.throw(TypeError, 'query is not a string')
                expect(() => searchGames(123)).to.throw(TypeError, 'query is not a string')
                expect(() => searchGames({})).to.throw(TypeError, 'query is not a string')
                expect(() => searchGames(() => { })).to.throw(TypeError, 'query is not a string')
                expect(() => searchGames([])).to.throw(TypeError, 'query is not a string')
            })

            it('should fail when query is empty or blank', () => {
                expect(() => searchGames('')).to.throw(FormatError, 'query is empty or blank')
                expect(() => searchGames('   ')).to.throw(FormatError, 'query is empty or blank')
            })
        })
    })

    after(() =>
        mongoose.disconnect()
    )
})