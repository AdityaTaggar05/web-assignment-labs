import { renderSidebar } from "../../js/sidebar.js";
import { CircleTool } from "../../js/tools/circle.js";
import { EllipseTool } from "../../js/tools/ellipse.js";
import { PencilTool } from "../../js/tools/pencil.js";
import { RectangleTool } from "../../js/tools/rectangle.js";
import { TriangleTool } from "../../js/tools/triangle.js";

function selectTool(tool, tools) {
  if (!tool.classList.contains("active")) {
    tools.forEach((t) => t.classList.remove("active"));
    tool.classList.add("active");
  }

  document.querySelector(".sidebar").classList.add("active");
}

export function setupToolbarEvents(tools, stateManager) {
  const pencil = new PencilTool(stateManager);
  const rectangle = new RectangleTool(stateManager);
  const circle = new CircleTool(stateManager);
  const ellipse = new EllipseTool(stateManager);
  const triangle = new TriangleTool(stateManager);

  tools.forEach((tool) => {
    tool.addEventListener("click", () => {
      const name = tool.getAttribute("data-action");

      switch (name) {
        case "pencil":
          stateManager.setTool(pencil);
          selectTool(tool, tools);
          break;
        case "rectangle":
          stateManager.setTool(rectangle);
          selectTool(tool, tools);
          break;
        case "circle":
          stateManager.setTool(circle);
          selectTool(tool, tools);
          break;
        case "ellipse":
          stateManager.setTool(ellipse);
          selectTool(tool, tools);
          break;
        case "triangle":
          stateManager.setTool(triangle);
          selectTool(tool, tools);
          break;
        case "undo":
          stateManager.currentTool.onUndo();
          stateManager.undo();
          break;
        case "redo":
          stateManager.redo();
          break;
      }

      renderSidebar(stateManager.currentTool);
    });
  });
}
