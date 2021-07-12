import { Switch } from "react-router";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Route from "./route";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};
export default Routes;
