import { PencilElement } from "./elements/pencil.js";
import { RectangleElement } from "./elements/rectangle.js";
import { TriangleElement } from "./elements/triangle.js";
import { CircleElement } from "./elements/circle.js";
import { EllipseElement } from "./elements/ellipse.js";
import { TextElement } from "./elements/text.js";
import { SelectTool } from "./tools/select.js";
import { selectTool } from "../components/toolbar/toolbar.js";

export class StateManager {
  constructor() {
    this.ctx = null;
    this.canvasColor = "#ffffff";
    this.currentTool = null;
    this.elements = [];

    this.history = [];
    this.redoStack = [];

    this.loadTheme();
    this.loadCanvas();
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
    }

    document
      .getElementById("canvas-color")
      .setAttribute("value", this.canvasColor);

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

    this.history.push({
      operation: "add",
      index: this.elements.length - 1,
    });
    this.redoStack = [];

    this.storeElements();
  }

  selectLastElement() {
    this.currentTool = new SelectTool(this, this.elements.length - 1);
    selectTool(
      document.querySelector(".tool[data-action='select']"),
      document.querySelectorAll(".tool"),
    );
    this.currentTool.select(-1);
  }

  remove(element) {
    const index = this.elements.indexOf(element);

    if (index != -1) {
      this.elements.splice(index, 1);

      this.history.push({
        operation: "remove",
        element: element,
        index: index,
      });
      this.redoStack = [];

      this.render();
      this.storeElements();
    }
  }

  undo() {
    if (this.history.length > 0) {
      const state = this.history.pop();
      this.redoStack.push(state);

      switch (state.operation) {
        case "remove":
          this.elements.splice(state.index, 0, state.element);
          break;
        case "add":
          this.redoStack.at(-1).element = this.elements.at(state.index);
          this.elements.splice(state.index, 1);
          break;
        case "clear":
          this.elements = [...state.elements];
          delete this.redoStack.at(-1).elements;
          break;
        case "change":
          for (const key in state.changes) {
            const change = state.changes[key];
            this.elements[state.index].properties[key] = change.old;
          }
          break;
      }

      this.render();
      this.storeElements();
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      const state = this.redoStack.pop();
      this.history.push(state);

      switch (state.operation) {
        case "remove":
          this.elements.splice(state.index, 1);
          break;
        case "add":
          this.elements.splice(state.index, 0, state.element);
          delete this.history.at(-1).element;
          break;
        case "clear":
          this.clear();
          break;
        case "change":
          for (const key in state.changes) {
            const change = state.changes[key];
            this.elements[state.index].properties[key] = change.new;
          }
          break;
      }

      this.render();
      this.storeElements();
    }
  }

  clear() {
    this.history.push({
      operation: "clear",
      elements: [...this.elements],
    });

    this.redoStack = [];
    this.elements = [];

    this.render();
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
