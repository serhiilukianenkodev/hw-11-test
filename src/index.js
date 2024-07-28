import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { ImagesApi } from './js/api.js';

const searchForm = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const galleryGuard = document.querySelector('.quard');
// console.log('🚀 ~ searchForm:', searchForm);

searchForm.addEventListener('submit', onFormSubmit);
const lighgtBox = new SimpleLightbox('.gallery a', {
  /* options */
});

const api = new ImagesApi();

// var options = {
//   //   root: document.querySelector('#scrollArea'),
//   rootMargin: '700px',
//   //   threshold: 1.0,
// };
// var callback = function (entries, observer) {
//   /* Content excerpted, show below */
// };
const observer = new IntersectionObserver(
  entries => {
    const isIntersecting = entries[0].isIntersecting;
    console.dir(isIntersecting);
    if (!isIntersecting) return;
    api.setNextPage();
    api.getData().then(showImages).catch(console.log);
  },
  { root: null, rootMargin: '500px', threshold: 1.0 }
);

function onFormSubmit(evt) {
  evt.preventDefault();
  const query = evt.target.elements.searchQuery.value;
  const normilizedQuery = query.trim().toLowerCase();
  //   console.log('🚀 ~ onFormSubmit ~ normilizeQuery:', normilizedQuery);

  if (!normilizedQuery) return;
  observer.unobserve(galleryGuard);
  galleryEl.innerHTML = '';
  api.setQuery(normilizedQuery);
  api.getData().then(showImages).catch(console.log);
  evt.target.reset();
  setTimeout(() => {
    observer.observe(galleryGuard);
  }, 1000);
}

function showImages({ total, totalHits, hits }) {
  if (!total) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  Notify.success(`Hooray! We found ${totalHits} images.`);

  galleryEl.insertAdjacentHTML('beforeend', createGalleryMarkup(hits));
  lighgtBox.refresh();
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
    <li class="photo-card">
    <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="400px"/>
  </a>
  <ul class="info">
    <li class="info-item">
      <b><span class = "info-label">Likes</span> ${likes}</b>
    </li>
    <li class="info-item">
      <b><span class = "info-label">Views</span> ${views}</b>
    </li>
    <li class="info-item">
      <b><span class = "info-label">Comments</span> ${comments}</b>
    </li>
    <li class="info-item">
      <b><span class = "info-label">Downloads</span> ${downloads}</b>
    </li>
  </ul>
</li>
    `
    )
    .join('');
}
