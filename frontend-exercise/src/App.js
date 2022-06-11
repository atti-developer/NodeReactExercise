// import { HashRouter as Router, Switch, Route } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
   
} from "react-router-dom";
import List from "./Views/Glossary/List";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" ><List /></Route>
      </Switch>
    </Router>
  );
}
