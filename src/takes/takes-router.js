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



module.exports = takesRouter