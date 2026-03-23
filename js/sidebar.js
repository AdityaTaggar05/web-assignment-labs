function updateTooltip(slider, tooltip) {
  const value = slider.value;
  tooltip.textContent = value;
}

export function renderSidebar(tool) {
  const content = document.querySelector(".sidebar .content");
  const optionsData = tool.getSidebarOptions();

  content.innerHTML = `
  <h3>${optionsData.name}</h3>
  `;

  for (const option of optionsData.options) {
    console.log(option);
    let data = ``;

    switch (option.type) {
      case "checkbox":
        data += ` <input type="checkbox" id="${option.id}" ${option.value ? "checked" : ""} /> `;
        break;
      case "range":
        data += `
          <input type="range" id="${option.id}" min="${option.min}" max="${option.max}" value="${option.value}" />
          <div class="tooltip">${option.value}</div>
        `;
        break;
      case "color":
        data += ` <input type="color" id="${option.id}" value="${option.value}" /> `;
        break;
    }

    content.innerHTML += `
      <div class="option">
        <label>${option.label}</label>
        ${data}
      </div>
    `;
  }

  tool.bindSidebarEvents();

  const slider = document.querySelector("input[type='range']");
  if (slider) {
    const tooltip = document.querySelector(".sidebar .option .tooltip");

    slider.addEventListener("input", () => updateTooltip(slider, tooltip));
    updateTooltip(slider, tooltip);
  }
}
