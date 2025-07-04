function toggleDropdown(button) {
  var dropdownContent = button.nextElementSibling;

  // Close all dropdowns
  var dropdowns = document.querySelectorAll(".dropdown-content");
  dropdowns.forEach(function (dropdown) {
    if (dropdown !== dropdownContent) {
      dropdown.style.display = "none";
    }
  });

  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
    button.classList.remove("active");
  } else {
    dropdownContent.style.display = "block";
    button.classList.add("active");
  }
}
