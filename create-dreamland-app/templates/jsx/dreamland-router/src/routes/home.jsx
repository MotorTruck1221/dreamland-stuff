// javascript syntax for defining components
const Home = function () {
    this.counter = 0;
    return (
        <div>
            <button on:click={() => this.counter++}>Click me!</button>
            <p>{use(this.counter)}</p>
        </div>
    );
};

export default Home;
