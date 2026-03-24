export class Element {
  constructor(properties) {
    this.properties = properties;
  }

  draw(ctx) { }
  isTargetted(x, y, ctx) { }

  toJson() {
    return {
      type: this.type,
      properties: this.properties,
    };
  }
}
