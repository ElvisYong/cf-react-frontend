import React from "react";
import { Switch, Route } from "react-router-dom";
import Person from "./Person";
import PersonGroup from "./PersonGroup";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path="/(|person_group)" component={PersonGroup} />
        <Route path="/person" component={Person} />
      </Switch>
    </main>
  );
};

export default Main;
