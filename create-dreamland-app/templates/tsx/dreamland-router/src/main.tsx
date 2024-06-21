import 'dreamland/dev';
import { Router } from './router';

//Used to style anything outside of components
import './index.css';

const base = css`
    width: 100%;
    height: 100%;
`

// typescript syntax for defining components
const App: Component<
    {
        // component properties. if you had a component that took a property like `<Button text="..." /> you would use a type like the one in the following line
        // text: string
    },
    {
        // types for internal state
    }
> = function () {
    this.mount = () => {
        Router.render(this.root);
    };
    return <div class={base} id="app" />;
};

window.addEventListener('load', () => {
    document.getElementById('app')!.replaceWith(<App />);
});
