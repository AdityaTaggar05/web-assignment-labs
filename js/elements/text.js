import { Element } from "./element.js";

export class TextElement extends Element {
  constructor(properties) {
    super(properties);
    this.type = "text";
  }

  draw(ctx) {
    ctx.fillStyle = this.properties.color;
    ctx.font = `${this.properties.fontSize}px ${this.properties.fontFamily}`;
    ctx.textBaseline = "top";

    ctx.fillText(this.properties.text, this.properties.x, this.properties.y);
  }
}
