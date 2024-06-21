import { Route } from 'dreamland-router';
import Home from './routes/home';
export const Router = (
    //@ts-ignore temp fix
    <Route path="/">
        {/* @ts-ignore temp fix */}
        <Route path="" show={<Home />} />
    </Route>
).$;
