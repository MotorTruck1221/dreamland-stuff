import 'dreamland/dev';
import { Router, Route } from 'dreamland-router';
import Home from './routes/home';

//base styles
import './index.css';
let router = new Router(
    //@ts-ignore TEMP FIX FOR NOW
    <Route>
        {/* @ts-ignore TEMP FIX FOR NOW */}
        <Route path="" show={<Home />} />
    </Route>
).mount(document.getElementById('app')!);
