export class Tool {
  constructor(state, stateManager, editing = false) {
    this.state = state;
    this.stateManager = stateManager;
    this.editing = editing;
  }

  getSidebarOptions() { }
  bindSidebarEvents(state) { }
  onMouseDown(e, ctx) { }
  onMouseMove(e, ctx) { }
  onMouseUp(e, ctx) { }
  onSelect() { }
  onDeselect() { }
  onUndo() { }
}
