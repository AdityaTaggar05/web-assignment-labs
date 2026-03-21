import { PencilTool } from "./tools/pencil.js";
import { ToolManager } from "./tool.js";
import { setupCanvas } from "./canvas.js";
import { renderSidebar } from "./sidebar.js";
import { setupToolbarEvents } from "../components/toolbar/toolbar.js";

// Setup tool manager and canvas with defaults
const canvas = document.querySelector(".canvas");
const state = {
  activeTool: null,
  strokeColor: "#000000",
  strokeWidth: 5,
};
const toolManager = new ToolManager(state);
const ctx = setupCanvas(canvas, toolManager);

// Registering Event handling
const tools = document.querySelectorAll(".tool");
setupToolbarEvents(tools, toolManager);

document.getElementById("clear-btn").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

const pencil = new PencilTool(state);
toolManager.setTool(pencil);

renderSidebar(toolManager.currentTool);
