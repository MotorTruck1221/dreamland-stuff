//You may want to change this to just 'dreamland' when building for prod
import 'dreamland/dev';

//Used to style anything outside of components
import './index.css';

import { Router } from './router.jsx';
const App = function () {
    this.mount = () => {
        Router.render(this.root);
    };

    return <div id="app" />;
};

window.addEventListener('load', () => {
    document.getElementById('app').replaceWith(<App />);
});
