import { hot } from 'react-hot-loader/root';
import React from 'react';
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


const App = ({ history, context }) => {

  return (
    <div className="App">
      <ConnectedRouter history={history} context={context}>
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={Board} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/projects" exact component={Board} />
              <Route path="/project/:id" exact component={App} />
              <Route path="/project/:id/roadmap" exact component={App} />
              <Route path="/project/:id/detail" exact component={App} />
              <Route path="/ManageCategory" exact component={App} />
              <Route path="/projects/:projectName/roadmap" component={App} />
              <Route path="/projects/:projectName/board" exact component={Board} />
              <Route path="/projects/:projectName/settings/details" exact component={ProjectDetail} />
              <Route path="/projects/:projectName/settings/issuetypes/:issueType" exact component={App} />
            </Switch>
          </Router>
      </ConnectedRouter>
    </div>
  );
}
export default process.env.NODE_ENV === "development" ? hot(App) : App


//TODO
//Project detail page