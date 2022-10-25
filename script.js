let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.info = function () {
  console.log(this);
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.isRead ? 'read' : 'not read yet'
  }`;
};

Book.prototype.toggleStatus = function () {
  this.isRead = !this.isRead;
}

function addBookToLibrary() {
  let title = prompt('Enter title');
  let author = prompt('Enter author');
  let pages = prompt('Enter pages');
  let readInput = prompt('Enter read (y or n)');
  let isRead = readInput === 'y' ? true : false;

  let newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function removeBook(id) {
  myLibrary.splice(id, 1);
}

myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', 295, true));
myLibrary.push(new Book('Rivers of London', 'Ben Aaronovitch', 392, true));
myLibrary.push(new Book('Moby-Dick', 'Herman Melville', 635, false));
myLibrary.push(
  new Book("The Hitchhiker's Guide to the Galaxy", 'Douglas Adams', 193, false)
);

// console.log(myLibrary[0].info());

// console.log(typeof myLibrary[0]);
// console.log(myLibrary[0].constructor.name);
// console.log(Object.getPrototypeOf(myLibrary[0]));
// console.log(myLibrary[0] instanceof Book);
// console.log(myLibrary[0].constructor === Book);

const addCta = document.querySelector('.add-cta');
const dialog = document.querySelector('dialog');
const addSubmit = document.querySelector('.add-submit');
const grid = document.querySelector('.grid-container');

function drawCardGrid() {
  grid.innerHTML = ''; // reset grid

  myLibrary.forEach((book) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.bookId = myLibrary.indexOf(book);

    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.classList.add('author');
    author.textContent = book.author;

    const pages = document.createElement('p');
    pages.classList.add('pages');
    pages.textContent = book.pages;

    const isReadStatusBtn = document.createElement('button');
    isReadStatusBtn.classList.add('read-status');
    isReadStatusBtn.textContent = book.isRead ? 'Read' : 'Not read';
    isReadStatusBtn.addEventListener('click', (e) => {
      myLibrary[e.target.parentNode.dataset.bookId].toggleStatus();
      drawCardGrid();
    });

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove');
    removeBtn.textContent = 'Remove Book';
    removeBtn.addEventListener('click', (e) => {
      removeBook(e.target.parentNode.dataset.bookId)
      drawCardGrid();
    });

    card.append(title, author, pages, isReadStatusBtn, removeBtn);
    grid.appendChild(card);
  });
}

drawCardGrid();

addCta.style.background = 'red';
addCta.addEventListener('click', () => {
  dialog.showModal();
});

dialog.addEventListener('click', (e) => {
  if (e.target === dialog) {
    dialog.close();
  }
});

addSubmit.addEventListener('click', () => {
  console.log('push new book');
})