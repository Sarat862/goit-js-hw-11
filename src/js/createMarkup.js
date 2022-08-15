
export default createGallery ;
    
const galleryREF = document.querySelector(".gallery");

function markupGallery({ webformatURL, tags, likes, views, comments, downloads }) {
return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="600px" height="400px"/>
  <div class="info" style="display: flex; gap: 10px" >
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