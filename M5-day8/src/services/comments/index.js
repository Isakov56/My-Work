const express = require("express");
const uniqid = require("uniqid");

const {
  getBooks,
  writeBooks,
  getComments,
  writeComments,
} = require("../../fsUtilities");

const commentsRouter = express.Router();

commentsRouter.post("/:bookId/comments", async (req, res, next) => {
  try {
    /**
     *  read comments json :array
     *  const newComment = {...req.body,id:uniqid(),elementId:req.params.bookId,createdAt:new Date()}
     *  push this to comments array
     *  write it to comments.json with writeJSON(from fs extra)
     *  res.send(newComment) with statıs 201
     */
    const comments = await getComments();
    const newComment = {
      ...req.body,
      commentId: uniqid(),
      bookId: req.params.bookId,
      createdAt: new Date(),
    };
    comments.push(newComment);
    console.log(comments);
    await writeComments(comments);
    res.status(201).send(comments);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

commentsRouter.get("/:bookId/comments", async (req, res, next) => {
  try {
    const commentsDB = await getComments();
    const bookIdComments = commentsDB.filter(
      (comments) => comments.bookId === req.params.bookId
    );
    console.log(bookIdComments);
    if (bookIdComments.length > 0) {
      res.send(bookIdComments);
    } else {
      const err = new Error();
      err.httpStatusCode = 404;
      next(err);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

commentsRouter.delete("/comments/:commentId", async (req, res, next) => {
  try {
    const commentsDB = await getComments();
    const commentFound = commentsDB.find(
      (comment) => comment.bookId === req.params.commentId
    );
    console.log(commentFound)
    if (commentFound !== -1) {
      const newComments = commentsDB.filter(
        (comments) => comments.bookId !== req.params.commentId
      );
      console.log(newComments)
      await writeComments(newComments);
      res.status(204).send();
    } else {
      const err = new Error();
      err.httpStatusCode = 404;
      next(err);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = commentsRouter;
