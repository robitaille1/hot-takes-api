const path = require('path')
const express = require('express')
const TakesService = require('./takes-service')

const takesRouter = express.Router()
const jsonParser = express.json()

const serializeTake = take => ({
    id: take.id,
    take: take.take,
    date: take.date,
    commentatorid: take.commentatorid,
    commentator: take.commentator,
    correct: take.correct,
    sport: take.sport
  })

  takesRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        TakesService.getAllTakes(knexInstance)
            .then(takes => {
                res.json(takes.map(serializeTake))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { take, date, commentatorid, commentator, correct, sport } = req.body
        const newTake = { take, date, commentatorid, commentator, correct, sport }

        for (const [key, value] of Object.entries(newTake))
        if (value == null)
            return res.status(400).json({
            error: { message: `Missing '${key}' in request body` }
            })
        TakesService.insertTake(
            req.app.get('db'),
            newTake
        )
        .then(take => {
            res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${take.id}`))
            .json(serializeTake(take))
        })
        .catch(next)
    }) 

    takesRouter
        .route('/:takeId')
        .get((req, res, next) => {
            TakesService.getById(
                req.app.get('db'),
                req.params.takeId
            )
            .then(take => {
                if(!take) {
                    return res.status(404).json({
                        error: { message: `Take doesn't exist`}
                    })
                }
                res.take = take
                next()
            })
            .catch(next)
        })
        .get((req, res, next) => {
            res.json(serializeTake(res.take))
        })
        .delete((req, res, next) => {
            TakesService.deleteTake(
                req.app.get('db'),
                req.params.takeId
            )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
        })



module.exports = takesRouter