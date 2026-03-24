document.querySelector(".sidebar #close").addEventListener("click", () => {
  const sidebar = document.querySelector(".sidebar");

  if (sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
  } else {
    sidebar.classList.add("active");
  }
});

document
  .querySelector(".sidebar .theme-toggle")
  .addEventListener("click", () => {
    const items = document.getElementsByClassName("theme-mode");

    if (items[0].classList.contains("active")) {
      items[0].classList.remove("active");
      items[1].classList.add("active");
    } else {
      items[1].classList.remove("active");
      items[0].classList.add("active");
    }

    const root = document.documentElement;
    const isDark = root.getAttribute("data-theme") === "dark";
    root.setAttribute("data-theme", isDark ? "light" : "dark");
  });
