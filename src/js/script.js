
const templates = {
  book: Handlebars.compile(document.querySelector('#template-book').innerHTML),
};

const select = {
  bookMenu: '.books-list',
  filteres: '.filters',
};

class BooksList{

  constructor(book){
    this.renderBooks(book);
    this.getElements();
    this.initActions();
    console.log(this);
  }
    
  renderBooks(book){
    this.data = {};
    this.data.name = book.name;
    this.data.id = book.id; 
    this.data.price = book.price;
    this.data.image = book.image;
    this.data.rating = book.rating;
    this.data.ratingStyle = this.data.rating * 10;
    if(this.data.rating > 9){
      this.data.color = 'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
    } else if (this.data.rating > 8 && this.data.rating <= 9){
      this.data.color = 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    } else if (this.data.rating > 6 && this.data.rating <= 8){
      this.data.color = 'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    } else if (this.data.rating < 6){
      this.data.color = 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
    }
    const generatedHTML = templates.book(this.data);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    document.querySelector(select.bookMenu).appendChild(generatedDOM);
  }

  getElements(){
    this.dom = {};
    this.dom.bookListWrapper = document.querySelector(select.bookMenu);
    this.dom.filters = document.querySelector(select.filteres);
  }

  initActions(){
    const thisBook = this;
    this.favoriteBooks = [];
    this.filters = [];
    const books = dataSource.books;
    this.dom.bookListWrapper.addEventListener('dblclick', function(event){
      let clicked = event.target;
      if(clicked.tagName == 'IMG'){
        clicked = clicked.closest('a');
        const id = clicked.getAttribute('data-id');
        if(!thisBook.favoriteBooks.includes(id)){
          thisBook.favoriteBooks.push(id);
        } else {
          const numberOfIndex = thisBook.favoriteBooks.indexOf(id);
          thisBook.favoriteBooks.splice(numberOfIndex, 1);
        }
        clicked.classList.toggle('favorite');
      }
      console.log(thisBook.favoriteBooks);
    });

    thisBook.dom.filters.addEventListener('click', function(event){
      const clicked = event.target;
      const clickedTagName = clicked.tagName;
      const clickedType = clicked.type;
      const clickedName = clicked.name;
      if(clickedTagName == 'INPUT' && clickedType == 'checkbox' && clickedName == 'filter'){
        if(clicked.checked){
          thisBook.filters.push(clicked.value);
          thisBook.hideBooks();
        } else {
          const indexOfNonFicition = thisBook.filters.indexOf(clicked.value);
          thisBook.filters.splice(indexOfNonFicition, 1);
          for(let book in books){
            const bookId =  books[book].id;
            const equalId = document.querySelector('[data-id="' + bookId + '"]');
            equalId.classList.remove('hidden');
          }
        }
      }
    });
  }

  hideBooks(){
    const books = dataSource.books;
    for(let book in books){
      const equalId = document.querySelector('[data-id="' + books[book].id + '"]');
      console.log(this.filters,  books[book].details.adults);
      if(this.filters.includes('adults') && books[book].details.adults == true || this.filters.includes('nonFiction') && books[book].details.nonFiction == true){
        equalId.classList.remove('hidden');
      } else {
        equalId.classList.add('hidden');
      }
    }
  }
}

const app = {
  init: function(){
    for(let book of dataSource.books){
      new BooksList(book);
    }
  }
};

app.init();