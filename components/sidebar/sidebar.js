document.querySelector(".sidebar #close").addEventListener("click", () => {
  document.querySelector(".sidebar").classList.remove("active");
});

const slider = document.getElementById("slider");
const tooltip = document.getElementById("tooltip");

function updateTooltip() {
  const value = slider.value;
  tooltip.textContent = value;
}

slider.addEventListener("input", updateTooltip);
updateTooltip();
