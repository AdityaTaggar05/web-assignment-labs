import { Tool } from "./tool.js";

export class SelectTool extends Tool {
  constructor(stateManager) {
    super(
      {
        selectedElement: null,
      },
      stateManager,
    );
  }

  getSidebarOptions() {
    return {
      name: "Select Tool",
      options: [],
    };
  }

  onMouseDown(e, ctx) {
    if (this.selectedElement) {
      this.selectedElement = null;
      this.stateManager.storeElements();
      return;
    }

    for (const elem of this.stateManager.elements.toReversed()) {
      if (elem.isTargetted(e.offsetX, e.offsetY, ctx)) {
        this.selectedElement = elem;
      }
    }
  }

  onMouseMove(e, ctx) {
    if (this.selectedElement) {
      let dx = e.offsetX - this.x;
      let dy = e.offsetY - this.y;

      this.selectedElement.translate(dx, dy);
      this.stateManager.render();
    }

    this.x = e.offsetX;
    this.y = e.offsetY;
  }
}
