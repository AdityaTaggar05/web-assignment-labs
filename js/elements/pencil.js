import { Element } from "./element.js";

export class PencilElement extends Element {
  constructor(properties) {
    super(properties);
    this.type = "pencil";
    this.computeEdges = true;
    this.minX = this.maxX = this.minY = this.maxY = null;
  }

  isTargetted(x, y, ctx) {
    if (this.isSelected) {
      return (
        x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY
      );
    }

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

  translate(dx, dy) {
    for (let i = 0; i < this.properties.path.length; i++) {
      this.properties.path[i][0] += dx;
      this.properties.path[i][1] += dy;
    }

    this.computeEdges = true;
  }

  draw(ctx) {
    // Apply styling
    ctx.strokeStyle = this.properties.strokeColor;
    ctx.lineWidth = this.properties.strokeWidth;

    if (this.properties.path.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(this.properties.path[0][0], this.properties.path[0][1]);

    if (this.computeEdges) {
      this.minX = this.properties.path[0][0];
      this.minY = this.properties.path[0][1];
      this.maxX = this.properties.path[0][0];
      this.maxY = this.properties.path[0][1];
    }

    for (let i = 1; i < this.properties.path.length - 1; i++) {
      const midX =
        (this.properties.path[i][0] + this.properties.path[i + 1][0]) / 2;
      const midY =
        (this.properties.path[i][1] + this.properties.path[i + 1][1]) / 2;

      ctx.quadraticCurveTo(
        this.properties.path[i][0],
        this.properties.path[i][1],
        midX,
        midY,
      );

      if (this.computeEdges) {
        if (this.properties.path[i][0] < this.minX) {
          this.minX = this.properties.path[i][0];
        } else if (this.properties.path[i][0] > this.maxX) {
          this.maxX = this.properties.path[i][0];
        }

        if (this.properties.path[i][1] < this.minY) {
          this.minY = this.properties.path[i][1];
        } else if (this.properties.path[i][1] > this.maxY) {
          this.maxY = this.properties.path[i][1];
        }
      }
    }

    if (this.computeEdges) this.computeEdges = false;

    ctx.stroke();

    if (this.isSelected) {
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.strokeRect(
        this.minX,
        this.minY,
        this.maxX - this.minX,
        this.maxY - this.minY,
      );
      ctx.setLineDash([0, 0]);
    }
  }
}
