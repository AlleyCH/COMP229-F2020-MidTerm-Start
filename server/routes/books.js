// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });
});

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', (req, res, next) => {
  res.render("books/details", {
    title: "Book list",
    books: "",
  });
});

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', (req, res, next) => {
  let newBook = book({
      "Title": console.log(req.body.Title),
      "Price": req.body.Price,
      "Author": req.body.Author,
      "Genre": req.body.Genre,
      "Description": req.body.Description,
  });

  book.create(newBook, (err, book) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the book list
          res.redirect('/books');
      }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  book.findById(id, (err, bookToEdit) => {
    if (err) res.end(err);
    else {
      res.render("books/details", {
        title: "Edit book",
        books: bookToEdit,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  let updatedBook = book({
    "Title": req.body.Title,
    "Price": req.body.Price,
    "Author": req.body.Author,
    "Genre": req.body.Genre,
    "Description": req.body.Description,
  });

  book.updateOne({_id: id}, updatedBook, (err) => {
    if (err) {
      res.end(err);
    } else {
      res.redirect("/books");
    }
  });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  book.deleteOne({_id: id}, (err) => {
    if (err) {
      res.end(err);
    }
    else {
      res.redirect("/books");
    }
  });
});

module.exports = router;