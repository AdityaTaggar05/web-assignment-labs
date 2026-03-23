import { Tool } from "../tool.js";

export class PencilTool extends Tool {
  constructor() {
    super({
      strokeColor: "#000000",
      strokeWidth: 5,
    });
    this.isDrawing = false;
  }

  getSidebarOptions() {
    return `
      <h3>Pencil Tool</h3>
      <div class="option">
        <label>Stroke Width:</label>
        <input type="range" id="strokeWidth" min="1" max="8" class="slider"/>
        <div class="tooltip" id="tooltip">1</div>
      </div>
      <div class="option">
        <label>Stroke Color:</label>
        <input type="color" id="colorPicker" />
      </div>
    `;
  }

  bindSidebarEvents() {
    const strokeWidth = document.getElementById("strokeWidth");
    strokeWidth.addEventListener("input", (e) => {
      this.state.strokeWidth = Number(e.target.value);
    });

    const colorPicker = document.getElementById("colorPicker");
    colorPicker.addEventListener("input", (e) => {
      this.state.strokeColor = e.target.value;
    });
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
