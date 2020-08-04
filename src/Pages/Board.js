import React, { Fragment, useRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import NavBreadcrumbs from "../Components/NavBar/NavBreadcrumbs"
import FilterManager from "../Components/Filters/FilterManager"
import Drawer from "../Components/SideDrawer/Drawer"
import { Project } from "../Components/SideDrawer/DrawerBodyFragment"
import Container from "../Components/NavBar/Container"
import Epic from "../Components/Epics/Epic"

export default function Board() {
    const contentEditable = useRef()
    const [html, setHtml] = useState("My EC") //TODO get from the state

    //TODO
    const projectName = "test project name"

    //TODO 
    //set the board link color to be blue

    const epicData = [{
        id: "1", summary: "TO DO", tasks:
            [{ id: "2", summary: "test 1", key: "test key 1", labels: ["test"] }]
    }, { id: "2", summary: "IN PROGRESS", tasks: [] }, { id: "3", summary: "DONE", tasks: [] },
    { id: "4", summary: "TEST", tasks: [] }]

    const epics = epicData.map(each => <Epic key={each.id} epic={each} />)

    return (
        <Fragment>
            <div className="main">
                <Drawer handleClick={() => { }} onChange={() => { }} >
                    <Project projectName={projectName} currentLocation="board"/>
                </Drawer>
                <NavBreadcrumbs className="row" />
                <div className="board-name">
                    <ContentEditable
                        innerRef={contentEditable}
                        html={html} // innerHTML of the editable div
                        disabled={false}       // use true to disable editing
                        onChange={(e) => setHtml(e.target.value)} // handle innerHTML change
                    />
                </div>
                <FilterManager />
                <div className="epic-list">
                    {epics}
                </div>
            </div>
        </Fragment>
    )
}
