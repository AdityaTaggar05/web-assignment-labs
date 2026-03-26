import { PencilElement } from "../elements/pencil.js";
import { Tool } from "./tool.js";

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
    this.preview.properties.path = [e.offsetX, e.offsetY];
    this.stateManager.add(this.preview);
  }

  onMouseMove(e, ctx) {
    if (!this.isDrawing) return;

    this.preview.properties.path.push([e.offsetX, e.offsetY]);
    this.stateManager.render();
  }

  onMouseUp(_, __) {
    this.isDrawing = false;
    this.stateManager.storeElements();
  }
}
