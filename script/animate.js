document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll("body > div");

  function fadeInElements() {
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();

      // If the element is in the viewport and not already visible
      if (
        rect.top < window.innerHeight &&
        rect.bottom >= 0 &&
        rect.left < window.innerWidth &&
        rect.right >= 0 &&
        !element.classList.contains("visible")
      ) {
        element.classList.add("visible");
      }
    });
  }

  // Initial check when the page loads
  fadeInElements();

  // Check for elements entering the viewport on scroll
  window.addEventListener("scroll", fadeInElements);
});
