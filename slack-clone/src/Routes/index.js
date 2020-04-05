import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import store from "../store";
import { Provider } from "react-redux";

import Home from "./Home";
import Register from "./Register";

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </BrowserRouter>
  </Provider>
);
