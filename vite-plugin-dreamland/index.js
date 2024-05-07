export default function dreamlandVite() {
    return {
        name: 'dreamland-vite',
        config(config) {
            config.esbuild = config.esbuild || {}
            config.esbuild.jsxFactory = 'h'
            config.esbuild.jsxFragment = 'Fragment'
        }
    }
}
