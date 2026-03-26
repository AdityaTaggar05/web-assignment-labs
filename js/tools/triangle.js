import { Tool } from "./tool.js";
import { TrianglePreviewElement } from "../elements/triangle_preview.js";
import { TriangleElement } from "../elements/triangle.js";

export class TriangleTool extends Tool {
  constructor(stateManager, { properties, editing } = {}) {
    super(
      properties ?? {
        fill: false,
        fillColor: "#000000",
        strokeColor: "#000000",
        strokeWidth: 3,
      },
      stateManager,
      editing,
    );
    this.isDrawing = false;
    this.path = [];
  }

  onUndo() {
    this.path.pop();

    if (this.path.length == 0) {
      this.isDrawing = false;
      this.preview = null;
    } else {
      this.stateManager.add(this.preview);
    }
  }

  getSidebarOptions() {
    return {
      name: "Triangle Tool",
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
          label: "Stroke Color",
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

      if (this.editing) this.stateManager.render();
    });

    const fillPicker = document.querySelector("#fillPicker");
    fillPicker.addEventListener("input", (e) => {
      this.state.fillColor = e.target.value;

      if (this.editing) this.stateManager.render();
    });

    const strokePicker = document.querySelector("#strokePicker");
    strokePicker.addEventListener("input", (e) => {
      this.state.strokeColor = e.target.value;

      if (this.editing) this.stateManager.render();
    });

    const strokeWidth = document.querySelector("#strokeWidth");
    strokeWidth.addEventListener("input", (e) => {
      this.state.strokeWidth = e.target.value;

      if (this.editing) this.stateManager.render();
    });
  }

  onMouseDown(e, ctx) {
    this.isDrawing = true;

    this.path.push([e.offsetX, e.offsetY]);

    if (this.path.length == 1) {
      this.path.push([e.offsetX, e.offsetY]);
      this.preview = new TrianglePreviewElement({ ...this.state });
      this.preview.properties.path = this.path;
    } else {
      this.stateManager.undo();
    }

    this.stateManager.add(this.preview);
  }

  onMouseMove(e, ctx) {
    if (!this.isDrawing) return;

    this.path[this.path.length - 1] = [e.offsetX, e.offsetY];
    this.stateManager.render();
  }

  onMouseUp(e, ctx) {
    this.isDrawing = false;

    if (
      this.path[0][0] == this.path[1][0] &&
      this.path[0][1] == this.path[1][1]
    ) {
      this.path.pop();
      this.stateManager.render();
    }

    if (this.path.length == 3) {
      let element = new TriangleElement({ ...this.state });
      element.properties.path = [...this.path];

      this.path = [];
      this.preview = null;

      this.stateManager.undo();
      this.stateManager.add(element);
      this.stateManager.storeElements();

      this.stateManager.selectLastElement();
    }
  }
}
