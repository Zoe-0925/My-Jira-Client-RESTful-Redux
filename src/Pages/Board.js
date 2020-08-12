import React, { Fragment } from 'react'
import NavBreadcrumbs from "../ViewComponents/NavBar/NavBreadcrumbs"
import FilterManager from "../ViewComponents/Filters/FilterManager"
import Drawer from "../ViewComponents/SideDrawer/Drawer"
import { Project } from "../ViewComponents/SideDrawer/DrawerBodyFragment"
import Columns from "../ViewComponents/Column/Column"
import Container from "../ViewComponents/NavBar/Container"
import { useEditText } from "../ViewComponents/Column/CustomHooks"
import { EditableText, Input } from "../ViewComponents/Shared/EditableText"

export default function Board() {
    //TODO get project id and name, and then replace the "My EC"
    const { state, setState, edit, setEdit } = useEditText("My EC")

    return (
        <Fragment>
            <Container />
            <div className="main">
                <Drawer handleClick={() => { }} onChange={() => { }} >
                    <Project currentLocation="board" />
                </Drawer>
                <NavBreadcrumbs className="row" />
                <EditableText name="epic-summary" className="board-name"
                    setEdit={setEdit} edit={edit} value={state.value}>
                    <Input state={state} setState={setState} setEdit={setEdit} />
                </EditableText>
                <FilterManager />
                <div className="epic-list">
                    <Columns />
                </div>
            </div>
        </Fragment>
    )
}
