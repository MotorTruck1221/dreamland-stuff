import { Router, Route } from 'dreamland-router';
import Home from './routes/home';

//base styles
import './index.css';
const base = css`
    width: 100%;
    height: 100%;
`
new Router(
    <Route class={base}>
        <Route path="" show={<Home />} />
    </Route>
).mount(document.getElementById('app')!);
