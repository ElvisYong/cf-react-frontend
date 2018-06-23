import React from "react";
import { Switch, Route } from "react-router-dom";
import Person from "./Person";
import PersonGroup from "./PersonGroup";
import Face from "./Face";
import Train from "./Train";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path="/(|person_group)" component={PersonGroup} />
        <Route path="/person" component={Person} />
        <Route path="/face" component={Face} />
        <Route path="/train" component={Train} />
      </Switch>
    </main>
  );
};

export default Main;
