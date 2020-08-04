import React, { Fragment } from 'react'
import Drawer from "../Components/SideDrawer/Drawer"
import ProjectDetailForm from "../Components/Project/ProjectDetailForm"
import {ProjectSetting} from "../Components/SideDrawer/DrawerBodyFragment"
import Container from "../Components/NavBar/Container"

export default function ProjectDetail() {
    //TODO
    const projectName = "test project name"

    return (
        <Fragment>
            <div className="main">
                <Drawer >
                    <ProjectSetting projectName={projectName} currentLocation="detail" />
                </Drawer>
                <ProjectDetailForm />
            </div>
        </Fragment>
    )
}
