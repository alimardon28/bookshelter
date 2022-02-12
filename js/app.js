// Assalomu alaykum Jahongir aka funksiyalarimni biri ishlasa biri ishlamay qolyabdi . Bookmark ham qiladi faqat daynamec emas.bookmarksBook va bookRecipeModal o'chirb tursayiz bookmark qiladi. Aniq bilaman past bal olaman , agar rostan ham past bal olsam bir marta imkon berishingizni hohlardim .

"use strict";

let elList = document.querySelector('.books__list');
let searchButtun = document.querySelector('.input__box-logo');
let elModalBook = document.querySelector('.navbar__box');
let bookList = document.querySelector('.book__list');
let elBookmarkList = document.querySelector('.book__list');


const bookmarks = [];


searchButtun.addEventListener('click' , getBook);
elList.addEventListener('click', bookmarksBook);
elModalBook.addEventListener('click' ,bookRecipeModal);

function bookmarksBook(evt){
  evt.preventDefault();
  if(evt.target.classList.contains('bookmark__button')){
    let bookmarkItem = evt.target.parentElement.parentElement;
     fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookmarkItem.dataset.id}`)
     .then(res => res.json())
     .then(data => bookmarket(data.items));

  }
}

function bookmarket(book){

  book = book[0];

  let html = `
            <li class="book__item">
              <div class="book__hero">
                  <p class="book__item-desc">${book.volumeInfo.title}</p>
                  <p class="book__item_desc">${book.volumeInfo.authors}</p>
              </div>
              <div class="buttom__item">
                <button class="open__book"><img src="./img/book-open.svg" alt="img"></button>
              <button class="delete__book"><img src="./img/delete.svg" alt="img"></button>
       </div>
    </li>
  `;

  elBookmarkList.innerHTML = html;
}


 function  getBook() {

  let elBookSearchInput = document.querySelector('.bookshelter__input').value.trim();
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${elBookSearchInput}`).then(response => response.json()).then(data =>{

  let html = '';
  if(data.items){
     data.items.forEach(item => {
       html += `
            <li class="books__item" data-id ="${item.id}">
              <div class="card" style="width: 18rem;">
               <div class="card__img-group">
                   <img src="${item.volumeInfo.imageLinks?.thumbnail}" class="card-img-top" alt="book img">
                </div>
              <div class="card-body">
                <h5 class="card-title">${item.volumeInfo.title}</h5>
                <p class="card-text">${item.volumeInfo.authors}</p>
                <p class="card__years">${item.volumeInfo.publishedDate}</p>
              <div class="button__group">
                  <a class="bookmark__button">Bookmark</a>
                  <a  class="more-info__button">More Info</a>
              </div>
                <a href="http://books.google.co.uz/books?id=${item.id}q=${elBookSearchInput}" class="read__button">Read</a>
             </div>
           </div>
         </li>
       `
     });
     elList.classList.remove('notFound')
  }else{
    html = "Sorry , we didn't find any books !";
    elList.classList.add('notFound');
  }
  elList.innerHTML = html;
  });
};

function bookmarksBook(e){
  e.preventDefault();
  if(e.target.classList.contains('more-info__button')){
    let elItem = e.target.parentElement.parentElement;
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${elItem.dataset.id}`).then(response => response.json()).then(data =>  bookRecipeModal(data.items));
  }
}

function bookRecipeModal(item){
  item = item [0];
  let html = `
       <div class="navbar__box-top">
         <h2 class="navbar__heading">${item.volumeInfo.title}</h2>
          <a class="navbar__icon"><img class="navbar__logo" src="./img/ekis.svg" alt="img"></a>
     </div>

      <div class="navbarImgBox">
           <img src="${item.volumeInfo.imageLinks?.thumbnail}" alt="img">
       </div>

     <div class="navbar__desc-box">
        <p class="navbar__desc">${item.volumeInfo.description}</p>
    </div>
    <div class="navbar__ul">
       <ul class="navbarList">
           <li class="navbarItem">
               <p class="item__desc">Author:</p>
               <span class="item__span">${item.volumeInfo.authors}</span>
               <span class="item__span">${item.volumeInfo.publisher}</span>
           </li>
           <li class="navbarItem">
               <p class="item__desc">Published:</p>
               <span class="item__span">${item.volumeInfo.publishedDate}</span>

           </li>
           <li class="navbarItem">
               <p class="item__desc">Publisher:</p>
               <span class="item__span">${item.volumeInfo.publisher}</span>
           </li>
           <li class="navbarItem">
               <p class="item__desc">Categories:</p>
               <span class="item__span">${item.volumeInfo.categories}</span>
           </li>
           <li class="navbarItem">
               <p class="item__desc">Page Cound:</p>
               <span class="item__span">${item.volumeInfo.pageCount}</span>
           </li>
          </ul>
         </div>
         <div class="box__navbar">
         <a class="bax__link" href="http://books.google.co.uz/books?id=${item.id}">Read</a>
     </div>

  `;
 elModalBook.innerHTML = html;
 elModalBook.classList.add('active');
}

const elLogoutBtn = document.querySelector(".btn__box-button");
const localToken = window.localStorage.getItem("token");

if (!localToken) {
  window.location.replace("login.html");
}

elLogoutBtn.addEventListener("click", function () {
  window.localStorage.removeItem("token");

  window.location.replace("login.html");
});