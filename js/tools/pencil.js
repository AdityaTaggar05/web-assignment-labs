import { Tool } from "../tool.js";

export class PencilTool extends Tool {
  constructor(state) {
    super(state);
    this.isDrawing = false;
  }

  getSidebarOptions() {
    return `
    <div class="option">
      <label>Stroke Width:</label>
      <input type="range" id="strokeWidth" min="1" max="8" class="slider"/>
      <div class="tooltip" id="tooltip">1</div>
    </div>
    `;
  }

  onMouseDown(e, ctx) {
    this.isDrawing = true;

    // Apply styling
    ctx.strokeStyle = this.state.strokeColor;
    ctx.lineWidth = this.state.strokeWidth;

    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  }

  onMouseMove(e, ctx) {
    if (!this.isDrawing) return;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }

  onMouseUp(_, __) {
    this.isDrawing = false;
  }
}
