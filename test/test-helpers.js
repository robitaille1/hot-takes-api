
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



module.exports = {
  cleanTables
}