document.addEventListener("DOMContentLoaded", function () {
  // Gallery filter logic
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
  if (galleryModal) {
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
  }

  // Registration form submission handler (contact.html)
  var regForm = document.getElementById('registrationForm');
  if (regForm) {
    regForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const form = e.target;
      const params = new URLSearchParams(new FormData(form)).toString();
      window.location.href = 'form-response.html?' + params;
    });
  }

  // Display submitted data (form-response.html)
  var submittedDataDiv = document.getElementById('submittedData');
  if (submittedDataDiv) {
    function getQueryParams() {
      return Object.fromEntries(new URLSearchParams(window.location.search));
    }
    function displaySubmittedData() {
      const data = getQueryParams();
      if (Object.keys(data).length === 0) return;
      let html = '<h2 class="h4 mb-3">Your Submission:</h2><ul class="list-group mb-4">';
      if (data.firstName) html += `<li class='list-group-item'><strong>First Name:</strong> ${decodeURIComponent(data.firstName)}</li>`;
      if (data.lastName) html += `<li class='list-group-item'><strong>Last Name:</strong> ${decodeURIComponent(data.lastName)}</li>`;
      if (data.email) html += `<li class='list-group-item'><strong>Email:</strong> ${decodeURIComponent(data.email)}</li>`;
      if (data.phone) html += `<li class='list-group-item'><strong>Phone Number:</strong> ${decodeURIComponent(data.phone)}</li>`;
      if (data.experience) html += `<li class='list-group-item'><strong>Experience:</strong> ${decodeURIComponent(data.experience)}</li>`;
      if (data.terms) html += `<li class='list-group-item'><strong>Agreed to Terms:</strong> Yes</li>`;
      html += '</ul>';
      submittedDataDiv.innerHTML = html;
    }
    displaySubmittedData();
  }
});