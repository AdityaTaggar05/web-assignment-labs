# IllusTraitor ✏️

A lightweight, zero-dependency illustration app built with vanilla JavaScript and the Canvas API. Draw shapes, sketch freely, add text, and export your work — all in the browser, with full touch and stylus support.

**[Live Demo →](https://illus-traitor.vercel.app)**

---

## Features

### Editing

- **Select & move** any element after drawing it
- **Edit properties** of a selected element live via the sidebar — stroke color, fill color, stroke width
- **Double-click** a text element to edit its content inline
- **Delete** selected elements with `Backspace` / `Delete`

### Canvas

- **Undo / Redo** with `Ctrl+Z` / `Ctrl+Y` — tracks add, remove, move, property changes, and clear as discrete operations
- **Clear canvas** with `Ctrl+Delete`
- **Canvas background color** picker
- **Save as PNG** with `Ctrl+S` — exports with the canvas background correctly composited

### UI

- Light / dark theme toggle, persisted via `localStorage`
- Responsive layout
- Session persistence — your drawing survives a page refresh via `sessionStorage`

### Keyboard Shortcuts

| Shortcut               | Action                     |
| ---------------------- | -------------------------- |
| `1` – `8`              | Switch tools               |
| `Ctrl/⌘ + Z`           | Undo                       |
| `Ctrl/⌘ + Y`           | Redo                       |
| `Ctrl/⌘ + S`           | Save as PNG                |
| `Ctrl/⌘ + H`           | Open help                  |
| `Delete` / `Backspace` | Delete selected element    |
| `Ctrl/⌘ + Delete`      | Clear canvas               |
| `Enter`                | Commit text (in text tool) |
| `Escape`               | Cancel text (in text tool) |

---

## Getting Started

No build step, no dependencies. Clone and open.

```bash
git clone https://github.com/AdityaTaggar05/IllusTraitor.git
cd IllusTraitor
```

Then serve it with any static file server:

```bash
# Python
python -m http.server 3000

# Node
npx serve .
```

---

## Project Structure

```
IllusTraitor/
├── index.html
├── styles/
│   ├── variables.css        # CSS custom properties (theme tokens)
│   ├── base.css             # Reset and global styles
│   └── components.css       # Shared component styles
├── components/
│   ├── header/              # App header (title, save/clear/help buttons)
│   ├── toolbar/             # Left/top tool buttons
│   ├── sidebar/             # Right/bottom properties panel
│   └── dialog/              # Help dialog
└── js/
    ├── main.js              # Entry point — wires everything together
    ├── state.js             # StateManager — elements, history, render loop
    ├── canvas.js            # Canvas setup, DPI scaling, pointer events
    ├── keybind.js           # Keyboard shortcut registration
    ├── sidebar.js           # Sidebar rendering from tool options
    ├── tools/               # One file per tool (select, pencil, rectangle…)
    └── elements/            # One file per element type, each with draw/hit-test
```

### Architecture

The app is split into **tools** and **elements**. A tool handles input events and creates/modifies elements. An element knows how to draw itself and whether a point hits it.

```
StateManager
  ├── elements[]          ← the scene — what gets drawn
  ├── history[]           ← undo stack (operation records, not snapshots)
  ├── redoStack[]
  └── currentTool         ← the active Tool instance

Tool (base class)
  ├── onMouseDown / onMouseMove / onMouseUp
  ├── getSidebarOptions() ← declarative sidebar config
  └── bindSidebarEvents()

Element (base class)
  ├── draw(ctx)
  ├── isTargetted(x, y, ctx)
  ├── translate(dx, dy)
  ├── getBounds()         ← { x, y, w, h } bounding box
  └── resize(handle, dx, dy)
```

Undo/redo uses **operation records** rather than full canvas snapshots — each history entry stores the operation type (`add`, `remove`, `change`, `clear`) and the minimal data needed to invert it. This keeps memory usage constant regardless of canvas complexity.

---

## License

MIT
