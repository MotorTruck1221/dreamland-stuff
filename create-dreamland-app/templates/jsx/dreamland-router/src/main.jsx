import Router from './router.jsx';
const App = function() {
    this.mount = () => {
        Router.render(this.root);
    }

    return <div id="app" />
}

window.addEventListener('load', () => {
    document.getElementById("app").replaceWith(<App />);
})
