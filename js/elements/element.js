export class Element {
  constructor(properties) {
    this.properties = properties;
  }

  draw(ctx) { }
  isTargetted(x, y, ctx) { }
  translate(x, y) { }

  toJson() {
    return {
      type: this.type,
      properties: this.properties,
    };
  }
}
