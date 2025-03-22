import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  showLoader,
  hideLoader,
  showErrorMessage,
  toggleLoadMoreBtn,
  showEndOfCollectionMessage,
} from './js/render-functions.js';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const loadMoreBtn = document.querySelector('.load-more');
let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = input.value.trim();
  if (!query) {
    showErrorMessage('Please enter a search term!');
    return;
  }
  page = 1;
  toggleLoadMoreBtn(false); // Передаємо кнопку
  showLoader();

  try {
    const { images, totalHits: fetchedTotalHits } = await fetchImages(
      query,
      page,
      perPage
    );
    totalHits = fetchedTotalHits;

    renderGallery(images, true);
    hideLoader();

    if (images.length < perPage || totalHits <= perPage) {
      toggleLoadMoreBtn(false);
    } else {
      toggleLoadMoreBtn(true);
    }
  } catch (error) {
    showErrorMessage('Failed to fetch images. Please try again later.');
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const { images } = await fetchImages(query, page, perPage);
    renderGallery(images);
    hideLoader();

    const totalPages = Math.ceil(totalHits / perPage);
    if (page >= totalPages) {
      toggleLoadMoreBtn(false);
      showEndOfCollectionMessage();
    }

    // Scroll down smoothly after loading more images
    const firstGalleryItem = document.querySelector('.gallery li');
    if (firstGalleryItem) {
      const { height: cardHeight } = firstGalleryItem.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    showErrorMessage('Something went wrong while loading more images.');
    hideLoader();
  }
});
