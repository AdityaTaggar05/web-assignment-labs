import { Tool } from "./tool.js";
import { PencilTool } from "./pencil.js";
import { RectangleTool } from "./rectangle.js";
import { CircleTool } from "./circle.js";
import { EllipseTool } from "./ellipse.js";
import { TriangleTool } from "./triangle.js";
import { TextTool } from "./text.js";
import { renderSidebar } from "../sidebar.js";

export class SelectTool extends Tool {
  constructor(stateManager) {
    super(
      {
        selectedElement: null,
      },
      stateManager,
    );
  }

  getSidebarOptions() {
    return {
      name: "Select Tool",
      options: [],
    };
  }

  onMouseDown(e, ctx) {
    if (
      this.selectedElement &&
      !this.selectedElement.isTargetted(e.offsetX, e.offsetY, ctx)
    ) {
      this.selectedElement.isSelected = false;
      this.selectedElement = null;
      this.stateManager.render();
      renderSidebar(this);
      this.stateManager.storeElements();
      return;
    }

    this.mouseDown = true;
    for (const elem of this.stateManager.elements.toReversed()) {
      if (elem.isTargetted(e.offsetX, e.offsetY, ctx)) {
        select(elem);
      }
    }
  }

  select(elem) {
    this.selectedElement = elem;
    elem.isSelected = true;

    this.stateManager.render();

    let tool = null;
    switch (this.selectedElement.type) {
      case "pencil":
        tool = new PencilTool(this.stateManager, {
          properties: this.selectedElement.properties,
          editing: true,
        });
        break;
      case "rectangle":
        tool = new RectangleTool(this.stateManager, {
          properties: this.selectedElement.properties,
          editing: true,
        });
        break;
      case "circle":
        tool = new CircleTool(this.stateManager, {
          properties: this.selectedElement.properties,
          editing: true,
        });
        break;
      case "ellipse":
        tool = new EllipseTool(this.stateManager, {
          properties: this.selectedElement.properties,
          editing: true,
        });
        break;
      case "triangle":
        tool = new TriangleTool(this.stateManager, {
          properties: this.selectedElement.properties,
          editing: true,
        });
        break;
      case "text":
        tool = new TextTool(this.stateManager, {
          properties: this.selectedElement.properties,
          editing: true,
        });
        break;
    }

    if (tool) renderSidebar(tool);
  }

  onMouseMove(e, ctx) {
    if (this.selectedElement && this.mouseDown) {
      let dx = e.offsetX - this.x;
      let dy = e.offsetY - this.y;

      this.selectedElement.translate(dx, dy);
      this.stateManager.render();
    }

    this.x = e.offsetX;
    this.y = e.offsetY;
  }

  onMouseUp(e, ctx) {
    this.mouseDown = false;
  }
}
