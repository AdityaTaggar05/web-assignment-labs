import { renderSidebar } from "../../js/sidebar.js";

export function setupToolbarEvents(tools, stateManager) {
  tools.forEach((tool) => {
    tool.addEventListener("click", () => {
      const name = tool.getAttribute("data-action");

      switch (name) {
        case "pencil":
        case "rectangle":
        case "circle":
        case "ellipse":
        case "triangle":
        case "text":
        case "select":
        case "eraser":
          stateManager.setTool(name);
          break;
        case "undo":
          stateManager.currentTool?.onUndo();
          stateManager.undo();
          break;
        case "redo":
          stateManager.redo();
          break;
      }
    });
  });
}
