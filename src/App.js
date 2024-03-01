import React from "react";
import { Switch, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { EventPage } from "./Pages/EventPage";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/newEVent/Home" exact component={HomePage} />
        <Route path="/newEvent/event" exact component={EventPage} />
      </Switch>
    </div>
  );
}

export default App;
