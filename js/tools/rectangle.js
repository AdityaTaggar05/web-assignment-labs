import { Tool } from "../tool.js";

export class RectangleTool extends Tool {
  constructor() {
    super({
      strokeColor: "#000000",
      fill: false,
      fillColor: "#000000",
      strokeWidth: 5,
      strokeStyle: "solid",
    });
    this.isDrawing = false;
  }

  getSidebarOptions() {
    return `
      <h3>Rectangle Tool</h3>

      <div class="option">
        <label>Fill:</label>
        <input type="checkbox" id="fillToggle" />
      </div>
      <div class="option">
        <label>Fill Color:</label>
        <input type="color" id="fillPicker" />
      </div>
      <div class="option">
        <label>Stroke Width:</label>
        <input type="range" id="strokeWidth" min="0" max="10" value="5" />
        <div class="tooltip"></div>
      </div>
      <div class="option">
        <label>Stroke Color:</label>
        <input type="color" id="strokePicker" />
      </div>
    `;
  }

  bindSidebarEvents() {
    const fillToggle = document.querySelector("#fillToggle");
    fillToggle.addEventListener("input", (e) => {
      this.state.fill = e.currentTarget.checked;
    });
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

    ctx.strokeStyle = this.state.strokeColor;
    ctx.strokeRect(this.x, this.y, e.offsetX - this.x, e.offsetY - this.y);

    if (this.state.fill) {
      ctx.fillStyle = this.state.fillColor;
      ctx.fillRect(this.x, this.y, e.offsetX - this.x, e.offsetY - this.y);
    }
  }
}
