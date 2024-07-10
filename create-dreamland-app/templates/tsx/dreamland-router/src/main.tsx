import { Router, Route } from 'dreamland-router';
import Home from './routes/home';

//base styles
import './index.css';
let router = new Router(
    <Route path="" show="">
        <Route path="" show={<Home />} />
    </Route>
).mount(document.getElementById('app')!);
