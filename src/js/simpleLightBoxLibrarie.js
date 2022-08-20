export { createSimpleLightBox, destroySimpleLightBox }

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let gallery;

function createSimpleLightBox() {
  gallery = new SimpleLightbox('.photo-card a',{
    navText: ['&pr;', '&sc;'],
    closeText: '&otimes;'
    }).refresh();
}

function destroySimpleLightBox() {
    gallery.destroy();
}