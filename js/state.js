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
    element.draw(this.ctx);
  }

  undo() {
    if (this.elements.length > 0) {
      this.undoneElements.push(this.elements.pop());
      this.render();
    }
  }

  redo() {
    if (this.undoneElements.length > 0) {
      this.elements.push(this.undoneElements.pop());
      this.render();
    }
  }

  resizeCanvas(scaleX, scaleY) {
    // TODO: Add resizing of each element

    this.render();
  }

  render() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (const element of this.elements) {
      element.draw(this.ctx);
    }
  }
}
