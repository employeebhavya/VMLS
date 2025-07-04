document.addEventListener("DOMContentLoaded", function () {
  // Better path detection
  let currentPath = window.location.pathname;
  let pathSegments = currentPath.split("/").filter((segment) => segment !== "");
  let isRoot = pathSegments.length <= 1; // More reliable root detection

  let menuPath = isRoot ? "./menu.html" : "../menu.html";

  console.log("Loading menu from:", menuPath);

  fetch(menuPath)
    .then((response) => {
      console.log("Menu response status:", response.status);
      if (!response.ok) {
        // Try alternative path if first fails
        let altPath = isRoot ? "menu.html" : "./menu.html";
        console.log("Trying alternative menu path:", altPath);
        return fetch(altPath);
      }
      return response;
    })
    .then((response) => {
      console.log("Final menu response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      console.log("Menu data loaded successfully");
      let menuElements = document.querySelectorAll("#menu-content");
      if (menuElements.length > 0) {
        menuElements.forEach((menu) => {
          menu.innerHTML = data;

          // **Update dynamic paths after inserting menu**
          menu.querySelectorAll("img").forEach((img) => {
            let src = img.getAttribute("src");
            if (
              src &&
              !src.startsWith("http") &&
              !src.startsWith("//") &&
              !src.startsWith("data:")
            ) {
              // More robust path handling
              if (src.startsWith("./")) {
                img.src = isRoot ? src : "../" + src.substring(2);
              } else if (!src.startsWith("../")) {
                img.src = isRoot ? "./" + src : "../" + src;
              }
            }
          });

          menu.querySelectorAll("a").forEach((link) => {
            let href = link.getAttribute("href");
            if (
              href &&
              !href.startsWith("http") &&
              !href.startsWith("#") &&
              !href.startsWith("//") &&
              !href.startsWith("tel:") &&
              !href.startsWith("mailto:")
            ) {
              // More robust path handling
              if (href.startsWith("./")) {
                link.href = isRoot ? href : "../" + href.substring(2);
              } else if (!href.startsWith("../")) {
                link.href = isRoot ? "./" + href : "../" + href;
              }
            }
          });
        });

        // After menu is loaded, add event listeners
        attachMenuEvents();
      }
    })
    .catch((error) => {
      console.error("Error loading menu:", error);
      console.error(
        "Attempted paths:",
        menuPath,
        isRoot ? "menu.html" : "./menu.html"
      );
    });

  function attachMenuEvents() {
    const menus = document.querySelectorAll(".topbar-right-img");
    const closeBtns = document.querySelectorAll(".close-btn");
    const menuContents = document.querySelectorAll(".menu");

    menus.forEach((menu, index) => {
      menu.addEventListener("click", function () {
        if (menuContents[index]) {
          menuContents[index].style.setProperty("left", "0", "important");
          menuContents[index].classList.add("active");
        }
      });
    });

    closeBtns.forEach((btn, index) => {
      btn.addEventListener("click", function () {
        menuContents.forEach((content) => {
          content.style.left = "-200vw";
        });
        if (menuContents[index]) {
          menuContents[index].classList.remove("active");
        }
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Better path detection
  let currentPath = window.location.pathname;
  let pathSegments = currentPath.split("/").filter((segment) => segment !== "");
  let isRoot = pathSegments.length <= 1; // More reliable root detection

  // Set the correct fetch path
  let footerPath = isRoot ? "./footer.html" : "../footer.html";

  console.log("Loading footer from:", footerPath);

  fetch(footerPath)
    .then((response) => {
      console.log("Footer response status:", response.status);
      if (!response.ok) {
        // Try alternative path if first fails
        let altPath = isRoot ? "footer.html" : "./footer.html";
        console.log("Trying alternative footer path:", altPath);
        return fetch(altPath);
      }
      return response;
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      console.log("Footer data loaded successfully");
      let footerElements = document.getElementsByClassName("footer");
      if (footerElements.length > 0) {
        Array.from(footerElements).forEach((footer) => {
          footer.innerHTML = data;
        });

        // Adjust image and link paths dynamically
        document.querySelectorAll(".footer img").forEach((img) => {
          let src = img.getAttribute("src");
          if (src && (src.startsWith("./") || src.startsWith("../"))) {
            if (src.startsWith("./")) {
              img.src = isRoot ? src : "../" + src.substring(2);
            } else if (src.startsWith("../")) {
              img.src = isRoot ? "./" + src.substring(3) : src;
            }
          }
        });

        document.querySelectorAll(".footer a").forEach((link) => {
          let href = link.getAttribute("href");
          if (href && (href.startsWith("./") || href.startsWith("../"))) {
            if (href.startsWith("./")) {
              link.href = isRoot ? href : "../" + href.substring(2);
            } else if (href.startsWith("../")) {
              link.href = isRoot ? "./" + href.substring(3) : href;
            }
          }
        });
      }
    })
    .catch((error) => {
      console.error("Error loading footer:", error);
      console.error(
        "Attempted paths:",
        footerPath,
        isRoot ? "footer.html" : "./footer.html"
      );
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("carousel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const items = document.querySelectorAll(".announcement-item");
  let currentIndex = 0;
  const itemCount = items.length;

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % itemCount;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + itemCount) % itemCount;
    updateCarousel();
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
});

// Mouse-following Read More button
document.addEventListener("DOMContentLoaded", function () {
  const deanSection = document.getElementById("dean-desk");
  const readMoreBtn = document.getElementById("dean-desk-read-more");

  if (deanSection && readMoreBtn) {
    let isHovering = false;

    // Mouse enter section
    deanSection.addEventListener("mouseenter", function () {
      isHovering = true;
      readMoreBtn.style.opacity = "1";
      readMoreBtn.style.transform = "scale(1)";
      readMoreBtn.style.pointerEvents = "auto";
    });

    // Mouse leave section
    deanSection.addEventListener("mouseleave", function () {
      isHovering = false;
      readMoreBtn.style.opacity = "0";
      readMoreBtn.style.transform = "scale(0)";
      readMoreBtn.style.pointerEvents = "none";
    });

    // Mouse move within section
    deanSection.addEventListener("mousemove", function (e) {
      if (isHovering) {
        const rect = deanSection.getBoundingClientRect();
        const x = e.clientX - rect.left - 48; // 48px is half of size-24 (96px/2)
        const y = e.clientY - rect.top - 48;

        // Keep button within section boundaries
        const maxX = rect.width - 96; // 96px is size-24
        const maxY = rect.height - 96;

        const clampedX = Math.max(0, Math.min(x, maxX));
        const clampedY = Math.max(0, Math.min(y, maxY));

        readMoreBtn.style.left = clampedX + "px";
        readMoreBtn.style.top = clampedY + "px";
      }
    });
  }
});

// Function to inject the buttons HTML
function injectSidebarButtons() {
  const buttonsHTML = `
    <div class="applyknow1">
      <a class="" href="https://admissions.vmls.edu.in/" target="_blank" style="color: #ffffff; background-color: #ffffff00">Apply Now!</a>
    </div>
    <div class="applyknow">
      <span class="npfWidgetButton npfWidget-87feca6bc65be091ed018757c6c58029" style="background-color: #ffffff00">Enquire Now!</span>
    </div>
  `;

  // Create a container div and append to body
  const container = document.createElement("div");
  container.innerHTML = buttonsHTML;
  document.body.appendChild(container);

  // Load the external script dynamically
  const script = document.createElement("script");
  script.src = "https://in8cdn.npfs.co/js/widget/npfwpopup.js";
  script.onload = function () {
    // Initialize the widget after script loads
    new NpfWidgetsInit({
      widgetId: "87feca6bc65be091ed018757c6c58029",
      baseurl: "widgets.in8.nopaperforms.com",
      formTitle: "Enquiry Form",
      titleColor: "#FF0033",
      backgroundColor: "#ddd",
      iframeHeight: "500px",
      buttonbgColor: "#4c79dc",
      buttonTextColor: "#FFF",
    });
  };
  document.body.appendChild(script);
}

// Wait for DOM to be fully loaded
if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  // Load immediately if page is already loaded
  injectSidebarButtons();
} else {
  // Wait for DOMContentLoaded event
  document.addEventListener("DOMContentLoaded", injectSidebarButtons);
}
