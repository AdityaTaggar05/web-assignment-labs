import { Tool } from "./tool.js";
import { CircleElement } from "../elements/circle.js";

export class CircleTool extends Tool {
  constructor(stateManager) {
    super(
      {
        strokeColor: "#000000",
        fill: false,
        fillColor: "#000000",
        strokeWidth: 5,
        strokeStyle: "solid",
      },
      stateManager,
    );
    this.isDrawing = false;
  }

  getSidebarOptions() {
    return {
      name: "Circle Tool",
      options: [
        {
          label: "Fill:",
          type: "checkbox",
          id: "fillToggle",
          value: this.state.fill,
        },
        {
          label: "Fill Color:",
          type: "color",
          id: "fillPicker",
          value: this.state.fillColor,
        },
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
    const fillToggle = document.querySelector("#fillToggle");
    fillToggle.addEventListener("input", (e) => {
      this.state.fill = e.currentTarget.checked;
    });

    const fillPicker = document.querySelector("#fillPicker");
    fillPicker.addEventListener("input", (e) => {
      this.state.fillColor = e.target.value;
    });

    const strokePicker = document.querySelector("#strokePicker");
    strokePicker.addEventListener("input", (e) => {
      this.state.strokeColor = e.target.value;
    });

    const strokeWidth = document.querySelector("#strokeWidth");
    strokeWidth.addEventListener("input", (e) => {
      this.state.strokeWidth = e.target.value;
    });
  }

  onMouseDown(e, ctx) {
    this.isDrawing = true;

    this.x = e.offsetX;
    this.y = e.offsetY;

    this.preview = new CircleElement({ ...this.state });
    this.preview.properties.x = e.offsetX;
    this.preview.properties.y = e.offsetY;
    this.stateManager.add(this.preview);
  }

  onMouseMove(e, ctx) {
    if (!this.isDrawing) return;

    this.stateManager.undo();
    this.preview.properties.radius = Math.sqrt(
      Math.pow(this.x - e.offsetX, 2) + Math.pow(this.y - e.offsetY, 2),
    );
    this.stateManager.add(this.preview);
  }

  onMouseUp(e, ctx) {
    this.isDrawing = false;

    if (e.offsetX == this.x && e.offsetY == this.y) this.stateManager.undo();
  }
}
