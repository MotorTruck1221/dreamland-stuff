import { Redirect, Route } from "dreamland-router";
import Home from "./routes/home"
export const Router = (
    <Route path="/">
       <Route path="" show={<Home />} />
    </Route>
).$