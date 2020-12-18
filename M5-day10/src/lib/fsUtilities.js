const { readJSON, writeJSON } = require("fs-extra")
const { join } = require("path")
const axios = require("axios")

const getOMDBMovies = async (query) => {
  try {
    return await axios.get(`http://www.omdbapi.com/?apikey=ab86940&s=${query}`)
  } catch (error) {
    console.error(error)
  }
}

const moviesPath = join(__dirname, "../services/medias/movies.json")

const readDB = async filePath => {
  try {
    const fileJson = await readJSON(filePath)
    return fileJson
  } catch (error) {
    throw new Error(error)
  }
}

const writeDB = async (filePath, fileContent) => {
  try {
    await writeJSON(filePath, fileContent)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getMovies: async () => readDB(moviesPath),
  writeMovies: async moviesData => writeDB(moviesPath, moviesData),
  getOMDBMovies,
}
