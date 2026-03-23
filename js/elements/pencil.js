import { Element } from "./element.js";

export class PencilElement extends Element {
  draw(ctx) {
    // Apply styling
    ctx.strokeStyle = this.properties.strokeColor;
    ctx.lineWidth = this.properties.strokeWidth;

    ctx.beginPath();
    ctx.moveTo(this.properties.x, this.properties.y);

    for (const point of this.properties.path) {
      ctx.lineTo(point[0], point[1]);
      ctx.stroke();
    }

    ctx.closePath();
  }
}
