import { getHitHandle } from "./tools/handles.js";

function _getPos(touch, canvas) {
  const rect = canvas.getBoundingClientRect();

  return {
    offsetX: touch.clientX - rect.left,
    offsetY: touch.clientY - rect.top,
  };
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

  canvas.addEventListener("pointerdown", (e) => {
    if (!e.isPrimary) return; // ignore multi-finger touches
    canvas.setPointerCapture(e.pointerId);
    e.preventDefault();
    stateManager.currentTool?.onMouseDown(e, ctx);
  });

  canvas.addEventListener("pointermove", (e) => {
    e.preventDefault();
    const tool = stateManager.currentTool;
    if (tool?.selectedElement) {
      const b = tool.selectedElement.getBounds?.();
      if (b) {
        const hit = getHitHandle(
          e.offsetX,
          e.offsetY,
          b.x - 6,
          b.y - 6,
          b.w + 12,
          b.h + 12,
        );
        const cursors = {
          tl: "nw-resize",
          tr: "ne-resize",
          bl: "sw-resize",
          br: "se-resize",
          tm: "n-resize",
          bm: "s-resize",
          ml: "w-resize",
          mr: "e-resize",
        };
        canvas.style.cursor = hit ? cursors[hit] : "default";
      }
    }

    stateManager.currentTool?.onMouseMove(_getPos(e, canvas), ctx);
  });

  canvas.addEventListener("pointerup", (e) => {
    canvas.releasePointerCapture(e.pointerId);
    stateManager.currentTool?.onMouseUp(_getPos(e, canvas), ctx);
  });

  canvas.addEventListener("pointercancel", (e) => {
    canvas.releasePointerCapture(e.pointerId);
    stateManager.currentTool?.onMouseUp(_getPos(e, canvas), ctx);
  });

  return ctx;
}
