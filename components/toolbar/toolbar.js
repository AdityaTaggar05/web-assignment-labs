const tools = document.querySelectorAll(".tool");
tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    if (tool.classList.contains("active")) return;

    tools.forEach((t) => t.classList.remove("active"));
    tool.classList.add("active");

    document.querySelector(".sidebar").classList.add("active");
  });
});
