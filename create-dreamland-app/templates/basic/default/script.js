function App() {
	this.counter = 0;
	return html`
		<div>
			<button on:click=${() => this.counter++}>Click me!</button>
			<p>${use(this.counter)}</p>
		</div>
	`;
}

document.body.appendChild(App);
