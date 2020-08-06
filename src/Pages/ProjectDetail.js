import React, { Fragment } from 'react'
import Drawer from "../ViewComponents/SideDrawer/Drawer"
import ProjectDetailForm from "../ViewComponents/Project/ProjectDetailForm"
import { ProjectSetting } from "../ViewComponents/SideDrawer/DrawerBodyFragment"
import Container from "../ViewComponents/NavBar/Container"

export default function ProjectDetail() {
    //TODO
    const projectName = "test project name"

    return (
        <Fragment>
            <Container />
            <div className="main">
                <Drawer >
                    <ProjectSetting projectName={projectName} currentLocation="detail" />
                </Drawer>
                <ProjectDetailForm />
            </div>
        </Fragment>
    )
}
