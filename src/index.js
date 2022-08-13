import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { fetchGallery } from "./fetchGallery"

const formREF = document.querySelector("#search-form");
const galleryREF = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

const BASE_URL = "https://pixabay.com/api/";
const KEY = "key=29228905-12cd39cd1befa2d2c4090f04e";

let page = 1;
const perPage = 40;
// fetchGallery("cat")

async function fetchGallery(image, page, perPage) {
    const response = await axios.get(`${BASE_URL}?${KEY}&q=${image}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`);
    return response.data;
}

formREF.addEventListener("submit", onFormSubmit);
loadMoreBtn.addEventListener("click", onLoadMoreBtnClick);



function onFormSubmit(event) {
  event.preventDefault();
    
  const searchImage = event.target.elements.searchQuery.value;
  page = 1;
  fetchGallery(searchImage, page, perPage)
    .then(images => {
      if (searchImage) {
        clearMarkup();
        loadMoreBtn.style.display = "block";
        return createGallery(images.hits);
      }
    clearMarkup();
    })       
}

function onLoadMoreBtnClick() {
  const searchImage = formREF.elements.searchQuery.value;
  page += 1
  fetchGallery(searchImage, page, perPage)
    .then(images => {
      createGallery(images.hits);
      const totalPages = images.totalHits / perPage;
      if (page > totalPages) {
        loadMoreBtn.style.display = "none";
        Notify.failure("We're sorry, but you've reached the end of search results.");
      }
    })

}

function clearMarkup() {
   galleryREF.innerHTML = ""; 
}

function markupGallery({webformatURL, tags, likes, views, comments, downloads}) {
return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: </b>${likes}
    </p>
    <p class="info-item">
      <b>Views: </b>${views}
    </p>
    <p class="info-item">
      <b>Comments: </b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads: </b>${downloads}
    </p>
  </div>
</div>`
}

function reduceGallery(array) {
    return array.reduce((acc, item) => acc + markupGallery(item), "");
}

function createGallery(array) {
    galleryREF.insertAdjacentHTML("beforeend", reduceGallery(array));
}