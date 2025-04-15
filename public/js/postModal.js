const modal = document.getElementById("post-modal");
const openBtn = document.getElementById("create-post-btn");
const closeBtn = document.getElementById("close-modal");

// Make sure all elements exist before attaching events
if (modal && openBtn && closeBtn) {
  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
}
