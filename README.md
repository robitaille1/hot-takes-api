# Hot Takes

## Live Link
https://hot-takes-app.lucasrobitaille.now.sh/

## Client Link
https://github.com/robitaille1/hot-takes-app

## Summary
Hot Takes is an app I have always wanted to create.
I created Hot Takes with the intention of it becoming something similar to Rotton Tomatos, but for sports commentary. I watch a lot of sports, and always see commentators with takes that don't really make sense, and commentators who don't intend to be factual or correct.

This app assists in keeping track of what commentators say and their predictions made. It provides each commentator with a hot takes score, to easily show the use who the most reliable commentator is.


### Api Documentation
If you don't see a commentator that you are looking for, add them! The more commentators the merrier. 


## /GET Commentators

/commentators
This endpoint will get all commentators within the database.
Each commentator has the field `name, network, twitter, instagram, about`
example:
`{name: 'Bill Simmons', network: 'The Ringer', twitter: 'https://twitter.com/BillSimmons', instagram: 'https://www.instagram.com/sptguy33/', about: 'William John Simmons III, is an American former sports writer and current sports analyst, author, and podcaster. Simmons first gained attention with his website as "The Boston Sports Guy" and was recruited by ESPN in 2001, where he eventually operated the website Grantland and worked until 2015.'}`

## /GET Takes

/takes
This endpoint will get all takes within the database.
Each take has the fields `take, commentatorId, commentator, correct, sport`
example:
`{take: 'The Celtics will beat the Cavs by 50 points', commentatorid: '1', commentator: 'Bill Simmons', correct: 'FALSE', sport: 'NBA'}`

## /GET Commentators/:id

/commentators/:id
This endpoint will get the commentator with the corresponding id.

## /GET Takes/:id

/takes/:id
This endpoint will get the take with the corresponding id.

## /POST Commentator

/commentators
This endpoint will post a new commentator to the database.

## /POST Take

/takes
This endpoint will post a new take to the database.

## /DELETE Commentators/:id

/commentators/:id
This endpoint will delete the commentator with the corresponding id.

### Please do not delete any of the default commentators, only delete commentators who you created. Thanks!

## /DELETE Takes/:id

/takes/:id
This endpoint will delete the take with the corresponding id.

### Please do not delete any of the default takes, only delete takes that you created. Thanks!


## Tech Used
This application was made using:
React, Redux, Express, Node, HTML, CSS
