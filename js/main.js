import { StateManager } from "./state.js";
import { setupCanvas } from "./canvas.js";
import { setupToolbarEvents } from "../components/toolbar/toolbar.js";

// Setup tool manager and canvas with defaults
const canvas = document.querySelector(".canvas");
const stateManager = new StateManager();
setupCanvas(canvas, stateManager);

// Registering Event handling
const tools = document.querySelectorAll(".tool");
setupToolbarEvents(tools, stateManager);

document.getElementById("clear-btn").addEventListener("click", () => {
  stateManager.clear();
});
