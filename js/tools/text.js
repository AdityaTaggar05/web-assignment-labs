import { Tool } from "./tool.js";
import { TextElement } from "../elements/text.js";

export class TextTool extends Tool {
  constructor(stateManager) {
    super(
      {
        color: "#000000",
        fontSize: 16,
        fontFamily: "Kode Mono",
      },
      stateManager,
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
    });

    const fontSize = document.querySelector("#fontSize");
    fontSize.addEventListener("input", (e) => {
      this.state.fontSize = Number(e.target.value);
    });
  }

  changeText(x, y) {
    const value = this.input.value.trim();

    if (value !== "") {
      let element = new TextElement({ ...this.state });
      element.properties.x = x;
      element.properties.y = y;
      element.properties.text = value;

      this.stateManager.add(element);
    }

    this.input.remove();
    this.input = null;
    this.isDrawing = false;
  }

  onMouseDown(e, ctx) {
    if (this.isDrawing) return;

    this.isDrawing = true;

    const rect = ctx.canvas.getBoundingClientRect();
    const textarea = document.createElement("textarea");

    textarea.style.position = "absolute";
    textarea.style.left = `${e.offsetX + rect.left}px`;
    textarea.style.top = `${e.offsetY}px`;
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
      this.changeText(e.offsetX, e.offsetY);
    });
  }
}
