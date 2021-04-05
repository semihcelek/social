import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import LoginPage from "../pages/Login-Page";
import RegisterPage from "../pages/Register-Page";
import StoriesPage from "../pages/Stories-Page";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <h3>oldur gibi</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/posts/:id"></Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/">
              <StoriesPage />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Router;
