// Add imports above this line
import { galleryItems } from './gallery-items';
// Import описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');
const galleryMarkup = galleryItems.map(galleryItemMarkup).join('');

galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function galleryItemMarkup({ preview, original, description }) {
  return `
  <a class="gallery__item" href=${original}>
    <img class="gallery__image" src=${preview} alt=${description} />
  </a>
  `;
}
