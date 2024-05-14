import "dreamland/dev";
import { Router } from './router';
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
    }
    return <div id="app" />
}

window.addEventListener('load', () => { 
    document.getElementById("app")!.replaceWith(<App />);
})
