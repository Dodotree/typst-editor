# @dodotree/typst-editor

A browser-based Typst editor with live preview, powered by CodeMirror 6 and Tinymist.

## Features

- **CodeMirror 6 Editor** — Syntax highlighting, bracket matching, undo/redo, search & replace
- **LSP Integration** — Semantic tokens and diagnostics via WebSocket
- **Live Preview** — WASM-based Typst rendering with incremental SVG updates
- **Collaborative Editing** — Real-time file sync with conflict resolution
- **Multi-file Support** — File dropdown with dirty-state tracking
- **Theme Settings** — Customizable fonts, colors, and editor themes (light/dark)
- **Cursor Sharing** — Multi-cursor visualization in the preview pane
- **Fallback Mode** — AJAX-based compilation when WebSocket is unavailable

## Installation

```bash
npm install @dodotree/typst-editor
```

## Peer Dependencies

This package requires CodeMirror 6 packages to be installed by your project:

```bash
npm install @codemirror/view @codemirror/state @codemirror/commands @codemirror/language \
  @codemirror/collab @codemirror/lint @codemirror/theme-one-dark @codemirror/legacy-modes \
  @codemirror/lang-markdown @codemirror/lang-css @codemirror/lang-html \
  @codemirror/lang-javascript @codemirror/lang-json @codemirror/lang-python @codemirror/lang-php
```

## Usage

```typescript
import { TinymistApp } from "@dodotree/typst-editor";

const app = new TinymistApp({
  pageId: "1",
  wsToken: "your-jwt-token",
});

app.setup(httpService);
```

### Accessing Sub-modules

```typescript
// Event bus & constants
import { EventBus } from "@dodotree/typst-editor/event-bus";
import { tmEvents, tmSelectors } from "@dodotree/typst-editor/constants";

// Individual components
import { TinymistConsole } from "@dodotree/typst-editor/console";
```

## Architecture

```
tinymist/
├── index.ts                    # Main entry — TinymistApp
├── event-bus.ts                # Type-safe event bus
├── console.ts                  # Compilation console panel
├── constants.ts                # Re-exports all constants
├── connections/                # WebSocket & network layer
│   ├── connections-manager.ts  # Orchestrates all connections
│   ├── ws-base.ts              # Base WS client with reconnection
│   ├── sync-and-lsp.ts         # File sync & LSP client
│   ├── preview-ws.ts           # Preview binary bridge
│   ├── token-manager.ts        # JWT token renewal
│   └── fallback.ts             # AJAX fallback compiler
├── editor/                     # CodeMirror editor layer
│   ├── editor.ts               # Main editor UI
│   ├── editor-toolbar.ts       # Toolbar & language modes
│   ├── semantic-tokens.ts      # LSP semantic highlighting
│   ├── diagnostics.ts          # Error underlines
│   ├── search-replace.ts       # Find & replace
│   ├── file-dropdown.ts        # Multi-file selector
│   ├── font-probe.ts           # Font availability detection
│   └── theme-settings.ts       # Theme customization
└── preview/                    # Live preview layer
    ├── render.ts               # WASM Typst renderer
    ├── control-plane.ts        # Render version management
    ├── data-plane.ts           # Binary message routing
    ├── cursor.ts               # Cursor visualization
    └── preview-toolbar.ts      # Zoom & pan controls
```

## Building

```bash
npm run build       # Compile TypeScript to dist/
npm run typecheck   # Type-check without emitting
npm run clean       # Remove dist/
```

## License

MIT — see [LICENSE](./LICENSE)
