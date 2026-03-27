import { Element } from "./element.js";

export class EllipseElement extends Element {
  constructor(properties) {
    super(properties);
    this.type = "ellipse";
  }

  isTargetted(x, y, ctx) {
    const dx = (x - this.properties.x) / this.properties.radiusX;
    const dy = (y - this.properties.y) / this.properties.radiusY;

    return dx * dx + dy * dy <= 1;
  }

  getBounds() {
    return {
      x: this.properties.x - this.properties.radiusX,
      y: this.properties.y - this.properties.radiusY,
      w: this.properties.radiusX * 2,
      h: this.properties.radiusY * 2,
    };
  }

  resize(handle, dx, dy) {
    let { x: bx, y: by, w: bw, h: bh } = this.getBounds();

    if (handle === "tl") {
      bx += dx;
      by += dy;
      bw -= dx;
      bh -= dy;
    }
    if (handle === "tm") {
      by += dy;
      bh -= dy;
    }
    if (handle === "tr") {
      by += dy;
      bw += dx;
      bh -= dy;
    }
    if (handle === "ml") {
      bx += dx;
      bw -= dx;
    }
    if (handle === "mr") {
      bw += dx;
    }
    if (handle === "bl") {
      bx += dx;
      bw -= dx;
      bh += dy;
    }
    if (handle === "bm") {
      bh += dy;
    }
    if (handle === "br") {
      bw += dx;
      bh += dy;
    }

    const MIN = 4;
    bw = Math.max(bw, MIN);
    bh = Math.max(bh, MIN);

    // Derive new center and radii from the updated bounding box
    this.properties.x = bx + bw / 2;
    this.properties.y = by + bh / 2;
    this.properties.radiusX = bw / 2;
    this.properties.radiusY = bh / 2;
  }

  translate(dx, dy) {
    this.properties.x += dx;
    this.properties.y += dy;
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
      ctx.fill();
    }

    ctx.closePath();
  }
}
