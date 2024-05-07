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
> [!WARNING]
> If you wish to use `dreamlandVite()` 
>
> It must be imported like this: `import { dreamlandVite } from 'vite-plugin-dreamland';`
> 
> Over: `import dreamlandVite from 'vite-plugin-dreamland';`

Licensed under the [MIT License](./LICENSE).
