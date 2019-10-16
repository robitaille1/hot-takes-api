const path = require('path')
const express = require('express')
const CommentatorsService = require('./commentators-service')

const commentatorsRouter = express.Router()
const jsonParser = express.json()

const serializeCommentator = commentator => ({
    id: commentator.id,
    name: commentator.name,
    network: commentator.network,
    twitter: commentator.twitter,
    instagram: commentator.instagram,
    about: commentator.about,
})

commentatorsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        CommentatorsService.getAllCommentators(knexInstance)
            .then(commentators => {
                res.json(commentators.map(serializeCommentator))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { name, network, twitter, instagram, about } = req.body
        const newCommentator = { name, network, twitter, instagram, about}

        for (const [key, value] of Object.entries(newCommentator))
            if (value == null)
                return res.status(400).json({
                error: { message: `Missing '${key}' in request body` }
                })
            CommentatorsService.insertCommentator(
                req.app.get('db'),
                newCommentator
            )
                .then(commentator => {
                    res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${commentator.id}`))
                    .json(serializeCommentator(commentator))
                })
                .catch(next)
    })


commentatorsRouter
    .route('/:commentatorId')
    .get((req, res, next) => {
        CommentatorsService.getById(
            req.app.get('db'),
            req.params.commentatorId
        )
        .then(commentator => {
            if(!commentator) {
                return res.status(404).json({
                    error: { message: `Commentator doesn't exist`}
                })
            }
            res.commentator = commentator
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeCommentator(res.commentator))
    })
    .delete((req, res, next) => {
        CommentatorsService.deleteCommentator(
            req.app.get('db'),
            req.params.commentatorId
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })

module.exports = commentatorsRouter