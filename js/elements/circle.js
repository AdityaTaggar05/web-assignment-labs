import { Element } from "./element.js";

export class CircleElement extends Element {
  constructor(properties) {
    super(properties);
    this.type = "circle";
  }

  draw(ctx) {
    ctx.beginPath();

    if (this.properties.strokeWidth > 0) {
      ctx.lineWidth = this.properties.strokeWidth;
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
      ctx.arc(
        this.properties.x,
        this.properties.y,
        this.properties.radius,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
  }
}
