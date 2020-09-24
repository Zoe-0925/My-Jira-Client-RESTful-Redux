import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { isLoggedOut } from "./Components/Credential/Auth.service"
/**     Router    */
import { Router } from 'react-router-dom';
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
/**    Pages     */
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Board from "./Pages/Board"
import ProjectDetail from "./Pages/ProjectDetail"
import './App.scss';
import NavBarDesktop from "./Components/NavBar/NavBarDesktop"


const App = ({ history, context }) => {

  //useEffect(() => {
  //  if (isLoggedOut()) {
  //    history.push("/login")
  // }
  //}, [])

  return (
    <div className="App">
      <NavBarDesktop />
      <ConnectedRouter history={history} context={context}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Board} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/projects" exact component={Board} />
            <Route path="/project/detail" exact component={App} />
            <Route path="/ManageCategory" exact component={App} />
            <Route path="/projects/roadmap" component={App} />
            <Route path="/projects/board" exact component={Board} />
            <Route path="/projects/settings/details" exact component={ProjectDetail} />
            <Route path="/projects/settings/issuetypes/:issueType" exact component={App} />
          </Switch>
        </Router>
      </ConnectedRouter>
    </div>
  );
}
export default process.env.NODE_ENV === "development" ? hot(App) : App


//TODO
//Project detail page