import { Element } from "./element.js";

export class CircleElement extends Element {
  constructor(properties) {
    super(properties);
    this.type = "circle";
  }

  isTargetted(x, y, ctx) {
    const dx = (x - this.properties.x) / this.properties.radius;
    const dy = (y - this.properties.y) / this.properties.radius;

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
      ctx.setLineDash([0, 0]);
      ctx.strokeStyle = this.properties.strokeColor;
      ctx.arc(
        this.properties.x,
        this.properties.y,
        this.properties.radius,
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
      ctx.setLineDash([1, 6]);
      ctx.lineWidth = 1;
      ctx.arc(
        this.properties.x,
        this.properties.y,
        this.properties.radius * 1.1,
        0,
        Math.PI * 2,
      );
      ctx.stroke();
      ctx.closePath();
    }
  }
}
