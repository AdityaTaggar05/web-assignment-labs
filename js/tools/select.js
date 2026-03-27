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
    super({}, stateManager);
    this.selectedElement = null;
    this.selectedIndex = null;
  }

  getSidebarOptions() {
    return {
      name: "Select Tool",
      options: [],
    };
  }

  onDeselect() {
    if (this.selectedElement) {
      let changes = {};

      for (const key in this.selectedElement.properties) {
        if (this.lastProperties[key] !== this.selectedElement.properties[key]) {
          changes[key] = {
            old: this.lastProperties[key],
            new: this.selectedElement.properties[key],
          };
        }
      }

      this.selectedElement.isSelected = false;
      this.selectedElement = null;
      this.stateManager.render();
      renderSidebar(this);

      if (Object.keys(changes).length > 0) {
        this.stateManager.history.push({
          operation: "change",
          index: this.selectedIndex,
          changes: changes,
        });
        this.stateManager.storeElements();
      }
      this.selectedIndex = null;
    }
  }

  onMouseDown(e, ctx) {
    if (
      this.selectedElement &&
      !this.selectedElement.isTargetted(e.offsetX, e.offsetY, ctx)
    )
      this.onDeselect();

    this.mouseDown = true;
    for (let i = this.stateManager.elements.length - 1; i >= 0; i--) {
      const elem = this.stateManager.elements[i];
      if (elem.isTargetted(e.offsetX, e.offsetY, ctx)) {
        this.select(i);
      }
    }
  }

  select(index) {
    this.selectedElement = this.stateManager.elements.at(index);
    this.selectedIndex = index;
    this.selectedElement.isSelected = true;

    this.lastProperties = { ...this.selectedElement.properties };

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
