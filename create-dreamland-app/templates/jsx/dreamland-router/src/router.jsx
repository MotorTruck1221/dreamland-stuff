import { Redirect, Route } from "dreamland-router";
import Home from "./routes/home.jsx"
export default (
    <Route path="/">
       <Route path="home" show={<Home />} />
    </Route>
).$
