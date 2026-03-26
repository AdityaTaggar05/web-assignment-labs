import { PencilElement } from "../elements/pencil.js";
import { Tool } from "./tool.js";

const MIN_DIST = 2;

export class PencilTool extends Tool {
  constructor(stateManager, { properties, editing } = {}) {
    super(
      properties ?? {
        strokeColor: "#000000",
        strokeWidth: 5,
      },
      stateManager,
      editing,
    );
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

      if (this.editing) this.stateManager.render();
    });

    const strokePicker = document.getElementById("strokePicker");
    strokePicker.addEventListener("input", (e) => {
      this.state.strokeColor = e.target.value;

      if (this.editing) this.stateManager.render();
    });
  }

  onMouseDown(e, ctx) {
    this.isDrawing = true;

    this.preview = new PencilElement({ ...this.state });
    this.preview.properties.path = [[e.offsetX, e.offsetY]];

    ctx.strokeStyle = this.state.strokeColor;
    ctx.lineWidth = this.state.strokeWidth;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  }

  onMouseMove(e, ctx) {
    if (!this.isDrawing) return;

    const x = e.offsetX;
    const y = e.offsetY;

    const last = this.preview.properties.path.at(-1);
    if (!last) return;

    const dx = x - last[0];
    const dy = y - last[1];

    if (dx * dx + dy * dy < MIN_DIST * MIN_DIST) return;

    this.preview.properties.path.push([x, y]);

    ctx.lineTo(x, y);
    ctx.stroke();
  }

  onMouseUp(_, __) {
    this.isDrawing = false;

    this.stateManager.render();
    this.stateManager.add(this.preview);
    this.stateManager.storeElements();

    this.preview = null;

    this.stateManager.selectLastElement();
  }
}
