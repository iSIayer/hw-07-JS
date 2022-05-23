import { galleryItems } from "./gallery-items.js";
// Change code below this line
document.body.style.backgroundColor = "black";

const refs = {
  gallery: document.querySelector(".gallery"),
  galleryImages: document.querySelectorAll(".gallery__image"),
};

function createPhotoCardMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li><a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a></li>`;
    })
    .join("");
}
// Render photo-card layouts
refs.gallery.insertAdjacentHTML(
  "beforeend",
  createPhotoCardMarkup(galleryItems)
);

// Lightbox
const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  overlayOpacity: 0.3,
});

// Control lazy loading
if ("loading" in HTMLImageElement.prototype) {
  refs.galleryImages.forEach((image) => {
    image.setAttribute("loading", "lazy");
  });
} else {
  createLazyLoadEl();
}

function createLazyLoadEl() {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossOrigin = "anonymous";
  script.referrerPolicy = "no-referrer";

  document.body.appendChild(script);
}

console.log(galleryItems);
