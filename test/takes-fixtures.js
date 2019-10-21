function makeTakesArray() {
    return [
      {
          id: 1,
          take: 'test take',
          commentatorid: 1,
          commentator: 'Dave Test',
          correct: true,
          sport: 'NBA'
      },
      {
          id: 2,
          take: 'test take',
          commentatorid: 2,
          commentator: 'Billiam Test',
          correct: true,
          sport: 'NBA'
      },
      {
          id: 3,
          take: 'test take',
          commentatorid: 3,
          commentator: 'Jefe Test',
          correct: true,
          sport: 'NBA'
      },
      {
          id: 4,
          take: 'test take',
          commentatorid: 4,
          commentator: 'Dad Test',
          correct: true,
          sport: 'NBA'
      },
      {
          id: 5,
          take: 'test take',
          commentatorid: 1,
          commentator: 'Dave Test',
          correct: true,
          sport: 'NFL',
      },
      {
          id: 6,
          take: 'test take',
          commentatorid: 3,
          commentator: 'Jefe Test',
          correct: true,
          sport: 'NFL'
      },
      {
          id: 7,
          take: 'test take',
          commentatorid: 4,
          commentator: 'Dad Test',
          correct: true,
          sport: 'NHL'
      },
    ];
  }

  module.exports = {
    makeTakesArray,
  }