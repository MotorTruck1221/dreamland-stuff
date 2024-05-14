import type { Plugin, UserConfig } from 'vite'
export default function dreamlandPlugin(): Plugin {
    return {
        name: 'vite-plugin-dreamland',
        config(config: UserConfig) {
            config.esbuild = config.esbuild || {}
            config.esbuild.jsxFactory = 'h'
            config.esbuild.jsxFragment = 'Fragment'
        }
    }
}
//maintain backwards compat
function dreamlandVite(): Plugin {
    return dreamlandPlugin()
}

export { dreamlandVite }
