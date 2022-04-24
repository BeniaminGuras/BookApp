const templates = {
  book: Handlebars.compile(document.querySelector('#template-book').innerHTML),
};

const select = {
  bookMenu: '.books-list',
};

class Book{
  constructor(book){
    const thisBook = book; 
    this.renderBook(thisBook);
  }
  
  renderBook(book){
    this.data = {};
    this.data.name = book.name;
    this.data.id = book.id; 
    this.data.price = book.price;
    this.data.image = book.image;
    this.data.rating = book.rating;
    const generatedHTML = templates.book(this.data);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    console.log(generatedDOM);
    document.querySelector(select.bookMenu).appendChild(generatedDOM);
  }
}


const app = {
  init: function(){
    for(let book of dataSource.books){
      new Book(book);
    }
  },
};

app.init();