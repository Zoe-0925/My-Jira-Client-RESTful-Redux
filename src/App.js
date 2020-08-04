import { hot } from 'react-hot-loader/root';
import React from 'react';
import GroupBy from "./Components/Filters/GroupBy"
import './App.scss';

import Container from "./Components/NavBar/Container"
import Drawer from "./Components/SideDrawer/Drawer"

import { AvatorCard, Labels, Member } from "./Components/Issues/IssueModal"

import Board from "./Pages/Board"

import ProjectDetail from "./Components/Project/ProjectDetailForm"
import { ManageCategoryTab } from "./Components/Shared/Tabs"
//import Login from "./Pages/Login"

function App() {
  const user = {
    name: "test name",
    email: "email.com"
  }

  return (
    <div className="App">
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