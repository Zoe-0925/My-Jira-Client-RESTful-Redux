import React, { Fragment } from 'react'
import Drawer from "../ViewComponents/SideDrawer/Drawer"
import ProjectDetailForm from "../ViewComponents/Project/ProjectDetailForm"
import {ProjectSetting} from "../ViewComponents/SideDrawer/DrawerBodyFragment"

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
