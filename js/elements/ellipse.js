import { Element } from "./element.js";

export class EllipseElement extends Element {
  constructor(properties) {
    super(properties);
    this.type = "ellipse";
  }

  isTargetted(x, y, ctx) {
    const dx = (x - this.properties.x) / this.properties.radiusX;
    const dy = (y - this.properties.y) / this.properties.radiusY;

    return dx * dx + dy * dy <= 1;
  }

  translate(dx, dy) {
    this.properties.x += dx;
    this.properties.y += dy;
  }

  draw(ctx) {
    ctx.beginPath();

    if (this.properties.strokeWidth > 0) {
      ctx.lineWidth = this.properties.strokeWidth;
      ctx.strokeStyle = this.properties.strokeColor;
      ctx.ellipse(
        this.properties.x,
        this.properties.y,
        this.properties.radiusX,
        this.properties.radiusY,
        0,
        0,
        Math.PI * 2,
      );
      ctx.stroke();
    }

    if (this.properties.fill) {
      ctx.fillStyle = this.properties.fillColor;
      ctx.fill();
    }

    ctx.closePath();

    if (this.isSelected) {
      ctx.beginPath();
      ctx.setLineDash([2, 4]);
      ctx.lineWidth = 1;
      ctx.ellipse(
        this.properties.x,
        this.properties.y,
        this.properties.radiusX + 8,
        this.properties.radiusY + 8,
        0,
        0,
        Math.PI * 2,
      );
      ctx.stroke();
      ctx.closePath();
      ctx.setLineDash([0, 0]);
    }
  }
}
