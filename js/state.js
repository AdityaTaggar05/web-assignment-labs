import { PencilElement } from "./elements/pencil.js";
import { RectangleElement } from "./elements/rectangle.js";
import { TriangleElement } from "./elements/triangle.js";
import { CircleElement } from "./elements/circle.js";
import { EllipseElement } from "./elements/ellipse.js";
import { TextElement } from "./elements/text.js";

export class StateManager {
  constructor() {
    this.ctx = null;
    this.canvasColor = "#ffffff";
    this.currentTool = null;
    this.elements = [];
    this.undoneElements = [];

    this.loadCanvas();
    this.loadTheme();
  }

  bindContext(ctx) {
    this.ctx = ctx;
    this.render();
  }

  loadTheme() {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);

      const modes = document.getElementsByClassName("theme-mode");

      if (theme == "dark") {
        modes[1].classList.remove("active");
        modes[0].classList.add("active");
      } else {
        modes[0].classList.remove("active");
        modes[1].classList.add("active");
      }
    }
  }

  loadCanvas() {
    let storedCanvasColor = sessionStorage.getItem("canvasColor");
    if (storedCanvasColor) {
      this.canvasColor = storedCanvasColor;

      document
        .getElementById("canvas-color")
        .setAttribute("value", storedCanvasColor);
    }

    let storedElems = sessionStorage.getItem("elements");
    if (storedElems) {
      let parsedElems = JSON.parse(storedElems);

      for (const elem of parsedElems) {
        switch (elem.type) {
          case "pencil":
            this.elements.push(new PencilElement(elem.properties));
            break;
          case "rectangle":
            this.elements.push(new RectangleElement(elem.properties));
            break;
          case "triangle":
            this.elements.push(new TriangleElement(elem.properties));
            break;
          case "circle":
            this.elements.push(new CircleElement(elem.properties));
            break;
          case "ellipse":
            this.elements.push(new EllipseElement(elem.properties));
            break;
          case "text":
            this.elements.push(new TextElement(elem.properties));
            break;
        }
      }
    }
  }

  storeElements() {
    let storedElems = [];

    for (const elem of this.elements) {
      storedElems.push(elem.toJson());
    }

    sessionStorage.setItem("elements", JSON.stringify(storedElems));
  }

  setTool(tool) {
    if (this.currentTool?.selectedElement) {
      this.currentTool.selectedElement.isSelected = false;
      this.currentTool.selectedElement = null;
      this.render();
    }

    if (this.currentTool?.onDeselect) {
      this.currentTool.onDeselect();
    }

    this.currentTool = tool;

    if (this.currentTool.onSelect) {
      this.currentTool.onSelect();
    }
  }

  add(element) {
    this.elements.push(element);
    element.draw(this.ctx);
  }

  remove(element) {
    this.elements = this.elements.filter((elem) => elem !== element);
    this.undoneElements.push(element);

    console.log(this.elements, this.undoneElements);

    this.render();
    this.storeElements();
  }

  undo() {
    if (this.elements.length > 0) {
      this.undoneElements.push(this.elements.pop());
      this.render();

      this.storeElements();
    }
  }

  redo() {
    if (this.undoneElements.length > 0) {
      this.elements.push(this.undoneElements.pop());
      this.render();

      this.storeElements();
    }
  }

  clear() {
    this.elements = [];
    this.undoneElements = [];
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.storeElements();
  }

  resizeCanvas(scaleX, scaleY) {
    // TODO: Add resizing of each element

    this.render();
  }

  render() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = this.canvasColor;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    for (const element of this.elements) {
      element.draw(this.ctx);
    }
  }
}
