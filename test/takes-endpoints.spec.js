const knex = require('knex')
const app = require('../src/app')
const fixtures = require('./takes-fixtures')
const commFixtures = require('./commentators-fixtures')
const helpers = require('./test-helpers')

describe('Takes Endpoints', function() {
    let db
    
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

      describe(`GET /api/takes`, () => {
        context(`Given no takes`, () => {
          it(`responds with 200 and an empty list`, () => {
            return supertest(app)
              .get('/api/takes')
              .expect(200, [])
          })
        })
        context('Given there are takes in the database', () => {
          const testCommentators = commFixtures.makeCommentatorsArray()
          const testTakes = fixtures.makeTakesArray()
          
          beforeEach('insert commentators', () => {
            return db
              .into('commentators')
              .insert(testCommentators)
          })

          beforeEach('insert takes', () => {
            return db
              .into('takes')
              .insert(testTakes)
          })
    
          it('gets the takes from the database', () => {
            return supertest(app)
              .get('/api/takes')
              .expect(200, testTakes)
          })
        })
    })
    describe('GET /api/takes/:id', () => {
      context(`Given no takes`, () => {
        it(`responds 404 whe take doesn't exist`, () => {
          return supertest(app)
            .get(`/api/takes/123`)
            .expect(404, {
              error: { message: `Take doesn't exist` }
            })
        })
      })
      context('Given there are takes in the database', () => {
        const testCommentators = commFixtures.makeCommentatorsArray()
        const testTakes = fixtures.makeTakesArray()
        
        beforeEach('insert commentators', () => {
        return db
            .into('commentators')
            .insert(testCommentators)
        })

        beforeEach('insert takes', () => {
        return db
            .into('takes')
            .insert(testTakes)
        })

        it('responds with 200 and the specified take', () => {
          const takeId = 2
          const expectedTake = testTakes[takeId - 1]
          return supertest(app)
            .get(`/api/takes/${takeId}`)
            .expect(200, expectedTake)
        })
      })
    })
    describe('DELETE /api/takes/:id', () => {
      context('Given there are takes in the database', () => {
        const testCommentators = commFixtures.makeCommentatorsArray()
        const testTakes = fixtures.makeTakesArray()
          
          beforeEach('insert commentators', () => {
            return db
              .into('commentators')
              .insert(testCommentators)
          })

          beforeEach('insert takes', () => {
            return db
              .into('takes')
              .insert(testTakes)
          })

        it('removes the take by ID from the store', () => {
          const idToRemove = 2
          const expectedTakes = testTakes.filter(tk => tk.id !== idToRemove)
          return supertest(app)
            .delete(`/api/takes/${idToRemove}`)
            .expect(204)
            .then(() =>
              supertest(app)
                .get(`/api/takes`)
                .expect(expectedTakes)
            )
        })
      })
    })
    describe('POST /api/takes', () => {
      context('Given commentators in the database', () => {
    

        ['take', 'commentatorid', 'commentator', 'correct', 'sport'].forEach(field => {
          const newTake = {
              take: 'I love sports',
              commentatorid: 3,
              commentator: 'Jefe Test',
              correct: false,
              sport: 'NBA'
          }
          it(`responds with 400 missing '${field}' if not supplied`, () => {
            delete newTake[field]
    
            return supertest(app)
              .post(`/api/takes`)
              .send(newTake)
              .expect(400, {
                error: { message: `Missing '${field}' in request body` }
              })
          })
          it(`responds with 400 missing '${field}' if not supplied`, () => {
            delete newTake[field]
    
            return supertest(app)
              .post(`/api/takes`)
              .send(newTake)
              .expect(400, {
                error: { message: `Missing '${field}' in request body` }
              })
          })
        })
        const testCommentators = commFixtures.makeCommentatorsArray()
        beforeEach('insert commentators', () => {
          return db
            .into('commentators')
            .insert(testCommentators)
        })
        it('adds a new take to the database', () => {
          const newTake = {
              take: 'I love sports',
              commentatorid: 3,
              commentator: 'Jefe Test',
              correct: false,
              sport: 'NBA'
          }

          return supertest(app)
          .post(`/api/takes`)
          .send(newTake)
          .expect(201)
          .expect(res => {
            expect(res.body.take).to.eql(newTake.take)
            expect(res.body.commentatorid).to.eql(newTake.commentatorid)
            expect(res.body.commentator).to.eql(newTake.commentator)
            expect(res.body.correct).to.eql(newTake.correct)
            expect(res.body.sport).to.eql(newTake.sport)
            expect(res.body).to.have.property('id')
            expect(res.headers.location).to.eql(`/api/takes/${res.body.id}`)
          })
          .then(res =>
            supertest(app)
              .get(`/api/takes/${res.body.id}`)
              .expect(res.body)
          )
      })
      })
    })
})