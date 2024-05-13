import "dreamland/dev";

// javascript syntax for defining components
const App = function () {
    this.counter = 0
    return (
        <div>
            <button on:click={() => this.counter++}>Click me!</button>
            <p>{use(this.counter)}</p>
        </div>
    )
}

window.addEventListener('load', () => {
    document.getElementById("app").replaceWith(<App />);
})
