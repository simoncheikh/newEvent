import React from "react";
import { Switch, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { EventPage } from "./Pages/EventPage";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/Home" exact component={HomePage} />
        <Route path="/event" exact component={EventPage} />
      </Switch>
    </div>
  );
}

export default App;
