import { Element } from "./element.js";

export class TrianglePreviewElement extends Element {
  draw(ctx) {
    // Apply styling
    ctx.strokeStyle = this.properties.strokeColor;
    if (this.properties.fill) ctx.fillStyle = this.properties.fillColor;
    ctx.lineWidth = this.properties.strokeWidth;

    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    for (const point of this.properties.path) {
      ctx.arc(point[0], point[1], 5, 0, 2 * Math.PI);
    }
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(this.properties.path[0][0], this.properties.path[0][1]);

    for (const point of this.properties.path.slice(1)) {
      ctx.lineTo(point[0], point[1]);
      ctx.stroke();
    }
    ctx.closePath();
    ctx.globalAlpha = 1;
  }
}
