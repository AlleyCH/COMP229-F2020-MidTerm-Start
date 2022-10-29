/*File name: Midterm
Student’s Name: Alley Chaggar
StudentID: 301194572 
Date: 2022-10-29*/

let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Price: Number,
    Author: String,
    Genre: String,
    Description: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
