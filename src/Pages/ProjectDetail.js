import React, { Fragment } from 'react'
import { useSelector } from "react-redux"
import Drawer from "../ViewComponents/SideDrawer/Drawer"
import ProjectDetailForm from "../ViewComponents/Project/ProjectDetailForm"
import { ProjectSetting } from "../ViewComponents/SideDrawer/DrawerBodyFragment"
import Container from "../ViewComponents/NavBar/Container"
import { selectCurrentProjectName } from "../Components/Selectors"

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
