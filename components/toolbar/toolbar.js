const tools = document.querySelectorAll(".tool");
tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    if (tool.classList.contains("active")) return;

    if (tool.getAttribute("data-action") == "collapse") {
      document.querySelector(".toolbar").classList.remove("active");
    } else {
      tools.forEach((t) => t.classList.remove("active"));
      tool.classList.add("active");
    }
  });
});
