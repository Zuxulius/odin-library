
const myLibrary = [];

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
