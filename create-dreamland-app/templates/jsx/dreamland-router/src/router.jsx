import { Route } from 'dreamland-router';
import Home from './routes/home.jsx';
export const Router = (
    <Route>
        <Route path="/" show={<Home />} />
    </Route>
).$;
