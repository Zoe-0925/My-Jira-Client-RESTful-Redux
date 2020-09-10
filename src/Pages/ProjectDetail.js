import React, { Fragment } from 'react'
import { useSelector } from "react-redux"
import Drawer from "../Components/SideDrawer/Drawer"
import ProjectDetailForm from "../Components/Project/ProjectDetailForm"
import { ProjectSetting } from "../Components/SideDrawer/DrawerBodyFragment"
import Container from "../Components/NavBar/Container"
import { selectCurrentProjectName } from "../Reducers/Selectors"

export default function ProjectDetail() {
    const [open, setOpen] = React.useState(true);
    const projectName = useSelector(selectCurrentProjectName)

    return (
        <Fragment>
            <Container />
            <div className="main">
                <Drawer  open={open} handleClick={setOpen}>
                    <ProjectSetting projectName={projectName} currentLocation="detail" />
                </Drawer>
                <ProjectDetailForm />
            </div>
        </Fragment>
    )
}
