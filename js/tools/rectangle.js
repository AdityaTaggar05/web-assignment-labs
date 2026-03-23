import { RectangleElement } from "../elements/rectangle.js";
import { Tool } from "./tool.js";

export class RectangleTool extends Tool {
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
      name: "Rectangle Tool",
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
          value: this.state.strokePicker,
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
    ctx.moveTo(this.x, this.y);
  }

  onMouseMove(e, ctx) {
    if (!this.isDrawing) return;
  }

  onMouseUp(e, ctx) {
    this.isDrawing = false;

    let element = new RectangleElement(this.state);
    element.properties.width = Math.abs(e.offsetX - this.x);
    element.properties.height = Math.abs(e.offsetY - this.y);
    element.properties.x = Math.min(e.offsetX, this.x);
    element.properties.y = Math.min(e.offsetY, this.y);

    this.stateManager.add(element);
  }
}
