import axios from 'axios';

const API_KEY = '49237472-e2704486942ee192f1a430e77';
const BASE_URL = 'https://pixabay.com/api/';

axios({
  method: 'get',
  url: 'https://jsonplaceholder.typicode.com/users',
});

export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });
    return {
      images: data.hits,
      totalHits: data.totalHits,
    };
  } catch (error) {
    console.error('Error fetching images:', error);
    return { images: [], totalHits: 0 };
  }
}
