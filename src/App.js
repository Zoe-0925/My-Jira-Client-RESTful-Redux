import { hot } from 'react-hot-loader/root';
import React from 'react';
/**     Router    */
import { Router } from 'react-router-dom';
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
/**    Pages     */
import Board from "./Pages/Board"
import ProjectDetail from "./Pages/ProjectDetail"
import Container from "./ViewComponents/NavBar/Container"
import Drawer from "./ViewComponents/SideDrawer/Drawer"
import GroupBy from "./ViewComponents/Filters/GroupBy"
import { AvatorCard, Labels, Member } from "./ViewComponents/Issues/IssueModal"
import './App.scss';

import { ManageCategoryTab } from "./ViewComponents/Shared/Tabs"
//import Login from "./Pages/Login"

const App = ({ history, context }) => {
  const user = {
    name: "test name",
    email: "email.com"
  }

  return (
    <div className="App">
      <Container />
      <ConnectedRouter history={history} context={context}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Board} />
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
//  <ProjectDetail />
export default process.env.NODE_ENV === "development" ? hot(App) : App
// <Drawer handleClick={() => { }} onChange={() => { }} />

// <Drawer handleClick={() => { }} onChange={() => { }} />
//<ProjectDetail />

/**
 *
 *
 *     <div className="main">
        <Drawer handleClick={() => { }} onChange={() => { }} />
        <div className="right-main">
          <ProjectDetail />
        </div>
      </div>
 */
