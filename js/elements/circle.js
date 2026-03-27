import { Element } from "./element.js";

export class CircleElement extends Element {
  constructor(properties) {
    super(properties);
    this.type = "circle";
  }

  isTargetted(x, y, ctx) {
    const dx = (x - this.properties.x) / this.properties.radius;
    const dy = (y - this.properties.y) / this.properties.radius;

    return dx * dx + dy * dy <= 1;
  }

  getBounds() {
    return {
      x: this.properties.x - this.properties.radius,
      y: this.properties.y - this.properties.radius,
      w: 2 * this.properties.radius,
      h: 2 * this.properties.radius,
    };
  }

  translate(dx, dy) {
    this.properties.x += dx;
    this.properties.y += dy;
  }

  resize(handle, dx, dy) {
    const p = this.properties;

    // Work in bounding box space, then convert back to cx/cy/radius
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
    const newRadius = Math.max(bw, bh) / 2;

    // For corner handles, anchor is the opposite corner
    if (handle === "tl") {
      p.x = bx + bw - newRadius;
      p.y = by + bh - newRadius;
    } else if (handle === "tr") {
      p.x = bx + newRadius;
      p.y = by + bh - newRadius;
    } else if (handle === "bl") {
      p.x = bx + bw - newRadius;
      p.y = by + newRadius;
    } else if (handle === "br") {
      p.x = bx + newRadius;
      p.y = by + newRadius;
    }
    // For edge handles, move center along one axis only
    else if (handle === "tm") {
      p.y = by + bh - newRadius;
    } else if (handle === "bm") {
      p.y = by + newRadius;
    } else if (handle === "ml") {
      p.x = bx + bw - newRadius;
    } else if (handle === "mr") {
      p.x = bx + newRadius;
    }

    p.radius = newRadius;
  }

  draw(ctx) {
    ctx.beginPath();

    if (this.properties.strokeWidth > 0) {
      ctx.lineWidth = this.properties.strokeWidth;
      ctx.strokeStyle = this.properties.strokeColor;
      ctx.arc(
        this.properties.x,
        this.properties.y,
        this.properties.radius,
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
