import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useSimpleState } from "../Shared/CustomHooks"

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


    const [showNewEditable, setShowEditable] = useState(false)

    return { showNewEditable, setShowEditable,  changeColumnSummary }
}

export function useEditText(value) {
    const [state, setState] = useState({
        value: value || "",
        backup: value || ""
    })
    const [edit, setEdit] = useState(false)

    return { state, setState, edit, setEdit }
}

export function useTaskController() {
    const openTaskDetail = (id) => {
        //TODO
        //get the task object from the state
        //change the modal open status
        //and pop the task data into the modal
    }

    //Handle issue modal state

    return {  openTaskDetail }
}

export function useBoardFilter() {

}