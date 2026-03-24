import { Element } from "./element.js";

export class PencilElement extends Element {
  constructor(properties) {
    super(properties);
    this.type = "pencil";
  }

  draw(ctx) {
    // Apply styling
    ctx.strokeStyle = this.properties.strokeColor;
    ctx.lineWidth = this.properties.strokeWidth;

    ctx.beginPath();
    ctx.moveTo(this.properties.path[0][0], this.properties.path[0][1]);

    for (const point of this.properties.path.slice(1)) {
      ctx.lineTo(point[0], point[1]);
      ctx.stroke();
    }

    ctx.closePath();
  }
}
