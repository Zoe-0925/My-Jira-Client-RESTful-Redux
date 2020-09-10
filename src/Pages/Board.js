import React, { Fragment } from 'react'
import NavBreadcrumbs from "../Components/NavBar/NavBreadcrumbs"
import FilterManager from "../Components/Filters/FilterManager"
import Drawer from "../Components/SideDrawer/Drawer"
import { DrawerBody } from "../Components/SideDrawer/DrawerBodyFragment"
import Container from "../Components/NavBar/Container"
import { useEditText } from "../Components/Column/CustomHooks"
import { EditableText, Input } from "../Components/Shared/EditableText"
import DragContext from "../Components/Column/DragContext"

export default function Board() {
    //TODO get project id and name, and then replace the "My EC"
    const { state, setState, edit, setEdit } = useEditText("My EC")
    const [open, setOpen] = React.useState(true);

    return (
        <Fragment>
            <Container />
            <div className={open ? "main drawer-close" : "main drawer-open"}>
                <Drawer handleClick={setOpen} open={open}>
                    <DrawerBody currentLocation="board" />
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
