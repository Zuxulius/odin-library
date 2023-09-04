
const myLibrary = [];
const bookshelf = document.getElementsByClassName("bookshelf")[0];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, read = ${this.read}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    for (let index = 0; index < myLibrary.length; index++) {
        const book = myLibrary[index];
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookshelf.appendChild(bookDiv);
        const bookInfo = document.createElement("div");
        bookInfo.classList.add("info");
        bookDiv.appendChild(bookInfo);

        const bookTitle = document.createElement("h3");
        const by = document.createElement("h4");
        const author = document.createElement("h3");
        const pages = document.createElement("p");
        const read = document.createElement("p");

        bookTitle.innerHTML = book.title;
        by.innerHTML = "by";
        author.innerHTML = book.author;
        pages.innerHTML = book.pages;
        if (book.read) {
            read.innerHTML = "Read"
        } else {
            read.innerHTML = "Not read"
        }

        bookInfo.append(bookTitle, by, author, pages, read);

    }
}

document.addEventListener("DOMContentLoaded", function() {
    const addBookButton = document.getElementsByClassName("add")[0];
    const formContainer = document.getElementsByClassName("formContainer")[0];

    addBookButton.addEventListener("click", function() {
        // Toggle form visibility
        if (formContainer.style.display === "none") {
        formContainer.style.display = "block";
      } else {
        formContainer.style.display = "none";
      }
    })

    const form = document.getElementsByClassName("myForm")[0];
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("bookTitle").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").checked;
        addBookToLibrary(title, author, pages, read);
        formContainer.style.display = "none";
    })
})

addBookToLibrary("Harry Potter and the Prisoner of Azkaban", "J.K. Rowling", 450, read = true)
addBookToLibrary("PIHKAL", "Alexander Shulgin & Ann Shulgin", 800, read = true)
addBookToLibrary("Leonardo Da Vinci - A biography", "Walter Isaacson", 400, read = false)

displayBooks();
