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
import Container from "./ViewComponents/NavBar/Container"
import Drawer from "./ViewComponents/SideDrawer/Drawer"
import GroupBy from "./ViewComponents/Filters/GroupBy"
import { AvatorCard, Labels, Member } from "./ViewComponents/Issues/IssueModal"
import './App.scss';

import { ManageCategoryTab } from "./ViewComponents/Shared/Tabs"
import { Button } from '@material-ui/core';
//import Login from "./Pages/Login"

import { useDispatch } from "react-redux"
import {fetchCheckEmail} from "./Components/User/Actions"

const App = ({ history, context }) => {
  const user = {
    name: "test name",
    email: "email.com"
  }

  const dispatch = useDispatch()
 
  const validateEmail = (email) => {
    return async (dispatch, getState, BASE) => {
      const response = await fetchCheckEmail(BASE, "testEmail@gmail.com")
      console.log("response", response)

      //save the validity to the store
      //The view will use useEffect to select and call the other actions 
      //dispatch({ type: "SET_JOKE", joke });
    }
  }
  const testFetch =()=> dispatch(validateEmail(""))


  return (
    <div className="App">
      <Button onClick={testFetch}>TEST</Button>
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