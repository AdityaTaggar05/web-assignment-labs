import { Element } from "./element.js";

export class TextElement extends Element {
  constructor(properties) {
    super(properties);
    this.type = "text";
  }

  isTargetted(x, y, ctx) {
    ctx.font = `${this.properties.fontSize}px ${this.properties.fontFamily}`;
    ctx.textBaseline = "top";

    const m = ctx.measureText(this.properties.text);
    const top = this.properties.y;
    const h = Math.max(
      m.actualBoundingBoxAscent + m.actualBoundingBoxDescent,
      this.properties.fontSize,
    );

    return (
      x >= this.properties.x &&
      x <= this.properties.x + m.width &&
      y >= top &&
      y <= top + h
    );
  }

  getBounds() {
    if (!this._metrics) return null;
    const { x, y, w, h } = this._metrics;
    return { x, y, w, h };
  }

  translate(dx, dy) {
    this.properties.x += dx;
    this.properties.y += dy;
    if (this._metrics) {
      this._metrics.x += dx;
      this._metrics.y += dy;
    }
  }

  resize(handle, dx, dy) {
    if (handle === "tl") {
      this.properties.width -= dx;
      this.properties.height -= dy;
      this.properties.x += dx / 2;
      this.properties.y += dy / 2;
    }
    if (handle === "tm") {
      this.properties.height -= dy;
      this.properties.y += dy / 2;
    }
    if (handle === "tr") {
      this.properties.width += dx;
      this.properties.height -= dy;
      this.properties.y += dy / 2;
    }
    if (handle === "ml") {
      this.properties.width -= dx;
      this.properties.x += dx / 2;
    }
    if (handle === "mr") {
      this.properties.width += dx;
    }
    if (handle === "bl") {
      this.properties.width -= dx;
      this.properties.height += dy;
      this.properties.x += dx / 2;
    }
    if (handle === "bm") {
      this.properties.height += dy;
    }
    if (handle === "br") {
      this.properties.width += dx / 2;
      this.properties.height += dy;
    }

    this._metrics = null;
  }

  _measureAndCache(ctx) {
    ctx.font = `${this.properties.fontSize}px ${this.properties.fontFamily}`;
    ctx.textBaseline = "top";

    const m = ctx.measureText(this.properties.text);
    const h = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;

    this._metrics = {
      x: this.properties.x + m.width / 2 - this.properties.width / 2,
      y: this.properties.y + h / 2 - this.properties.height / 2,
      w: this.properties.width,
      h: this.properties.height,
    };
  }

  draw(ctx) {
    this._measureAndCache(ctx);

    ctx.fillStyle = this.properties.color;
    ctx.font = `${this.properties.fontSize}px ${this.properties.fontFamily}`;
    ctx.textBaseline = "top";

    ctx.fillText(this.properties.text, this.properties.x, this.properties.y);
  }
}
