document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const images = carousel.querySelectorAll("img");
  let position = 0;

  // Duplicate images to fill the carousel
  for (let i = 0; i < images.length; i++) {
    carousel.appendChild(images[i].cloneNode(true));
  }

  function scroll() {
    position -= 1; // Adjust the scrolling speed by changing this value
    carousel.style.transform = `translateX(${position}px)`;

    if (position <= -images[0].width) {
      // Reset position for continuous loop
      position += images[0].width;

      // Move the first image to the end
      carousel.appendChild(images[0].cloneNode(true));
      carousel.removeChild(carousel.firstElementChild);
    }

    requestAnimationFrame(scroll);
  }

  requestAnimationFrame(scroll);
});
