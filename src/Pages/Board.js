import React, { Fragment } from 'react'
import NavBreadcrumbs from "../ViewComponents/NavBar/NavBreadcrumbs"
import FilterManager from "../ViewComponents/Filters/FilterManager"
import Drawer from "../ViewComponents/SideDrawer/Drawer"
import { Project } from "../ViewComponents/SideDrawer/DrawerBodyFragment"
import Container from "../ViewComponents/NavBar/Container"
import { useEditText } from "../ViewComponents/Column/CustomHooks"
import { EditableText, Input } from "../ViewComponents/Shared/EditableText"
import DragContext from "../ViewComponents/Column/DragContext"

export default function Board() {
    //TODO get project id and name, and then replace the "My EC"
    const { state, setState, edit, setEdit } = useEditText("My EC")
    const [open, setOpen] = React.useState(true);

    return (
        <Fragment>
            <Container />
            <div className={open ? "main drawer-close" : "main drawer-open"}>
                <Drawer handleClick={setOpen} open={open}>
                    <Project currentLocation="board" />
                </Drawer>
                <NavBreadcrumbs className="row" />
                <EditableText name="epic-summary" className="board-name"
                    setEdit={setEdit} edit={edit} value={state.value}>
                    <Input state={state} setState={setState} setEdit={setEdit} />
                </EditableText>
                <FilterManager />
                <DragContext />
            </div>

        </Fragment>
    )
}
