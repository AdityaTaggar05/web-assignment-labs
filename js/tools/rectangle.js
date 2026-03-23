import { Tool } from "../tool.js";

export class RectangleTool extends Tool {
  constructor() {
    super({
      strokeColor: "#000000",
      fill: false,
      fillColor: "#ffffff",
      strokeWidth: 5,
      strokeStyle: "solid",
    });
    this.isDrawing = false;
  }

  getSidebarOptions() {
    return `
      <h3>Rectangle Tool</h3>
    `;
  }

  onMouseDown(e, ctx) {
    this.isDrawing = true;

    this.x = e.offsetX;
    this.y = e.offsetY;
    ctx.moveTo(this.x, this.y);
  }

  onMouseMove(e, ctx) {
    if (!this.isDrawing) return;
  }

  onMouseUp(e, ctx) {
    this.isDrawing = false;

    if (this.state.fill) {
      ctx.fillStyle = this.state.fillColor;
      ctx.fillRect(this.x, this.y, e.offsetX - this.x, e.offsetY - this.y);
    } else {
      ctx.strokeStyle = this.state.strokeColor;
      ctx.strokeRect(this.x, this.y, e.offsetX - this.x, e.offsetY - this.y);
    }
  }
}
