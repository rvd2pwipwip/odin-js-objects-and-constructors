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
};

const addCta = document.querySelector('.add-cta');
const dialog = document.querySelector('dialog');
const form = document.querySelector('#form');
const closeDialog = document.querySelector('#close-btn');
const addSubmit = document.querySelector('.add-submit');
const grid = document.querySelector('.grid-container');

function addBookToLibrary() {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let readStatus = document.getElementById('read-status').value;
  let isRead = readStatus === 'Read' ? true : false;

  if (title && author && pages && readStatus) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    drawCardGrid();
  }
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

function drawCardGrid() {
  grid.innerHTML = ''; // reset grid

  myLibrary.forEach((book, index) => {
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
    pages.textContent = `${book.pages} pages`;

    const actionButtons = document.createElement('div');
    actionButtons.classList.add('action-buttons');

    const isReadStatusBtn = document.createElement('button');
    isReadStatusBtn.classList.add('read-status');
    if (book.isRead === false) {
      isReadStatusBtn.classList.add('not-read');
    }
    isReadStatusBtn.textContent = book.isRead ? 'Read' : 'Not read';
    isReadStatusBtn.addEventListener('click', (e) => {
      myLibrary[index].toggleStatus();
      drawCardGrid();
    });

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove');
    const icon = document.createElement('i');
    icon.classList.add('material-icons');
    icon.textContent = 'delete';
    removeBtn.append(icon);
    removeBtn.append('Remove');
    removeBtn.addEventListener('click', (e) => {
      removeBook(index);
      drawCardGrid();
    });

    actionButtons.append(isReadStatusBtn, removeBtn);
    card.append(title, author, pages, actionButtons);
    card.style.aspectRatio = '3 / 4';
    grid.appendChild(card);
  });
}

drawCardGrid();

addCta.addEventListener('click', () => {
  form.reset();
  dialog.showModal();
});

closeDialog.addEventListener('click', () => {
  dialog.close();
});

dialog.addEventListener('click', (e) => {
  if (e.target === dialog) {
    dialog.close();
  }
});

addSubmit.addEventListener('click', () => {
  addBookToLibrary();
});
