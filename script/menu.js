document.addEventListener("DOMContentLoaded", function () {
  const menus = document.querySelectorAll(".topbar-right-img");
  const closeBtns = document.querySelectorAll(".close-btn");
  const menuContents = document.querySelectorAll(".menu");

  // Open menu
  menus.forEach((menu, index) => {
    menu.addEventListener("click", function () {
      menuContents[index].style.setProperty("left", "0", "important");
      menuContents[index].classList.add("active");
    });
  });

  // Close menu
  closeBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      menuContents[index].style.left = "-200vw"; // Hide only the clicked menu
      menuContents[index].classList.remove("active");
    });
  });

  // Scroll to section function
  function scrollToSection() {
    var urlParams = new URLSearchParams(window.location.search);
    var sectionId = urlParams.get("section");
    var section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Section not found with ID:", sectionId);
    }
  }
  window.onload = scrollToSection;

  // logo-link
  let headerImgs = document.querySelectorAll(".header-img-02");
  Array.from(headerImgs).forEach((headerImg) => {
    let link = document.createElement("a");
    link.href = "https://vmls.edu.in/";
    headerImg.parentNode.insertBefore(link, headerImg);
    link.appendChild(headerImg);
  });

  // go to top button
  var goTopBtn = document.createElement("button");
  goTopBtn.innerHTML = "<i class='ri-arrow-up-double-line'></i>";
  goTopBtn.style.position = "fixed";
  goTopBtn.style.bottom = "100px";
  goTopBtn.style.right = "30px";
  goTopBtn.style.zIndex = "9999";
  goTopBtn.style.border = "none";
  goTopBtn.style.outline = "none";
  goTopBtn.style.backgroundColor = "#8d191c";
  goTopBtn.style.color = "white";
  goTopBtn.style.cursor = "pointer";
  goTopBtn.style.padding = "27px";
  goTopBtn.style.borderRadius = "50%";
  goTopBtn.style.width = "40px";
  goTopBtn.style.height = "40px";
  goTopBtn.style.fontSize = "20px";
  goTopBtn.style.display = "flex";
  goTopBtn.style.alignItems = "center";
  goTopBtn.style.justifyContent = "center";
  goTopBtn.style.opacity = "0";
  goTopBtn.style.visibility = "hidden";
  goTopBtn.style.transform = "translateY(20px)";
  goTopBtn.style.transition = "all 0.3s ease-in-out";
  document.body.appendChild(goTopBtn);

  function toggleGoTopButton() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      goTopBtn.style.opacity = "1";
      goTopBtn.style.visibility = "visible";
      goTopBtn.style.transform = "translateY(0)";
    } else {
      goTopBtn.style.opacity = "0";
      goTopBtn.style.visibility = "hidden";
      goTopBtn.style.transform = "translateY(20px)";
    }
  }

  window.addEventListener("scroll", toggleGoTopButton);
  toggleGoTopButton();

  // Scroll to top when button is clicked
  goTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // embedding-links head
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "./styles/dropdown.css";

  const head = document.head || document.getElementsByTagName("head")[0];
  const lastChild = head.lastElementChild;

  if (lastChild.tagName === "LINK") {
    head.insertBefore(link, lastChild.nextSibling);
  } else {
    head.appendChild(link);
  }

  const fontAwesomeLink = document.createElement("link");
  fontAwesomeLink.rel = "stylesheet";
  fontAwesomeLink.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
  head.appendChild(fontAwesomeLink);

  const script = document.createElement("script");
  script.src = "./script/dropdown.js";
  document.body.appendChild(script);

  // form-code
  var phoneInputs = document.querySelectorAll("input#phone");
  phoneInputs.forEach(function (phoneInput) {
    phoneInput.setAttribute("required", true);
    phoneInput.setAttribute("placeholder", "Enter your Mobile number*");
  });

  // video-popup-js
  function getYouTubeID(url) {
    const regExp =
      /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  const videoThumbnails = document.querySelectorAll(".video-thumbnail");
  const popup = document.getElementById("video-popup");
  const popupVideo = document.getElementById("popup-video");
  const closePopup = document.querySelector(".close-popup");

  videoThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const videoUrl = this.getAttribute("data-video-url");
      const videoId = getYouTubeID(videoUrl);
      if (videoId) {
        popupVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        popup.style.display = "flex";
      }
    });
  });

  closePopup.addEventListener("click", function () {
    popup.style.display = "none";
    popupVideo.src = ""; // Stop the video
  });

  window.addEventListener("click", function (e) {
    if (e.target === popup) {
      popup.style.display = "none";
      popupVideo.src = ""; // Stop the video
    }
  });

  // hover video infrastructure
  function VideoPlay() {
    const infraColumns = document.querySelectorAll(".column-infra");

    infraColumns.forEach((column) => {
      const img = column.querySelector("img");
      const videoSrc = column.getAttribute("data-video");

      column.addEventListener("mouseenter", () => {
        const video = document.createElement("video");
        video.src = videoSrc;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.classList.add("video-overlay");
        video.playsInline = true;

        img.style.display = "none";
        column.querySelector(".image-infra").appendChild(video);
      });

      column.addEventListener("mouseleave", () => {
        const video = column.querySelector("video");
        if (video) {
          video.remove();
          img.style.display = "block";
        }
      });
    });
  }
  VideoPlay();
});

document.addEventListener("DOMContentLoaded", function () {
  var tabs = document.querySelectorAll("ul.tabs li");
  var contents = document.querySelectorAll(".tab-content");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var tab_id = this.getAttribute("data-tab");

      tabs.forEach(function (item) {
        item.classList.remove("current");
      });

      contents.forEach(function (content) {
        content.classList.remove("current");
      });

      this.classList.add("current");
      document.getElementById(tab_id).classList.add("current");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const dropdownLinks = document.querySelectorAll(".dropdown-content a");

  dropdownLinks.forEach((link) => {
    link.textContent = link.textContent.replace(/\s?>$/, ""); // Removes " >" from the end
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = "/assets/favicon.ico"; // Update with the actual path
  link.type = "image/x-icon";
  document.head.appendChild(link);
});

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Create and append the div element
  var chatDiv = document.createElement("div");
  chatDiv.className = "npf_chatbots";
  chatDiv.setAttribute("data-w", "1189388fc18c4ac0952bc3816b615524");
  chatDiv.style.display = "none";
  document.body.appendChild(chatDiv);

  // Create and append the script element
  var chatbotScript = document.createElement("script");
  chatbotScript.type = "text/javascript";
  chatbotScript.async = true;
  chatbotScript.src =
    "https://chatbot.in8.nopaperforms.com/en-gb/backend/bots/niaachtbtscpt.js/5747642c1669bd257/1189388fc18c4ac0952bc3816b615524";
  document.body.appendChild(chatbotScript);
});

document.addEventListener("DOMContentLoaded", function () {
  // Ensure the <head> section is targeted
  const head = document.head;

  if (head) {
    // Get the current URL for the canonical tag
    const currentUrl = window.location.origin + window.location.pathname;

    // Create and add the Robots meta tag
    const robotsMeta = document.createElement("meta");
    robotsMeta.name = "robots";
    robotsMeta.content = "index, follow";
    head.appendChild(robotsMeta);

    // Create and add the Canonical link tag
    const canonicalLink = document.createElement("link");
    canonicalLink.rel = "canonical";
    canonicalLink.href = currentUrl;
    head.appendChild(canonicalLink);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const baseCount = 400; // Base count starts at 400 globally
  const pageId = window.location.pathname; // Unique identifier per blog page
  let views = localStorage.getItem(pageId);

  if (views === null) {
    views = 0; // Start counting from 0 but base count is 400
  } else {
    views = parseInt(views) + 1; // Increment views
  }

  localStorage.setItem(pageId, views); // Store in localStorage
  document.getElementById("views-count").textContent = baseCount + views; // Display total count
});

document.addEventListener("DOMContentLoaded", function () {
  const pageId = window.location.pathname; // Unique identifier per blog page

  const filterPage = pageId
    .replace("/blogs/", "")
    .replace(".html", "")
    .replace(/-/g, " ");

  document.getElementById("current-blog-page").textContent = filterPage; // Update UI
});

document.addEventListener("DOMContentLoaded", function () {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);

  // Update hrefs with current page URL and title
  document.querySelectorAll(".social-share a").forEach((link) => {
    link.href = link.href.replace("{URL}", url).replace("{TITLE}", title);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function createWhatsAppButton() {
    const button = document.createElement("div");
    button.id = "whatsapp-button";
    button.innerHTML =
      '<a href="https://wa.me/917358201234" target="_blank" id="whatsapp-link"><i class="fab fa-whatsapp"></i></a>';
    document.body.appendChild(button);
  }
  createWhatsAppButton();
});
// document.addEventListener("DOMContentLoaded", function () {
//   const sattamImg = document.getElementById("sattam-img");
//   const closeSattam = document.getElementById("sattam-close");
//   document
//     .getElementById("vmls-notification")
//     .addEventListener("click", function () {
//       sattamImg.style.left = "50%";
//       sattamImg.style.transition = "left 0.5s ease-in-out";
//     });
//   closeSattam.addEventListener("click", function () {
//     sattamImg.style.left = "-50%";
//     sattamImg.style.transition = "left 0.5s ease-in-out";
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  const widget = document.createElement("div");
  widget.className = "chatwithstudent";
  widget.innerText = "Chat with a Student";
  widget.onclick = function () {
    window.open("https://vmls.edu.in/chat-with-a-student.html", "_blank");
  };

  // Add the styles for .chatwithstudent
  const style = document.createElement("style");
  style.innerHTML = `
    .chatwithstudent {
      width: 176px;
  height: 40px;
  padding: 10px;
  position: fixed;
  left: -76px;
  top: 48%;
  z-index: 10000;
      background: #ae0808;
      transform: rotate(-270deg);
      text-align: center;
      color: #ffffff;
      font-size: 17px;
      cursor: pointer;
      -webkit-animation: pulse 1s infinite;
      -moz-animation: pulse 1s infinite;
      -o-animation: pulse 1s infinite;
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0% { transform: rotate(270deg) scale(1); }
      50% { transform: rotate(270deg) scale(1.05); }
      100% { transform: rotate(270deg) scale(1); }
    }

    /* Mobile style */
    @media (max-width: 767px) {
      .chatwithstudent {
        width: 160px;
        height: 40px;
        padding: 10px;
        left: -66px;
        top: 38%;
        font-size: 15px !important;
      }
    }
  `;

  // Append style and widget to the document
  document.head.appendChild(style);
  document.body.appendChild(widget);
});
