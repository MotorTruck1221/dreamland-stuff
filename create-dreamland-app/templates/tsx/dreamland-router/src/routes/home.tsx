const Home: Component<{}, { counter: number }> = function () {
    this.counter = 0;
    return (
        <div>
            <button on:click={() => this.counter++}>Click me!</button>
            <p>{use(this.counter)}</p>
        </div>
    );
};

export default Home;
