document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".gallery-filter button");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  const galleryModal = document.getElementById("galleryModal");
  const modalTitle = galleryModal.querySelector(".modal-title");
  const modalImage = galleryModal.querySelector(".modal-image");
  const modalDescription = galleryModal.querySelector(".modal-description");

  document.querySelectorAll(".gallery-card img").forEach((img) => {
    img.addEventListener("click", () => {
      modalTitle.textContent = img.getAttribute("data-title");
      modalImage.src = img.getAttribute("data-img");
      modalImage.alt = img.getAttribute("alt");
      modalDescription.textContent = img.getAttribute("data-description");
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && galleryModal.classList.contains("show")) {
      bootstrap.Modal.getInstance(galleryModal).hide();
    }
  });

  galleryModal.addEventListener("click", function (e) {
    if (e.target === galleryModal) {
      bootstrap.Modal.getInstance(galleryModal).hide();
    }
  });
});