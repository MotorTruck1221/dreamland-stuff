function App() {
    this.counter = 0;
    return html`
		<div>
			<button on:click=${() => this.counter++}>Click me!</button>
			<p>${use(this.counter)}</p>
		</div>
	`;
}

let app = html`< ${App}> <${App} />`;

document.body.appendChild(app);
