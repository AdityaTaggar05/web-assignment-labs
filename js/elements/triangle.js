import { Element } from "./element.js";

export class TriangleElement extends Element {
  draw(ctx) {
    ctx.beginPath();

    ctx.strokeStyle = this.properties.strokeColor;
    ctx.fillStyle = this.properties.fillColor;
    ctx.lineWidth = this.properties.strokeWidth;

    ctx.moveTo(this.properties.path[0][0], this.properties.path[0][1]);
    ctx.lineTo(this.properties.path[1][0], this.properties.path[1][1]);
    ctx.lineTo(this.properties.path[2][0], this.properties.path[2][1]);

    ctx.closePath();

    ctx.stroke();

    if (this.properties.fill) ctx.fill();
  }
}
