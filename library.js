
const myLibrary = [];
const bookshelf = document.getElementsByClassName("bookshelf")[0];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    get info() {
        return `Title: ${this.title},\n Author: ${this.author},\n Pages: ${this.pages},\n Read: ${this.read}`
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    // Display with new book
    displayBooks();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks(); // Re-render the books
  }

function displayBooks() {
    // Remove current display
    while (bookshelf.firstChild) {
        bookshelf.removeChild(bookshelf.firstChild);
      }
    // Create the book and add it to bookshelf
    for (let index = 0; index < myLibrary.length; index++) {
        const book = myLibrary[index];
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookshelf.appendChild(bookDiv);
        // Add remove button
        const remove = document.createElement("button");
        remove.classList.add("remove");
        remove.innerHTML = "X"
        bookDiv.appendChild(remove);
        remove.addEventListener("click", function() {
            removeBook(index);
        })
        // Add book info
        const bookInfo = document.createElement("div");
        bookInfo.classList.add("info");
        bookDiv.appendChild(bookInfo);

        const bookTitle = document.createElement("h4");
        const by = document.createElement("h5");
        const author = document.createElement("h4");
        const pages = document.createElement("p");
        const read = document.createElement("p");
        read.classList.add("read");
        // Add changeable read status
        read.addEventListener("click", function() {
            if (book.read) {
                book.read = false;
                read.innerHTML = "Not read";
                read.style.backgroundColor = "lightcoral";
            } else {
                book.read = true;
                read.innerHTML = "Read"
                read.style.backgroundColor = "lightgreen";
        }})
        // Set info
        bookTitle.innerHTML = book.title;
        by.innerHTML = "by";
        author.innerHTML = book.author;
        pages.innerHTML = book.pages;
        if (book.read) {
            read.innerHTML = "Read";
            read.style.backgroundColor = "lightgreen";
        } else {
            read.innerHTML = "Not read"
            read.style.backgroundColor = "lightcoral";
        }
        // Append to DOM
        bookInfo.append(bookTitle, by, author, pages, read);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const addBookButton = document.getElementsByClassName("add")[0];
    const formContainer = document.getElementsByClassName("formContainer")[0];
    formContainer.style.display = "none";

    addBookButton.addEventListener("click", function() {
        // Toggle form visibility
        if (formContainer.style.display === "none") {
            // Reset form
            document.querySelector("form").reset();
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
addBookToLibrary("Leonardo Da Vinci - A Biography", "Walter Isaacson", 400, read = false)

displayBooks();
