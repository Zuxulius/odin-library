
class Library {
    constructor() {
        this.myLibrary = [];
    }

    addBook(book) {
        this.myLibrary.push(book);
    }

    removeBook(index) {
        this.myLibrary.splice(index, 1);
    }

    getBooks() {
        return this.myLibrary;
    }
}

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

const library = new Library();

const UI = {
    bookshelf: document.getElementsByClassName("bookshelf")[0],
    addBookButton: document.getElementsByClassName("add")[0],
    formContainer: document.getElementsByClassName("formContainer")[0],
    form: document.getElementsByClassName("myForm")[0],

    init() {
        this.formContainer.style.display = "none";

        this.addBookButton.addEventListener("click", () => {
            if (this.formContainer.style.display === "none") {
                this.form.reset();
                this.formContainer.style.display = "block";
            } else {
                this.formContainer.style.display = "none";
            }
        });

        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            const title = document.getElementById("bookTitle").value;
            const author = document.getElementById("author").value;
            const pages = document.getElementById("pages").value;
            const read = document.getElementById("read").checked;
            const newBook = new Book(title, author, pages, read);
            library.addBook(newBook);
            UI.displayBooks();
            this.formContainer.style.display = "none";
        });
    },

    displayBooks() {
        while (this.bookshelf.firstChild) {
            this.bookshelf.removeChild(this.bookshelf.firstChild);
        }

        library.getBooks().forEach((book, index) => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            this.bookshelf.appendChild(bookDiv);

            const remove = this.createRemoveButton(index);
            bookDiv.appendChild(remove);

            const bookInfo = this.createBookInfo(book, index);
            bookDiv.appendChild(bookInfo);
        });
    },

    createRemoveButton(index) {
        const remove = document.createElement("button");
        remove.classList.add("remove");
        remove.innerHTML = "X";
        remove.addEventListener("click", () => {
            library.removeBook(index);
            this.displayBooks();
        });
        return remove;
    },

    createBookInfo(book, index) {
        const bookInfo = document.createElement("div");
        bookInfo.classList.add("info");

        const bookTitle = document.createElement("h4");
        const by = document.createElement("h5");
        const author = document.createElement("h4");
        const pages = document.createElement("p");
        const read = document.createElement("p");
        read.classList.add("read");

        read.addEventListener("click", () => {
            book.read = !book.read;
            this.displayBooks();
        });

        bookTitle.innerHTML = book.title;
        by.innerHTML = "by";
        author.innerHTML = book.author;
        pages.innerHTML = book.pages;
        read.innerHTML = book.read ? "Read" : "Not read";
        read.style.backgroundColor = book.read ? "lightgreen" : "lightcoral";

        bookInfo.append(bookTitle, by, author, pages, read);
        return bookInfo;
    }
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    library.addBook(newBook);
    UI.displayBooks();
}

function removeBook(index) {
    library.removeBook(index);
    displayBooks(); // Re-render the books
  }

// Initialize the UI
document.addEventListener("DOMContentLoaded", () => {
    UI.init();

    // Add some default books
    library.addBook(new Book("Harry Potter and the Prisoner of Azkaban", "J.K. Rowling", 450, true));
    library.addBook(new Book("PIHKAL", "Alexander Shulgin & Ann Shulgin", 800, true));
    library.addBook(new Book("Leonardo Da Vinci - A Biography", "Walter Isaacson", 400, false));

    UI.displayBooks();
});
