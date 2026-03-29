import { Tool } from "./tool.js";
import { TextElement } from "../elements/text.js";

export class TextTool extends Tool {
  constructor(stateManager, { properties, editing } = {}) {
    super(
      properties ?? {
        color: "#000000",
        fontSize: 16,
        fontFamily: "Kode Mono",
      },
      stateManager,
      editing,
    );
    this.isDrawing = false;
  }

  getSidebarOptions() {
    return {
      name: "Text Tool",
      options: [
        {
          label: "Color:",
          id: "colorPicker",
          type: "color",
          value: this.state.color,
        },
        {
          label: "Font Size:",
          id: "fontSize",
          type: "range",
          min: 1,
          max: 40,
          value: this.state.fontSize,
        },
      ],
    };
  }

  bindSidebarEvents() {
    const colorPicker = document.querySelector("#colorPicker");
    colorPicker.addEventListener("input", (e) => {
      this.state.color = e.target.value;

      if (this.editing) this.stateManager.render();
    });

    const fontSize = document.querySelector("#fontSize");
    fontSize.addEventListener("input", (e) => {
      this.state.fontSize = Number(e.target.value);

      if (this.editing) this.stateManager.render();
    });
  }

  changeText(x, y, ctx) {
    const value = this.input.value.trim();

    if (value !== "") {
      this.state.text = value;

      if (!this.editing) {
        let element = new TextElement({ ...this.state });
        const metrics = ctx.measureText(value);

        element.properties.x = x;
        element.properties.y = y - metrics.actualBoundingBoxAscent;
        element.properties.text = value;

        element.properties.width = metrics.width;
        element.properties.height =
          metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        this.stateManager.add(element);
        this.stateManager.selectLastElement();
      } else {
        this.editing.hidden = false;

        const metrics = ctx.measureText(value);

        this.editing.properties.width = Math.max(
          this.editing.properties.width,
          metrics.width,
        );
        this.editing.properties.height = Math.max(
          this.editing.properties.height,
          this.state.fontSize,
        );

        this.stateManager.render();
      }

      this.stateManager.storeElements();
    }

    this.input.remove();
    this.input = null;
    this.isDrawing = false;
  }

  createTextArea(x, y, ctx, { text } = {}) {
    const rect = ctx.canvas.getBoundingClientRect();
    const textarea = document.createElement("textarea");

    if (text) textarea.value = text;
    textarea.style.position = "absolute";
    textarea.style.left = `${x + rect.left}px`;
    textarea.style.top = `${y}px`;
    textarea.style.fontSize = `${this.state.fontSize}px`;
    textarea.style.fontFamily = this.state.fontFamily;
    textarea.style.color = this.state.color;
    textarea.style.border = "1px dashed #aaa";
    textarea.style.background = "transparent";
    textarea.style.outline = "none";
    textarea.style.resize = "none";
    textarea.style.zIndex = "10";

    document.querySelector(".workspace").appendChild(textarea);

    setTimeout(() => textarea.focus(), 0);

    this.input = textarea;

    textarea.addEventListener("blur", () => {
      this.changeText(x, y, ctx);
    });
  }

  onMouseDown(e, ctx) {
    if (this.isDrawing) return;

    this.isDrawing = true;

    this.createTextArea(e.offsetX, e.offsetY, ctx);
  }
}
