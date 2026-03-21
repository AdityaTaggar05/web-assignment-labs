export function renderSidebar(tool, state) {
  const content = document.querySelector(".sidebar .content");
  content.innerHTML = tool.getSidebarOptions();
}
