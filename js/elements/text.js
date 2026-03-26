import { Element } from "./element.js";

export class TextElement extends Element {
  constructor(properties) {
    super(properties);
    this.type = "text";
  }

  isTargetted(x, y, ctx) {
    const metrics = ctx.measureText(this.properties.text);
    const top = this.properties.y - metrics.actualBoundingBoxAscent;
    const bottom = this.properties.y + metrics.actualBoundingBoxDescent;
    const left = this.properties.x;
    const right = this.properties.x + metrics.width;

    return x >= left && x <= right && y >= top && y <= bottom;
  }

  translate(dx, dy) {
    this.properties.x += dx;
    this.properties.y += dy;
  }

  draw(ctx) {
    ctx.fillStyle = this.properties.color;
    ctx.font = `${this.properties.fontSize}px ${this.properties.fontFamily}`;
    ctx.textBaseline = "top";

    ctx.fillText(this.properties.text, this.properties.x, this.properties.y);

    if (this.isSelected) {
      const metrics = ctx.measureText(this.properties.text);
      const top = this.properties.y - metrics.actualBoundingBoxAscent;
      const bottom = this.properties.y + metrics.actualBoundingBoxDescent;
      const left = this.properties.x;
      const right = this.properties.x + metrics.width;
      const padding = 8;

      ctx.strokeStyle = this.properties.color;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);

      ctx.strokeRect(
        left - padding,
        top - padding,
        right - left + 2 * padding,
        bottom - top + 2 * padding,
      );
    }
  }
}
