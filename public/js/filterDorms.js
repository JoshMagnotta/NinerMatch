document.addEventListener("DOMContentLoaded", function () {
    const sortButtons = document.querySelectorAll(".sort-btn");
    const container = document.getElementById("dorms-container");
    const cards = Array.from(container.children);
  
    sortButtons.forEach(button => {
      button.addEventListener("click", () => {
        const mode = button.dataset.sort;
        let sorted = [...cards];
  
        switch (mode) {
          case "alpha-asc":
            sorted.sort((a, b) => a.querySelector("h2").innerText.localeCompare(b.querySelector("h2").innerText));
            break;
          case "alpha-desc":
            sorted.sort((a, b) => b.querySelector("h2").innerText.localeCompare(a.querySelector("h2").innerText));
            break;
          case "stars":
            sorted.sort((a, b) => parseFloat(b.dataset.star) - parseFloat(a.dataset.star));
            break;
          case "rent":
            sorted.sort((a, b) => parseFloat(a.dataset.rent) - parseFloat(b.dataset.rent));
            break;
          case "campus-true":
            sorted.sort((a, b) => (b.dataset.onCampus === "true") - (a.dataset.onCampus === "true"));
            break;
          case "campus-false":
            sorted.sort((a, b) => (a.dataset.onCampus === "true") - (b.dataset.onCampus === "true"));
            break;
        }
  
        // Clear and re-append sorted cards
        container.innerHTML = "";
        sorted.forEach(card => container.appendChild(card));
      });
    });
  });