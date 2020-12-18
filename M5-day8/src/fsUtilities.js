const { readJson, writeJson } = require("fs-extra");
const { join } = require("path");

const booksPath = join(__dirname, "./services/books/books.json");
const commentsPath = join(__dirname, "./services/comments/comments.json");
const usersPath = join(__dirname, "./services/users/users.json");
const attandeesPath = join(__dirname, "./services/attandees/attandees.json");

const readDB = async (filePath) => {
  try {
    const fileJson = await readJson(filePath);
    return fileJson;
  } catch (error) {
    throw new Error(error);
  }
};

const writeDB = async (filePath, fileContent) => {
  try {
    await writeJson(filePath, fileContent);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getBooks: async () => readDB(booksPath),
  writeBooks: async (booksData) => writeDB(booksPath, booksData),
  getComments: async () => readDB(commentsPath),
  writeComments: async (commentsData) => writeDB(commentsPath, commentsData),
  getUsers: async () => readDB(usersPath),
  writeUsers: async (usersData) => writeDB(usersPath, usersData),
  getAttandees: async () => readDB(attandeesPath),
  writeAttandees: async (attandeesData) => writeDB(attandeesPath, attandeesData),
};
