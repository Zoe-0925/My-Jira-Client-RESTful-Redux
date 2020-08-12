import React from 'react'
import { useSelector, useDispatch } from "react-redux"

export function useStatusChange() {
    const dispatch = useDispatch()


    const statusReducer = useSelector(state => state.StatusReducer)
    const loading = statusReducer.loading
    const status = statusReducer.status


    return { loading, status }
}

export function useColumnController() {
    const { value, handleTrue, handleFalse } = useSimpleState()


    const changeColumnSummary = (value) => {

        //Dispatch action to update the column summary
    }

    const createNewTask = () => {
        //Dispatch action to create a new task
    }

    const opentask = (id) => {
        //TODO
        //get the task object from the state
        //change the modal open status
        //and pop the task data into the modal
    }

    const [showNewEditable, setShowEditable] = useState(false)


    const epicData = [{
        id: "1", summary: "TO DO", tasks:
            [{ id: "2", summary: "test 1", key: "test key 1", labels: ["test"] }]
    }, { id: "2", summary: "IN PROGRESS", tasks: [] }, { id: "3", summary: "DONE", tasks: [] },
    { id: "4", summary: "TEST", tasks: [] }]

    return {epicData,showNewEditable, setShowEditable}
}

export function useEditText(value) {
    const [state, setState] = useState({
        value: value || "",
        backup: value || ""
    })
    const [edit, setEdit] = useState(false)

    return { state, setState, edit, setEdit }
}

export function useBoardFilter(){
    
}