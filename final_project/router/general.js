const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6: Register a new user
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Task 1: Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Task 10: Get all books using async callback function
public_users.get('/async', function (req, res) {
  const get_books = new Promise((resolve, reject) => {
    resolve(books);
  });

  get_books.then(
    (bks) => res.send(JSON.stringify(bks, null, 4))
  );
});

// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});

// Task 11: Get book details based on ISBN using async callback
public_users.get('/isbn-async/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  const get_book_isbn = new Promise((resolve, reject) => {
    resolve(books[isbn]);
  });

  get_book_isbn.then(
    (bk) => res.send(JSON.stringify(bk, null, 4))
  );
});

// Task 3: Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let filtered_books = [];
  
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if(books[isbn]["author"] === author) {
      filtered_books.push({"isbn":isbn, "title":books[isbn]["title"], "reviews":books[isbn]["reviews"]});
    }
  });
  
  res.send(JSON.stringify(filtered_books, null, 4));
});

// Task 12: Get book details based on author using async callback
public_users.get('/author-async/:author', function (req, res) {
  const author = req.params.author;
  
  const get_books_author = new Promise((resolve, reject) => {
    let filtered_books = [];
    let isbns = Object.keys(books);
    
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === author) {
        filtered_books.push({"isbn":isbn, "title":books[isbn]["title"], "reviews":books[isbn]["reviews"]});
      }
    });
    
    resolve(filtered_books);
  });

  get_books_author.then(
    (bks) => res.send(JSON.stringify(bks, null, 4))
  );
});

// Task 4: Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let filtered_books = [];
  
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if(books[isbn]["title"] === title) {
      filtered_books.push({"isbn":isbn, "author":books[isbn]["author"], "reviews":books[isbn]["reviews"]});
    }
  });
  
  res.send(JSON.stringify(filtered_books, null, 4));
});

// Task 13: Get book details based on title using async callback
public_users.get('/title-async/:title', function (req, res) {
  const title = req.params.title;
  
  const get_books_title = new Promise((resolve, reject) => {
    let filtered_books = [];
    let isbns = Object.keys(books);
    
    isbns.forEach((isbn) => {
      if(books[isbn]["title"] === title) {
        filtered_books.push({"isbn":isbn, "author":books[isbn]["author"], "reviews":books[isbn]["reviews"]});
      }
    });
    
    resolve(filtered_books);
  });

  get_books_title.then(
    (bks) => res.send(JSON.stringify(bks, null, 4))
  );
});

// Task 5: Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn]["reviews"], null, 4));
});

module.exports.general = public_users;
