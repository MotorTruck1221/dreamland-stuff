export default function dreamlandPlugin() {
    return {
        name: 'vite-plugin-dreamland',
        config(config) {
            config.esbuild = config.esbuild || {}
            config.esbuild.jsxFactory = 'h'
            config.esbuild.jsxFragment = 'Fragment'
        }
    }
}
//maintain backwards compat
export default function dreamlandVite() {
    return dreamlandPlugin()
}
