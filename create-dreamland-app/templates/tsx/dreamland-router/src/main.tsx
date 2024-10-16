import 'dreamland/dev';
import { Route, Router } from 'dreamland-router';
import Home from './routes/home';

//base styles
import './index.css';
let router = new Router(
    <Route>
        <Route path="" show={<Home />} />
    </Route>
)
router.mount(document.getElementById('app')!);
