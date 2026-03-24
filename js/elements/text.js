import { Element } from "./element.js";

export class TextElement extends Element {
  constructor(properties) {
    super(properties);
    this.type = "text";
  }

  isTargetted(x, y, ctx) {
    const metrics = ctx.measureText(this.properties.text);
    const top = this.properties.y - metrics.actualBoundingBoxAscent;
    const bottom = this.properties.y + metrics.actualBoundingBoxDescent;

    return (
      x >= this.properties.x &&
      x <= this.properties.x + metrics.width &&
      y >= top &&
      y <= bottom
    );
  }

  draw(ctx) {
    ctx.fillStyle = this.properties.color;
    ctx.font = `${this.properties.fontSize}px ${this.properties.fontFamily}`;
    ctx.textBaseline = "top";

    ctx.fillText(this.properties.text, this.properties.x, this.properties.y);
  }
}
