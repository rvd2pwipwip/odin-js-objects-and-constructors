let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  console.log(this);
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? 'read' : 'not read yet'
  }`;
};

function addBookToLibrary() {
  let title = prompt('Enter title');
  let author = prompt('Enter author');
  let pages = prompt('Enter pages');
  let readInput = prompt('Enter read (y or n)');
  let read = readInput === 'y' ? true : false;

  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
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

myLibrary.forEach((book) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('h3');
  title.classList.add('title');
  title.textContent = book.title;

  const author = document.createElement('p');
  author.classList.add('author');
  author.textContent = book.author;

  const pages = document.createElement('p');
  pages.classList.add('pages');
  pages.textContent = book.pages;

  card.append(title, author, pages);

  const grid = document.querySelector('.grid-container');
  grid.appendChild(card);
});
