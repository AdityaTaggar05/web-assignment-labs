import { Tool } from "./tool.js";

export class SelectTool extends Tool {
  constructor(stateManager) {
    super(
      {
        selectedElement: null,
      },
      stateManager,
    );
  }

  getSidebarOptions() {
    return {
      name: "Select Tool",
      options: [],
    };
  }

  onMouseDown(e, ctx) {
    for (const elem of this.stateManager.elements.toReversed()) {
      console.log(elem.isTargetted(e.offsetX, e.offsetY, ctx));
    }
  }
}
