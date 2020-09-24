import React from 'react'
import NavBreadcrumbs from "../Components/NavBar/NavBreadcrumbs"
import FilterManager from "../Components/Filters/FilterManager"
import Drawer from "../Components/SideDrawer/Drawer"
import { DrawerInner } from "../Components/SideDrawer/DrawerInner"
import { useEditText } from "../Components/Column/CustomHooks"
import { EditableText, Input } from "../Components/Shared/EditableText"
import DragContext from "../Components/Column/DragContext"

export default function Board() {
    //TODO get project id and name, and then replace the "My EC"
    const { state, setState, edit, setEdit } = useEditText("My EC")
    const [open, setOpen] = React.useState(true);

    return (
        <div className={open ? "main drawer-close" : "main drawer-open"}>
            <Drawer handleClick={setOpen} open={open}>
                <DrawerInner currentLocation="board" />
            </Drawer>
            <NavBreadcrumbs className="bread-crumbs" />
            <EditableText name="epic-summary" className="board-name"
                setEdit={setEdit} edit={edit} value={state.value}>
                <Input state={state} setState={setState} setEdit={setEdit} />
            </EditableText>
            <FilterManager />
            <DragContext />
        </div>
    )
}
