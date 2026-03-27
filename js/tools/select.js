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
    this.tool = null;
    this.selectedElement = null;
    this.selectedIndex = null;
    this.doubleClick = false;
  }

  getSidebarOptions() {
    return {
      name: "Select Tool",
      options: [],
    };
  }

  reset() {
    this.tool = null;
    this.doubleClick = false;
    this.selectedElement.isSelected = false;
    this.selectedElement = null;
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

      this.reset();
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
    this.mouseDown = true;
    if (this.selectedElement) {
      this.doubleClick = true;

      if (!this.selectedElement.isTargetted(e.offsetX, e.offsetY, ctx)) {
        this.onDeselect();
      } else {
        return;
      }
    }

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

    this.tool = null;
    switch (this.selectedElement.type) {
      case "pencil":
        this.tool = new PencilTool(this.stateManager, {
          properties: this.selectedElement.properties,
          editing: true,
        });
        break;
      case "rectangle":
        this.tool = new RectangleTool(this.stateManager, {
          properties: this.selectedElement.properties,
          editing: true,
        });
        break;
      case "circle":
        this.tool = new CircleTool(this.stateManager, {
          properties: this.selectedElement.properties,
          editing: true,
        });
        break;
      case "ellipse":
        this.tool = new EllipseTool(this.stateManager, {
          properties: this.selectedElement.properties,
          editing: true,
        });
        break;
      case "triangle":
        this.tool = new TriangleTool(this.stateManager, {
          properties: this.selectedElement.properties,
          editing: true,
        });
        break;
      case "text":
        this.tool = new TextTool(this.stateManager, {
          properties: this.selectedElement.properties,
          editing: this.selectedElement,
        });
        break;
    }

    if (this.tool) renderSidebar(this.tool);
  }

  onMouseMove(e, ctx) {
    if (this.selectedElement && this.mouseDown) {
      let dx = e.offsetX - this.x;
      let dy = e.offsetY - this.y;

      this.selectedElement.translate(dx, dy);
      this.stateManager.render();

      if (this.doubleClick) this.doubleClick = false;
    }

    this.x = e.offsetX;
    this.y = e.offsetY;
  }

  onMouseUp(e, ctx) {
    this.mouseDown = false;

    if (this.doubleClick) {
      this.doubleClick = false;

      if (
        this.selectedElement.type == "text" &&
        this.selectedElement.isTargetted(e.offsetX, e.offsetY, ctx)
      ) {
        this.selectedElement.hidden = true;
        this.stateManager.render();
        this.tool.createTextArea(
          this.selectedElement.properties.x,
          this.selectedElement.properties.y,
          ctx,
          { text: this.selectedElement.properties.text },
        );
      }
    }
  }
}
