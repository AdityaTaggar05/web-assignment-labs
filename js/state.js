export class StateManager {
  constructor() {
    this.ctx = null;
    this.currentTool = null;
    this.elements = [];
    this.undoneElements = [];
  }

  bindContext(ctx) {
    this.ctx = ctx;
  }

  setTool(tool) {
    if (this.currentTool?.onDeselect) {
      this.currentTool.onDeselect();
    }

    this.currentTool = tool;

    if (this.currentTool.onSelect) {
      this.currentTool.onSelect();
    }
  }

  add(element) {
    this.elements.push(element);
  }

  undo() {
    if (this.elements.length > 0) {
      this.undoneElements.push(this.elements.pop());
    }
  }

  redo() {
    if (this.undoneElements.length > 0) {
      this.elements.push(this.undoneElements.pop());
    }
  }

  render() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const element of this.elements.toReversed()) {
      element.draw();
    }
  }
}
