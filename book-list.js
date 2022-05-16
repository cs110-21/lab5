async function loadBooks() {
    let response = await fetch("http://localhost:3000/books");

    console.log(response.status);
    console.log(response.statusText);

    if (response.status == 200) {
        let data = await response.text();
        console.log(data);
        const books = JSON.parse(data);

        for (let book of books) {
            const x = `
                <div class="col 4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                            <div>Author: ${book.author}</div>
                            <div>Publisher: ${book.publisher}</div>
                            <div>Number of Pages: ${book.numOfPages}</div>

                            <hr>

                            <button type="button" class="btn btn-danger">Delete</button>
                            <button types="button" class="btn btn-primary" data-toggle="modal"
                                data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            `

            document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
        }
    }
}

async function setEditModal(isbn) {
    const response = await fetch(`http://localhost:3000/book/${isbn}`, {
        method: "GET",
    });

    console.log(response.status); //200
    //console.log(response.statusText); //ok

    if (response.status === 200){
        let data = await response.text();
        console.log(data);
        const book = JSON.parse(data);

        const {
            title,
            author,
            publisher,
            publish_date,
            numOfPages,
        } = book;

        document.getElementById('isbn').value = isbn;
        document.getElementById('title').value = title;
        document.getElementById('author').value = author;
        document.getElementById('publisher').value = publisher;
        document.getElementById('publish_date').value = publish_date;
        document.getElementById('numOfPages').value = numOfPages;

        //setting up the action url for the book
        document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
    }
}

loadBooks();

