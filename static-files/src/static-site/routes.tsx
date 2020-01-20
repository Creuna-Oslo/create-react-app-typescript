import * as React from "react";
import { Route, Switch } from "react-router-dom";

import pages from "./pages";

export const Routes = (): JSX.Element => (
  <Switch>
    {pages.map(page => (
      <Route exact key={page.path} {...page} />
    ))}
  </Switch>
);
