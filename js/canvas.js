function _offset(e, ctx) {
  const rect = ctx.canvas.getBoundingClientRect();
  e.offsetX -= rect.left;
  e.offsetY -= rect.top;

  return e;
}
function _handleTouch(e, ctx) {
  e.preventDefault();
  e.offsetX = e.touches[0].clientX;
  e.offsetY = e.touches[0].clientY;

  return _offset(e, ctx);
}

export function setupCanvas(canvas, stateManager) {
  const ctx = canvas.getContext("2d");

  // Handle DPI scaling
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.scale(dpr, dpr);

  // Smooth strokes
  ctx.lineCap = "round";

  // Binding ctx to stateManager
  stateManager.bindContext(ctx);

  window.addEventListener("resize", () => {
    let scaleX = canvas.clientWidth / canvas.width;
    let scaleY = canvas.clientHeight / canvas.height;

    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);

    stateManager.resizeCanvas(scaleX, scaleY);
  });

  canvas.addEventListener("mousedown", (e) => {
    stateManager.currentTool?.onMouseDown(e, ctx);
  });

  canvas.addEventListener("touchstart", (e) => {
    e = _handleTouch(e, ctx);
    stateManager.currentTool?.onMouseDown(e, ctx);
  });

  canvas.addEventListener("mousemove", (e) => {
    stateManager.currentTool?.onMouseMove(e, ctx);
  });

  canvas.addEventListener("touchmove", (e) => {
    e = _handleTouch(e, ctx);
    stateManager.currentTool?.onMouseMove(e, ctx);
  });

  canvas.addEventListener("mouseup", (e) => {
    stateManager.currentTool?.onMouseUp(e, ctx);
  });

  canvas.addEventListener("touchend", (e) => {
    e.offsetX = e.changedTouches[0].clientX;
    e.offsetY = e.changedTouches[0].clientY;
    stateManager.currentTool?.onMouseUp(_offset(e, ctx), ctx);
  });

  return ctx;
}
