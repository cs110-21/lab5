const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

//where we will keep the books
let books = [];

app.use(cors());

//Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const book = req.body;

    //output the book to the console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

app.listen(port, () => console.log('Hello world app listening on port'))
app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/book/:isbn' , (req, res) => {
    //reading isbn from url
    const isbn = req.params.isbn;
    const newBook = req.body;

    //remove item from the books array
    for( let i = 0; i < books.length; i++){
        let book = books[i]

        if(book.isbn === isbn) {
            book[i] = newBook;
        }
    }

    //sending 404 when not found something 
    res.send('book is edited');
});