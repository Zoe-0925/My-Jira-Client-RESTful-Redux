import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import App from './App';
import Board from "./Pages/Board"
import ProjectDetail from "./Pages/ProjectDetail"
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Board} />
                    <Route path="/projects" exact component={Board} />
                    <Route path="/project/:id" exact component={App} />
                    <Route path="/project/:id/roadmap" exact component={App} />
                    <Route path="/project/:id/detail" exact component={App} />
                    <Route path="/ManageCategory" exact component={App} />
                    <Route path="/projects/:projectName/roadmap"  component={App} />
                    <Route path="/projects/:projectName/board" exact component={Board} />
                    <Route path="/projects/:projectName/settings/details" exact component={ProjectDetail} />
                    <Route path="/projects/:projectName/settings/issuetypes/:issueType" exact component={App} />
                </Switch>
            </Router>
        )
    }
}