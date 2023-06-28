import axios from "axios";
const API_KEY = '36224530-0ce46c8c70d6d91971a56eb8c';
const searchGalleryApi = axios.create({
    baseURL: 'https://pixabay.com/api/',
});
export const getGalleryData = async (value, page) => {
    try {
        const response = await searchGalleryApi.get('', {
            params: {
                q: value,
                page: page,
                key: API_KEY,
                image_type: 'photo',
                orientation: 'horizontal',
                per_page: 12,
            },
        });
        return { hits: response.data.hits, totalHits: response.data.totalHits }
    } catch (error) {
        throw error;
    }
};