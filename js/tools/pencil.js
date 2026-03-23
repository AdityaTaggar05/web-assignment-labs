import { Tool } from "./tool.js";

export class PencilTool extends Tool {
  constructor() {
    super({
      strokeColor: "#000000",
      strokeWidth: 5,
    });
    this.isDrawing = false;
  }

  getSidebarOptions() {
    return {
      name: "Pencil Tool",
      options: [
        {
          label: "Stroke Width:",
          type: "range",
          id: "strokeWidth",
          min: 0,
          max: 10,
          value: this.state.strokeWidth,
        },
        {
          label: "Stroke Color:",
          type: "color",
          id: "strokePicker",
          value: this.state.strokeColor,
        },
      ],
    };
  }

  bindSidebarEvents() {
    const strokeWidth = document.getElementById("strokeWidth");
    strokeWidth.addEventListener("input", (e) => {
      this.state.strokeWidth = Number(e.target.value);
    });

    const strokePicker = document.getElementById("strokePicker");
    strokePicker.addEventListener("input", (e) => {
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
