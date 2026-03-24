export class Element {
  constructor(properties) {
    this.properties = properties;
    this.isSelected = false;
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
