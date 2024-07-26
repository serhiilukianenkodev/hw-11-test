import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getFotos } from './js/api.js';

const searchForm = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
// console.log('🚀 ~ searchForm:', searchForm);

searchForm.addEventListener('submit', onFormSubmit);

// getFotos('dscfwrfwref').then(showImages).catch(console.log);

function onFormSubmit(evt) {
  evt.preventDefault();
  const query = evt.target.elements.searchQuery.value;
  const normilizedQuery = query.trim().toLowerCase();
  console.log('🚀 ~ onFormSubmit ~ normilizeQuery:', normilizedQuery);

  if (!normilizedQuery) return;

  getFotos(normilizedQuery).then(showImages).catch(console.log);
}

function showImages({ total, totalHits, hits }) {
  if (!total) {
    Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  console.log(hits);

  galleryEl.insertAdjacentHTML('beforeend', createGalleryMarkup(hits));
}

function createGalleryMarkup(list) {
  return list
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="photo-card" data-url="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</li>
    `
    )
    .join('');
}
