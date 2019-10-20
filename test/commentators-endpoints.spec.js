const knex = require('knex')
const app = require('../src/app')
const fixtures = require('./commentators-fixtures')
const helpers = require('./test-helpers')


describe.only('Commentators Endpoints', function() {
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

      describe(`GET /api/commentators`, () => {
        context(`Given no commentators`, () => {
          it(`responds with 200 and an empty list`, () => {
            return supertest(app)
              .get('/api/commentators')
              .expect(200, [])
          })
        })
        context('Given there are commentators in the database', () => {
          const testCommentators = fixtures.makeCommentatorsArray()
    
          beforeEach('insert Commentators', () => {
            return db
              .into('commentators')
              .insert(testCommentators)
          })
    
          it('gets the commentators from the database', () => {
            return supertest(app)
              .get('/api/commentators')
              .expect(200, testCommentators)
          })
        })
    })
    describe('GET /api/commentators/:id', () => {
      context(`Given no commentators`, () => {
        it(`responds 404 whe commentator doesn't exist`, () => {
          return supertest(app)
            .get(`/api/commentators/123`)
            .expect(404, {
              error: { message: `Commentator doesn't exist` }
            })
        })
      })
      context('Given there are commentators in the database', () => {
        const testCommentators = fixtures.makeCommentatorsArray()
  
        beforeEach('insert commentators', () => {
          return db
            .into('commentators')
            .insert(testCommentators)
        })
  
        it('responds with 200 and the specified commentator', () => {
          const commentatorId = 2
          const expectedCommentator = testCommentators[commentatorId - 1]
          return supertest(app)
            .get(`/api/commentators/${commentatorId}`)
            .expect(200, expectedCommentator)
        })
      })
    })
    describe('DELETE /api/commentators/:id', () => {
      context('Given there are commentators in the database', () => {
        const testCommentators = fixtures.makeCommentatorsArray()
  
        beforeEach('insert commentators', () => {
          return db
            .into('commentators')
            .insert(testCommentators)
        })
  
        it('removes the commentator by ID from the store', () => {
          const idToRemove = 2
          const expectedCommentators = testCommentators.filter(cm => cm.id !== idToRemove)
          return supertest(app)
            .delete(`/api/commentators/${idToRemove}`)
            .expect(204)
            .then(() =>
              supertest(app)
                .get(`/api/commentators`)
                .expect(expectedCommentators)
            )
        })
      })
    })
    describe('POST /api/commentators', () => {
      ['network', 'twitter', 'instagram', 'about'].forEach(field => {
        const newCommentator = {
          name: 'test-name',
          network: 'TEST',
          twitter: 'https://test.com',
          instagram: 'https://test.com',
          about: 'I am a test commentator'
        }
  
        it(`responds with 400 missing '${field}' if not supplied`, () => {
          delete newCommentator[field]
  
          return supertest(app)
            .post(`/api/commentators`)
            .send(newCommentator)
            .expect(400, {
              error: { message: `Missing '${field}' in request body` }
            })
        })
      })
      it('adds a new commentator to the database', () => {
        const newCommentator = {
          name: 'test-name',
          network: 'TEST',
          twitter: 'https://test.com',
          instagram: 'https://test.com',
          about: 'I am a test commentator'
        }
        return supertest(app)
          .post(`/api/commentators`)
          .send(newCommentator)
          .expect(201)
          .expect(res => {
            expect(res.body.name).to.eql(newCommentator.name)
            expect(res.body.network).to.eql(newCommentator.network)
            expect(res.body.twitter).to.eql(newCommentator.twitter)
            expect(res.body.instagram).to.eql(newCommentator.instagram)
            expect(res.body.about).to.eql(newCommentator.about)
            expect(res.body).to.have.property('id')
            expect(res.headers.location).to.eql(`/api/commentators/${res.body.id}`)
          })
          .then(res =>
            supertest(app)
              .get(`/api/commentators/${res.body.id}`)
              .expect(res.body)
          )
      })
    })
    describe(`PATCH /api/commentators/:id`, () => {
        context('Given there are commentators in the database', () => {
          const testCommentators = fixtures.makeCommentatorsArray()
  
          beforeEach('insert commentators', () => {
            return db
              .into('commentators')
              .insert(testCommentators)
          })
        
              it('responds with 204 and updates the commentators', () => {
                const idToUpdate = 2
                const updateCommentator = {
                  id: 2,
                  name: 'updated test commentator',
                  network: 'New Network',
                  twitter: 'new twitter',
                  instagram: 'new instagram',
                  about: 'updated about content',
                }
                
                const expectedCommentator = {
                  ...testCommentators[idToUpdate - 1],
                  ...updateCommentator
                }
                return supertest(app)
                  .patch(`/api/commentators/${idToUpdate}`)
                  .send(updateCommentator)
                  .expect(204)
                  .then(res => 
                      supertest(app)
                      .get(`/api/commentators/${idToUpdate}`)
                      .expect(expectedCommentator)
                    )
              })
              it(`responds with 400 when no required fields supplied`, () => {
                const idToUpdate = 2
                return supertest(app)
                  .patch(`/api/commentators/${idToUpdate}`)
                  .send({ irrelevantField: 'foo' })
                  .expect(400, {
                    error: {
                      message: `Request body must contain either 'name' or 'network'`
                    }
                  })
              })
              it(`responds with 204 when updating only a subset of fields`, () => {
                const idToUpdate = 2
                const updateCommentator = {
                  name: 'updated name test',
                }
                const expectedCommentator = {
                  ...testCommentators[idToUpdate - 1],
                  ...updateCommentator
                }
          
                return supertest(app)
                  .patch(`/api/commentators/${idToUpdate}`)
                  .send({
                    ...updateCommentator,
                    fieldToIgnore: 'should not be in GET response'
                  })
                  .expect(204)
                  .then(res =>
                    supertest(app)
                      .get(`/api/commentators/${idToUpdate}`)
                      .expect(expectedCommentator)
                  )
              })
            })  
       })
})