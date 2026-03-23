export class Tool {
  constructor(state, stateManager) {
    this.state = state;
    this.stateManager = stateManager;
  }

  getSidebarOptions() { }
  bindSidebarEvents(state) { }
  onMouseDown(e, ctx) { }
  onMouseMove(e, ctx) { }
  onMouseUp(e, ctx) { }
  onSelect() { }
  onDeselect() { }
}
