import { galleryItems } from "./gallery-items.js";
// Change code below this line
document.body.style.backgroundColor = "black";

const refs = {
  gallery: document.querySelector(".gallery"),
  galleryImages: document.querySelectorAll(".gallery__image"),
};

// Сreating photo-card layouts
function createPhotoCardMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      loading="lazy"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}
// Render photo-card layouts
refs.gallery.insertAdjacentHTML(
  "beforeend",
  createPhotoCardMarkup(galleryItems)
);

// Add event listener to all gallery items
refs.gallery.addEventListener("click", handleClick);

// Create function open-close modal window
function handleClick(e) {
  e.preventDefault();
  const isGalleryItem = e.target.classList.contains("gallery__image");
  if (!isGalleryItem) {
    return;
  } else {
    const instance = basicLightbox.create(
      `<img src="${e.target.dataset.source}" alt="${e.target.alt}">`,
      {
        onShow: () => {
          window.addEventListener("keydown", onEscape);
        },
      }
    );

    instance.show();

    function onEscape(e) {
      if (e.key === "Escape") {
        instance.close();
        window.removeEventListener("keydown", onEscape);
      }
    }
    console.log(e.target);
  }
}

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
