
const axios = require('axios');

const BASE_URL = "https://pixabay.com/api/";
const KEY = "key=29228905-12cd39cd1befa2d2c4090f04e";

export async function fetchGallery(image) {
    try {
        const responce = await axios.get(`${BASE_URL}?${KEY}&q=${image}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`);
        const images = await response.json();
    } catch (error) {
        console.error(error);
    }
    // return fetch(`${BASE_URL}?${KEY}&q=${image}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`)
    //     .then(response => {
    //         // if (!responce.ok) {
    //         //     throw new Error(responce.status);
    //         // }
    //         return response.json()
    //     })
        // .catch(error => Notify.failure("Sorry, there are no images matching your search query. Please try again."))
}