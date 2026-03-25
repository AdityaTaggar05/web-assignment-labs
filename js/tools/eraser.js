import { Tool } from "./tool.js";

export class EraserTool extends Tool {
  constructor(stateManager) {
    super({}, stateManager);
  }

  onMouseDown(e, ctx) {
    this.isErasing = true;
  }

  onMouseMove(e, ctx) {
    if (!this.isErasing) return;

    for (const elem of this.stateManager.elements.toReversed()) {
      if (elem.isTargetted(e.offsetX, e.offsetY)) {
        this.stateManager.remove(elem);
        break;
      }
    }
  }

  onMouseUp(e, ctx) {
    this.isErasing = false;
  }
}
