# Dreamland Vite Plugin

- A simple plugin for Vite with usage of [Dreamland.js](https://github.com/mercuryworkshop/dreamlandjs)

## Installation

```bash
npm install -d vite-plugin-dreamland
```

## Usage

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import dreamlandPlugin from 'vite-plugin-dreamland';

export default defineConfig({
    plugins: [dreamlandPlugin()]
});
```
> [!NOTE]
> You can continue to use `dreamlandVite()` if you used it before.

Licensed under the [MIT License](./LICENSE).
