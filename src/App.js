import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from './places/pages/UserPlaces';

import MainNavigation from "./shared/components/Navigation/MainNavigation";
//import SideDrawer from "./shared/components/Navigation/"

function App() {
  return (
    <Fragment>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
