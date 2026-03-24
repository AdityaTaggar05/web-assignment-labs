import { Element } from "./element.js";

export class TriangleElement extends Element {
  constructor(properties) {
    super(properties);
    this.type = "triangle";
  }

  isTargetted(x, y, ctx) {
    const v0x = this.properties.path[2][0] - this.properties.path[0][0];
    const v0y = this.properties.path[2][1] - this.properties.path[0][1];
    const v1x = this.properties.path[1][0] - this.properties.path[0][0];
    const v1y = this.properties.path[1][1] - this.properties.path[0][1];
    const v2x = x - this.properties.path[0][0];
    const v2y = y - this.properties.path[0][1];

    const dot00 = v0x * v0x + v0y * v0y;
    const dot01 = v0x * v1x + v0y * v1y;
    const dot02 = v0x * v2x + v0y * v2y;
    const dot11 = v1x * v1x + v1y * v1y;
    const dot12 = v1x * v2x + v1y * v2y;

    const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);

    const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

    return u >= 0 && v >= 0 && u + v < 1;
  }

  translate(dx, dy) {
    for (let i = 0; i < this.properties.path.length; i++) {
      this.properties.path[i][0] += dx;
      this.properties.path[i][1] += dy;
    }
  }

  draw(ctx) {
    ctx.beginPath();

    ctx.strokeStyle = this.properties.strokeColor;
    ctx.fillStyle = this.properties.fillColor;
    ctx.lineWidth = this.properties.strokeWidth;
    ctx.setLineDash([0, 0]);

    ctx.moveTo(this.properties.path[0][0], this.properties.path[0][1]);
    ctx.lineTo(this.properties.path[1][0], this.properties.path[1][1]);
    ctx.lineTo(this.properties.path[2][0], this.properties.path[2][1]);

    ctx.closePath();

    ctx.stroke();

    if (this.properties.fill) ctx.fill();

    if (this.isSelected) {
      const minX = Math.min(
        this.properties.path[0][0],
        this.properties.path[1][0],
        this.properties.path[2][0],
      );
      const maxX = Math.max(
        this.properties.path[0][0],
        this.properties.path[1][0],
        this.properties.path[2][0],
      );
      const minY = Math.min(
        this.properties.path[0][1],
        this.properties.path[1][1],
        this.properties.path[2][1],
      );
      const maxY = Math.max(
        this.properties.path[0][1],
        this.properties.path[1][1],
        this.properties.path[2][1],
      );

      ctx.setLineDash([2, 4]);
      ctx.lineWidth = 1;
      console.log(minX, minY, maxX - minX, maxY - minY);
      ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
    }
  }
}
