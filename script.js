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


  // Event registration modal logic

  document.querySelectorAll('.btn-outline-gold').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      if (btn.closest('table')) {
        e.preventDefault();
        const eventName = btn.closest('tr').children[1].textContent;
        document.getElementById('eventName').textContent = eventName;
        document.getElementById('registerSuccess').classList.add('d-none');
        const modal = new bootstrap.Modal(document.getElementById('registerModal'));
        modal.show();
      }
    });
  });

  var eventRegisterForm = document.getElementById('eventRegisterForm');
  if (eventRegisterForm) {
    eventRegisterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('registerSuccess').classList.remove('d-none');
      setTimeout(() => {
        bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
      }, 1200);
      this.reset();
    });
  }

// Past Events Card Modal Logic
  document.querySelectorAll('.event-card').forEach(function(card) {
    card.style.cursor = "pointer";
    card.addEventListener('click', function() {
      document.getElementById('eventDetailsImg').src = card.getAttribute('data-img');
      document.getElementById('eventDetailsImg').alt = card.getAttribute('data-title');
      document.getElementById('eventDetailsTitle').textContent = card.getAttribute('data-title');
      document.getElementById('eventDetailsDesc').textContent = card.getAttribute('data-desc');
      document.getElementById('eventDetailsDate').textContent = card.getAttribute('data-date');
      document.getElementById('eventDetailsModal').classList.remove('d-none');
    });
  });
  document.querySelector('.event-details-backdrop').addEventListener('click', function() {
    document.getElementById('eventDetailsModal').classList.add('d-none');
  });
  document.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    document.getElementById('eventDetailsModal').classList.add('d-none');
  }
});

// Team Modal Logic
document.querySelectorAll('.team-card').forEach(function(card) {
  card.style.cursor = "pointer";
  card.addEventListener('click', function() {
    document.getElementById('teamModalImg').src = card.getAttribute('data-img');
    document.getElementById('teamModalImg').alt = card.getAttribute('data-name');
    document.getElementById('teamModalName').textContent = card.getAttribute('data-name');
    document.getElementById('teamModalRole').textContent = card.getAttribute('data-role');
    document.getElementById('teamModalBio').textContent = card.getAttribute('data-bio');
    document.getElementById('teamModalExtra').textContent = card.getAttribute('data-extra') || '';
    document.getElementById('teamModal').classList.remove('d-none');
  });
});

document.getElementById('teamModal').addEventListener('click', function(e) {
  if (e.target === this) {
    this.classList.add('d-none');
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    document.getElementById('teamModal').classList.add('d-none');
  }
  document.querySelector('.event-details-backdrop').addEventListener('click', function() {
    document.getElementById('teamModal').classList.add('d-none');
  });
});
