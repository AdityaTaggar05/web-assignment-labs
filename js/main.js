import { ToolManager } from "./tool.js";
import { setupCanvas } from "./canvas.js";
import { setupToolbarEvents } from "../components/toolbar/toolbar.js";

// Setup tool manager and canvas with defaults
const canvas = document.querySelector(".canvas");
const toolManager = new ToolManager();
const ctx = setupCanvas(canvas, toolManager);

// Registering Event handling
const tools = document.querySelectorAll(".tool");
setupToolbarEvents(tools, toolManager);

document.getElementById("clear-btn").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
