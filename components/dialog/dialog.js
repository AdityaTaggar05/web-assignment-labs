document.getElementById("help-btn").addEventListener("click", () => {
  document.getElementById("help-dialog").classList.add("active");
});

document.querySelector("#help-dialog button").addEventListener("click", () => {
  document.getElementById("help-dialog").classList.remove("active");
});
