
const axios = require('axios');

const BASE_URL = "https://pixabay.com/api/";
const KEY = "key=29228905-12cd39cd1befa2d2c4090f04e";

export async function fetchGallery(image, page, perPage) {
    const response = await axios.get(`${BASE_URL}?${KEY}&q=${image}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`);
    return response.data;
}