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

  translate(dx, dy) {
    this.properties.x += dx;
    this.properties.y += dy;
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

    if (this.isSelected) {
      ctx.setLineDash([2, 4]);
      ctx.lineWidth = 1;
      ctx.strokeRect(
        this.properties.x - 6,
        this.properties.y - 6,
        this.properties.width + 12,
        this.properties.height + 12,
      );
      ctx.setLineDash([0, 0]);
    }
  }
}
