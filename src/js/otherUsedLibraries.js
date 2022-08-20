export { pageScrolling, infiniteScroll, scroll };

import { onLoadMoreBtnClick } from "../index"
import OnlyScroll from 'only-scrollbar';

// Прокручування сторінки
function pageScrolling() {
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}

// Безкінечний скролл 
function infiniteScroll() {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    onLoadMoreBtnClick()
  }
}

// Плавний скролл
const scroll = new OnlyScroll(window, {
  damping: 0.6,
});