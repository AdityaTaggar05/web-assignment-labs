import { Element } from "./element.js";

export class RectangleElement extends Element {
  constructor(properties) {
    super(properties);
    this.type = "rectangle";
  }

  isTargetted(x, y, ctx) {
    if (
      x > this.properties.x &&
      x < this.properties.x + this.properties.width &&
      y > this.properties.y &&
      y < this.properties.y + this.properties.height
    )
      return true;
    return false;
  }

  draw(ctx) {
    if (this.properties.strokeWidth > 0) {
      ctx.lineWidth = this.properties.strokeWidth;
      ctx.strokeStyle = this.properties.strokeColor;
      ctx.strokeRect(
        this.properties.x,
        this.properties.y,
        this.properties.width,
        this.properties.height,
      );
    }

    if (this.properties.fill) {
      ctx.fillStyle = this.properties.fillColor;

      ctx.fillRect(
        this.properties.x + this.properties.strokeWidth / 2,
        this.properties.y + this.properties.strokeWidth / 2,
        this.properties.width - this.properties.strokeWidth,
        this.properties.height - this.properties.strokeWidth,
      );
    }
  }
}
