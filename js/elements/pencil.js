import { Element } from "./element.js";

export class PencilElement extends Element {
  constructor(properties) {
    super(properties);
    this.type = "pencil";
  }

  isTargetted(x, y, ctx) {
    ctx.beginPath();
    ctx.moveTo(this.properties.path[0][0], this.properties.path[0][1]);

    for (const point of this.properties.path.slice(1)) {
      ctx.lineTo(point[0], point[1]);
    }
    ctx.closePath();

    const rect = ctx.canvas.getBoundingClientRect();

    const scaleX = ctx.canvas.width / rect.width;
    const scaleY = ctx.canvas.height / rect.height;

    const canvasX = x * scaleX;
    const canvasY = y * scaleY;

    if (ctx.isPointInStroke(canvasX, canvasY)) return true;
    return false;
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
