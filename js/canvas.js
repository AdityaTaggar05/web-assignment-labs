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

  canvas.addEventListener("mousemove", (e) => {
    stateManager.currentTool?.onMouseMove(e, ctx);
  });

  canvas.addEventListener("mouseup", (e) => {
    stateManager.currentTool?.onMouseUp(e, ctx);
  });

  return ctx;
}
