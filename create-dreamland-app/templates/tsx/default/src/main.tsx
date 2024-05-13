import "dreamland/dev";

// typescript syntax for defining components
const App: Component<
    {
        // component properties. if you had a component that took a property like `<Button text="..." /> you would use a type like the one in the following line
        // text: string
    },
    {
        // types for internal state
        counter: number
    }
> = function () {
    this.counter = 0
    return (
        <div>
            <button on:click={() => this.counter++}>Click me!</button>
            <p>{use(this.counter)}</p>
        </div>
    )
}

window.addEventListener('load', () => {
    document.getElementById("app")!.replaceWith(<App />);
})
