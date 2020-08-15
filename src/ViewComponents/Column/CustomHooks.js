import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useSimpleState } from "../Shared/CustomHooks"
//swap
import { createIssue } from "../../Components/Issue/mockActions"
//import {createIssue} from "../../Components/Issue/actions"
import {selectCurrentProject, selectCurrentUser} from "../../Components/Selectors"

export function useCreateIssue(statusId) {
    const dispatch = useDispatch()
    const currentProject = useSelector(selectCurrentProject)
    const currentUser = useSelector(selectCurrentUser)

    const createNewTask = (issueName) => {
        const issue = {
            project: currentProject,
            summary: issueName,
            description: "",
            issueType: 'task',
            status: statusId,
            assignee: currentUser,
            labels: [],
            flag: false,
            startDate: (new Date()).toJSON(),
            reportee: currentUser,
            parent: "",
            chilren: [],
            comments: []
        }
        dispatch(createIssue(issue))
    }

    const [showNewEditable, setShowEditable] = useState(false)

    return { showNewEditable, setShowEditable, createNewTask }
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

    return { openTaskDetail }
}
