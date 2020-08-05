import React, { Fragment } from 'react';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Link } from '@material-ui/core';
/**--------------Icons-------------- */
import AllInboxIcon from '@material-ui/icons/AllInbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ClearAllIcon from '@material-ui/icons/ClearAll'; //Roadmap
import AssignmentIcon from '@material-ui/icons/Assignment'; //Board
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

/**
 * @param projectName: current project's name
 * @param CurentLocation: enum ("roadmap", "board", "detail")
 */
export function Project({ projectName, currentLocation }) {
    console.log(currentLocation)

    return (
        <Fragment>
            <List>
                <Link color={currentLocation !== "roadmap" ? "inherit" : "primary"} href={"/projects/" + projectName + "/roadmap"}>
                    <ListItem button key="Roadmap" selected={currentLocation === "roadmap"}>
                        <ListItemIcon> <ClearAllIcon /></ListItemIcon>
                        <ListItemText primary="Roadmap" />
                    </ListItem>
                </Link>
                <Link color={currentLocation !== "board" ? "inherit" : "primary"} href={"/projects/" + projectName + "/board"}>
                    <ListItem button key="Board" selected={currentLocation === "board"}>
                        <ListItemIcon>  <AssignmentIcon /></ListItemIcon>
                        <ListItemText primary="Board" />
                    </ListItem>
                </Link>
                <Link color={currentLocation !== "detail" ? "inherit" : "primary"} href={"/projects/" + projectName + "/settings/details"}>
                    <ListItem button className="project-settings"
                        key="Project Details" selected={currentLocation === "detail"}>
                        <ListItemIcon>   <SettingsIcon /></ListItemIcon>
                        <ListItemText primary="Project Settings" />
                        <ExitToAppIcon className="right-icon" />
                    </ListItem>
                </Link>
            </List>
        </Fragment>
    )
}

export function ProjectSetting({ projectName, currentLocation }) {

    return (
        <Fragment>
                <Link color={currentLocation !== "roadmap" ? "inherit" : "primary"} href={"/projects"}>
                    <ListItem button key="ProjectSettings" onClick={() => { handleClick("Project Settings") }}>
                        <ListItemIcon> <ArrowBackRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Project Settings" />
                    </ListItem>
                </Link>
                <Divider />
                <ListItemText primary="Issue Types" />
                <ListItem className="list-item" button key="Epics" >
                    <ListItemIcon> <OpenInBrowserIcon /></ListItemIcon>
                    <ListItemText primary="Epics" />
                </ListItem>
                <Divider />
                <ListItem className="list-item" button key="Tasks">
                    <ListItemIcon>  <CheckBoxIcon /></ListItemIcon>
                    <ListItemText primary="Tasks" />
                </ListItem>
                <Divider />
                <ListItem className="c" button key="Subtasks" >
                    <ListItemIcon>   <AllInboxIcon /></ListItemIcon>
                    <ListItemText primary="Subtasks" />
                </ListItem>
        </Fragment>
    )
}