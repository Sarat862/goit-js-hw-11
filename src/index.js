import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchGallery } from "./js/fetchGallery";
import createGallery from "./js/createMarkup";

// DOM елементи
const formREF = document.querySelector("#search-form");
const galleryREF = document.querySelector(".gallery");
const submitBtn = document.querySelector("[type=submit]")
const loadMoreBtn = document.querySelector(".load-more");
const bodyREF = document.querySelector("body");

// ======== Робота зі стилями ===============================================
bodyREF.style.backgroundColor = "grey"
formREF.style.textAlign = "center";
formREF.style.marginTop = "10px";
formREF.style.marginBottom = "20px";
galleryREF.style.display = "flex";
galleryREF.style.flexWrap = "wrap";
galleryREF.style.justifyContent = "center";
galleryREF.style.gap = "30px";
loadMoreBtn.style.margin = "0 auto";
loadMoreBtn.style.backgroundColor = "cyan";
submitBtn.style.backgroundColor = "orange";
// =========================================================================

// Пагінація 
let page = 1;
const perPage = 40;

formREF.addEventListener("submit", onFormSubmit);
loadMoreBtn.addEventListener("click", onLoadMoreBtnClick);

function onFormSubmit(event) {
  event.preventDefault(); 
  const searchImage = event.target.elements.searchQuery.value.trim();
  page = 1;

  if (searchImage === "") {
    return Notify.failure("Please, input your search query!");
  }

  fetchGallery(searchImage, page, perPage)
    .then(images => {
      if (images.totalHits === 0) {
        loadMoreBtn.style.display = "none";
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
      galleryREF.innerHTML = "";
      loadMoreBtn.style.display = "block";
      createGallery(images.hits);
      Notify.success(`Hooray! We found ${images.totalHits} images.`);
    })
    .catch(error => console.log(error));
}


function onLoadMoreBtnClick() {
  const searchImage = formREF.elements.searchQuery.value;
  page += 1;
  fetchGallery(searchImage, page, perPage)
    .then(images => {
      createGallery(images.hits);
      const totalPages = images.totalHits / perPage;
      if (page > totalPages) {
        loadMoreBtn.style.display = "none";
        Notify.failure("We're sorry, but you've reached the end of search results.");
      }
    })
    .catch(error => console.log(error));
}
