const CommentatorsService = {
    getAllCommentators(knex) {
        return knex.select('*').from('commentators')
    },
    insertCommentator(knex, newCommentator) {
        return knex
            .insert(newCommentator)
            .into('commentators')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex.from('commentators').select('*').where('id', id).first()
    },
    deleteCommentator(knex, id) {
        return knex('commentators')
            .where({ id })
            .delete()
    },
    
}

module.exports = CommentatorsService