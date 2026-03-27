import { StateManager } from "./state.js";
import { setupCanvas } from "./canvas.js";
import { setupToolbarEvents } from "../components/toolbar/toolbar.js";
import { setupKeybinds } from "./keybind.js";

// Setup tool manager and canvas with defaults
const canvas = document.querySelector("canvas");
const stateManager = new StateManager();
const ctx = setupCanvas(canvas, stateManager);

// Registering Event handling
const tools = document.querySelectorAll(".tool");
setupToolbarEvents(tools, stateManager);

// Registering Keybinds
setupKeybinds(stateManager);

document.getElementById("clear-btn").addEventListener("click", () => {
  stateManager.clear();
});

document.getElementById("save-btn").addEventListener("click", () => {
  const canvas = ctx.canvas;
  canvas.toBlob(function(blob) {
    const link = document.createElement("a");
    link.download = "canvas-illustraitor.png";
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }, "image/png");
});

document.getElementById("canvas-color").addEventListener("input", (e) => {
  stateManager.canvasColor = e.target.value;
  sessionStorage.setItem("canvasColor", e.target.value);
  stateManager.render();
});
