import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Department from "./components/Department";
import Employee from "./components/Employee";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="container">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/department" component={Department} />
          <Route exact path="/employee" component={Employee} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
