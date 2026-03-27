export function setupKeybinds(stateManager) {
  const toolKeys = {
    1: "select",
    2: "eraser",
    3: "pencil",
    4: "rectangle",
    5: "triangle",
    6: "circle",
    7: "ellipse",
    8: "text",
  };

  document.addEventListener("keydown", (e) => {
    // Ctrl/Command + S
    if ((e.ctrlKey || e.metaKey) && e.code === "KeyS") {
      e.preventDefault(); // Prevent the browser's default save action
      document.querySelector("#save-btn").dispatchEvent(new Event("click"));
    }

    // Ctrl/Command + Z
    if ((e.ctrlKey || e.metaKey) && e.code === "KeyZ") {
      stateManager.undo();
    }

    // Ctrl/Command + Y
    if ((e.ctrlKey || e.metaKey) && e.code === "KeyY") {
      stateManager.redo();
    }

    // Ctrl/Command + H
    if ((e.ctrlKey || e.metaKey) && e.code === "KeyH") {
      e.preventDefault();
      document.querySelector("#help-btn").dispatchEvent(new Event("click"));
    }

    // Backspace / Del
    if (
      (e.code === "Backspace" || e.code === "Delete") &&
      !stateManager.currentTool.selectedElement?.type !== "text"
    ) {
      // Ctrl for Clear / Normal for Delete Element
      if (e.ctrlKey || e.metaKey) {
        stateManager.clear();
      } else {
        stateManager.removeSelected();
      }
    }

    // Disable Tool Toggling when entering text in textarea
    if (!stateManager.currentTool.selectedElement?.type !== "text")
      for (const key in toolKeys) {
        if (e.code === `Digit${key}`) {
          stateManager.setTool(toolKeys[key]);
          break;
        }
      }
  });
}
