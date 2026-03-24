export class Element {
  constructor(properties) {
    this.properties = properties;
  }

  draw(ctx) { }

  toJson() {
    return {
      type: this.type,
      properties: this.properties,
    };
  }
}
