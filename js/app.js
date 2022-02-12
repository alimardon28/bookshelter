"use strict";

let elList = document.querySelector('.books__list');
let searchButtun = document.querySelector('.input__box-logo');
let elModalBook = document.querySelector('.navbar__box');

let elNavbarIcon = document.querySelector('.navbar__icon');

// const bookmarks = [];

elList.addEventListener('click', bookmarksBook);

searchButtun.addEventListener('click' , getBook);

// elNavbarIcon.addEventListener('click' , ()=>{
//   elModalBook.classList.remove('dashboard');
// });

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
  console.log(item);
  item = item [0];
  let html = `
       <div class="navbar__box-top">
         <h2 class="navbar__heading">${item.volumeInfo.title}</h2>
          <a  class="navbar__icon"><img src="./img/ekis.svg" alt="ekis"></a>
     </div>

      <div class="navbarImgBox">
           <img src="${item.volumeInfo.imageLinks?.thumbnail}" alt="img">
       </div>

     <div class="navbar__desc-box">
        <p class="navbar__desc">${item.searchInfo.textSnippet}</p>
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
 elModalBook.classList.add('dashboard');
}


// const elLogoutBtn = document.querySelector(".btn__box-button");
// const localToken = window.localStorage.getItem("token");

// if (!localToken) {
//   window.location.replace("login.html");
// }

// elLogoutBtn.addEventListener("click", function () {
//   window.localStorage.removeItem("token");

//   window.location.replace("login.html");
// });