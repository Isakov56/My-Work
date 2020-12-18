const express = require("express")
const { check, validationResult } = require("express-validator")
const uniqid = require("uniqid")
const { getMovies, writeMovies, getOMDBMovies} = require("../../lib/fsUtilities")
const axios = require("axios")

const mediasRouter = express.Router()

const mediasValidation = [
  check("Title").exists().withMessage("Tiltle is required!"),
  check("Year").exists().withMessage("Year is required!"),
  check("Type").exists().withMessage("Type is required!"),
  check("Poster").exists().withMessage("Poster is required!"),
]

const reviewsValidation = [
  check("rate").exists().withMessage("Rate is required!"),
  check("comment").exists().withMessage("Comment is required!"),
]

mediasRouter.get("/movies", async (req, res, next) => {
  try {
    const myMovies = await getOMDBMovies(req.query.movie)
  
    res.send(myMovies)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

mediasRouter.get("/", async (req, res, next) => {
  try {
    
    const moviesDB = await getMovies()
    
    if (req.query && req.query.category) {
      const filteredMovies = moviesDB.filter(
        movie =>
          movie.hasOwnProperty("category") &&
          movie.category === req.query.category
      )
      res.send(filteredMovies)
    } else {
      res.send(moviesDB)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

mediasRouter.get("/:movieId", async (req, res, next) => {
  try {
    const moviesDB = await getMovies()

    const movieFound = moviesDB.find(
      movie => movie._id === req.params.movieId
    )

    if (movieFound) {
      res.send(movieFound)
    } else {
      const err = new Error()
      err.httpStatusCode = 404
      next(err)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

mediasRouter.post("/", mediasValidation, async (req, res, next) => {
  try {
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
      const error = new Error()
      error.httpStatusCode = 400
      error.message = validationErrors
      next(error)
    } else {
      const moviesDB = await getMovies()

      moviesDB.push({
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        _id: uniqid(),
        reviews: [],
      })
      await writeMovies(moviesDB)
      res.status(201).send()
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

mediasRouter.put(
  "/:moviesId",
  mediasValidation,
  async (req, res, next) => {
    try {
      const validationErrors = validationResult(req)

      if (!validationErrors.isEmpty()) {
        const error = new Error()
        error.httpStatusCode = 400
        error.message = validationErrors
        next(error)
      } else {
        const moviesDB = await getMovies()

        const movieIndex = moviesDB.findIndex(
          movie => movie._id === req.params.movieId
        )

        if (movieIndex !== -1) {
          // product found
          const updatedMovies = [
            ...moviesDB.slice(0, movieIndex),
            { ...moviesDB[movieIndex], ...req.body },
            ...moviesDB.slice(movieIndex + 1),
          ]
          await writeMovies(updatedMovies)
          res.send(updatedMovies)
        } else {
          const err = new Error()
          err.httpStatusCode = 404
          next(err)
        }
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

mediasRouter.delete("/:movieId", async (req, res, next) => {
  try {
    const moviesDB = await getMovies()

    const movieFound = moviesDB.find(
      movie => movie._id === req.params.movieId
    )

    if (movieFound) {
      const filteredMovies = moviesDB.filter(
        movie => movie._id !== req.params.movieId
      )

      await writeMovies(filteredMovies)
      res.status(204).send()
    } else {
      const error = new Error()
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

mediasRouter.get("/:movieId/reviews", async (req, res, next) => {
  try {
    const moviesDB = await getMovies()

    const movieFound = moviesDB.find(
      movie => movie._id === req.params.movieId
    )

    if (movieFound) {
      res.send(movieFound.reviews)
    } else {
      const error = new Error()
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

mediasRouter.get("/:movieId/reviews/:reviewId", async (req, res, next) => {
  try {
    const moviesDB = await getMovies()

    const movieFound = moviesDB.find(
      movie => movie._id === req.params.movieId
    )

    if (movieFound) {
      const reviewFound = movieFound.reviews.find(
        review => review._id === req.params.reviewId
      )
      if (reviewFound) {
        res.send(reviewFound)
      } else {
        const error = new Error()
        error.httpStatusCode = 404
        next(error)
      }
    } else {
      const error = new Error()
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

mediasRouter.post(
  "/:movieId/reviews",
  reviewsValidation,
  async (req, res, next) => {
    try {
      const moviesDB = await getMovies()

      const movieIndex = moviesDB.findIndex(
        movie => movie._id === req.params.movieId
      )
      if (movieIndex !== -1) {
        moviesDB[movieIndex].reviews.push({
          ...req.body,
          _id: uniqid(),
          createdAt: new Date(),
        })
        await writeMovies(moviesDB)
        res.status(201).send(moviesDB)
      } else {
        // product not found
        const error = new Error()
        error.httpStatusCode = 404
        next(error)
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

mediasRouter.put(
  "/:movieId/reviews/:reviewId",
  reviewsValidation,
  async (req, res, next) => {
    try {
      const moviesDB = await getMovies()

      const movieIndex = moviesDB.findIndex(
        movie => movie._id === req.params.movieId
      )

      if (movieIndex !== -1) {
        const reviewIndex = moviesDB[movieIndex].reviews.findIndex(
          review => review._id === req.params.reviewId
        )

        if (reviewIndex !== -1) {
          const previousReview = moviesDB[movieIndex].reviews[reviewIndex]

          const updateReviews = [
            ...moviesDB[movieIndex].reviews.slice(0, reviewIndex), 
            { ...previousReview, ...req.body, updatedAt: new Date() },
            ...moviesDB[movieIndex].reviews.slice(reviewIndex + 1),
          ] 
          moviesDB[movieIndex].reviews = updateReviews

          await writeMovies(moviesDB)
          res.send(moviesDB)
        } else {
          console.log("Review not found")
        }
      } else {
        console.log("Movie not found")
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

mediasRouter.delete(
  "/:movieId/reviews/:reviewId",
  async (req, res, next) => {
    try {
      const moviesDB = await getMovies()

      const movieIndex = moviesDB.findIndex(
        movie => movie._id === req.params.movieId
      )

      if (movieIndex !== -1) {
        moviesDB[movieIndex].reviews = moviesDB[movieIndex].reviews.filter(
          review => review._id !== req.params.reviewId
        )

        await writeMovies(moviesDB)
        res.send(moviesDB)
      } else {
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

module.exports = mediasRouter
