document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const themeButton = document.querySelector(".theme-toggle");
  if (localStorage.getItem("yashuuu-theme") === "dark") {
    document.body.classList.add("dark");
  }

  function updateThemeButton() {
    if (themeButton) {
      themeButton.textContent =
        document.body.classList.contains("dark") ? "☀" : "☾";
    }
  }

  updateThemeButton();

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem(
        "yashuuu-theme",
        document.body.classList.contains("dark") ? "dark" : "light"
      );
      updateThemeButton();
    });
  }

  document.querySelectorAll("[data-gallery-filter]").forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.galleryFilter;
      document.querySelectorAll("[data-gallery-filter]").forEach(item => {
        item.classList.toggle("active", item === button);
      });
      document.querySelectorAll(".gallery-item").forEach(item => {
        item.classList.toggle(
          "hidden",
          filter !== "all" && item.dataset.kind !== filter
        );
      });
    });
  });

  const lightbox = document.querySelector("#lightbox");
  if (lightbox) {
    const image = lightbox.querySelector("img");
    const caption = lightbox.querySelector("p");
    const close = lightbox.querySelector(".lightbox-close");

    document.querySelectorAll(".gallery-item").forEach(item => {
      item.addEventListener("click", () => {
        const source = item.querySelector("img");
        image.src = source.src;
        image.alt = source.alt;
        caption.textContent = item.dataset.caption || "";
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        close.focus();
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    close.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeLightbox();
    });
  }
});