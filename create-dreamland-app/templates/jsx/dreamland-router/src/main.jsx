//You may want to change this to just 'dreamland' when building for prod
import 'dreamland/dev';

//Used to style anything outside of components
import './index.css';

const base = css`
    width: 100%;
    height: 100%;
`
import { Router } from './router.jsx';
const App = function () {
    this.mount = () => {
        Router.render(this.root);
    };

    return <div class={base} id="app" />;
};

window.addEventListener('load', () => {
    document.getElementById('app').replaceWith(<App />);
});
