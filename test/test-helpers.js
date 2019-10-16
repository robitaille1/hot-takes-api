function makeCommentatorsArray() {
  return [
    {
        id: 1,
        name: 'Dave Test',
        network: 'test',
        twitter: 'https://www.twitter.com',
        instagram: 'https://www.instagram.com',
        about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
        id: 2,
        name: 'Billiam Test',
        network: 'test',
        twitter: 'https://www.twitter.com',
        instagram: 'https://www.instagram.com',
        about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
        id: 3,
        name: 'Jefe Test',
        network: 'test',
        twitter: 'https://www.twitter.com',
        instagram: 'https://www.instagram.com',
        about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
        id: 4,
        name: 'Dad Test',
        network: 'test',
        twitter: 'https://www.twitter.com',
        instagram: 'https://www.instagram.com',
        about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}

function makeTakesArray(commentators) {
  return [
    {
        id: 1,
        take: 'test take',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        commentatorId: commentators[0].id,
        commentator: commentators[0].name,
        correct: true,
        sport: 'NBA'
    },
    {
        id: 2,
        take: 'test take',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        commentatorId: commentators[1].id,
        commentator: commentators[1].name,
        correct: true,
        sport: 'NBA'
    },
    {
        id: 3,
        take: 'test take',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        commentatorId: commentators[2].id,
        commentator: commentators[2].name,
        correct: true,
        sport: 'NBA'
    },
    {
        id: 4,
        take: 'test take',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        commentatorId: commentators[3].id,
        commentator: commentators[3].name,
        correct: true,
        sport: 'NBA'
    },
    {
        id: 5,
        take: 'test take',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        commentatorId: commentators[0].id,
        commentator: commentators[0].name,
        correct: true,
        sport: 'NFL'
    },
    {
        id: 6,
        take: 'test take',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        commentatorId: commentators[2].id,
        commentator: commentators[2].name,
        correct: true,
        sport: 'NFL'
    },
    {
        id: 7,
        take: 'test take',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        commentatorId: commentators[3].id,
        commentator: commentators[3].name,
        correct: true,
        sport: 'NHL'
    },
  ];
}

function makeExpectedCommentator(commentator) {
  return {
    id: commentator.id,
    name: commentator.name,
    network: commentator.network,
    twitter: commentator.twitter,
    instagram: commentator.instagram,
    about: commentator.about,
  }
}

function makeExpectedCommentatorsTakes(commentatorId, takes) {
  const expectedTakes = takes
    .filter(take => take.commentatorId === commentatorId)

  return expectedTakes.map(take => {
    return {
      id: take.id,
      take: take.take,
      date: take.date.toISOString(),
      commentatorId: take.commentatorId ,
      commentator: take.commentator,
      correct: take.correct,
      sport: take.sport
    }
  })
}

function makeCommentatorsFixtures() {
  const testCommentators = makeCommentatorsArray()
  const testTakes = makeTakesArray(testCommentators)
  return { testCommentators, testTakes }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        commentators,
        takes
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE commentators_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE takes_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('commentators_id_seq', 0)`),
        trx.raw(`SELECT setval('takes_id_seq', 0)`),
      ])
    )
  )
}

function seedCommentatorsTables(db, commentators, takes) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
      await trx.into('commentators').insert(commentators)
      // update the auto sequence to match the forced id values
      await trx.raw(
        `SELECT setval('commentators_id_seq', ?)`,
         [commentators[commentators.length - 1].id],
      )
      // only insert comments if there are some, also update the sequence counter
    //   if (takes.length) {
    //     await trx.into('takes').insert(takes)
    //     await trx.raw(
    //       `SELECT setval('takes_id_seq', ?)`,
    //       [takes[takes.length - 1].id],
    //     )
    //   }
    })
  }


module.exports = {
  makeCommentatorsArray,
  makeExpectedCommentator,
  makeExpectedCommentatorsTakes,
  makeTakesArray,

  makeCommentatorsFixtures,
  cleanTables,
  seedCommentatorsTables,
}