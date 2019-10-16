const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Commentators Endpoints', function() {
    let db
    
    const {
        testCommentators,
        testTakes
    } = helpers.makeCommentatorsFixtures()

    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
      })

      after('disconnect from db', () => db.destroy())

      before('cleanup', () => helpers.cleanTables(db))

      afterEach('cleanup', () => helpers.cleanTables(db))

      describe(`GET /api/commentators`, () => {
        context(`Given no commentators`, () => {
          it(`responds with 200 and an empty list`, () => {
            return supertest(app)
              .get('/api/commentators')
              .expect(200, [])
          })
        })      
    })
})