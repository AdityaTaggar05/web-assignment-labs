import { Element } from "./element.js";

export class EllipseElement extends Element {
  constructor(properties) {
    super(properties);
    this.type = "ellipse";
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
      ctx.ellipse(
        this.properties.x,
        this.properties.y,
        this.properties.radiusX,
        this.properties.radiusY,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
  }
}
