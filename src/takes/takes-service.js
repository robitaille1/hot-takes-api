const TakesService = {
    getAllTakes(knex) {
      return knex.select('*').from('takes')
    },
    insertTake(knex, newTake) {
      return knex
        .insert(newTake)
        .into('takes')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
    getById(knex, id) {
        return knex.from('takes').select('*').where('id', id).first()
    },
    deleteTake(knex, id) {
      return knex('takes')
        .where({ id })
        .delete()
    },
  }
  
  module.exports = TakesService