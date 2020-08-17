import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useSimpleState } from "../Shared/CustomHooks"
// TODO swap
import { createIssue } from "../../Components/Issue/mockActions"
//import {createIssue} from "../../Components/Issue/actions"
import { createStatus } from "../../Components/Status/mockActions"
//TODO swap
//import {createStatus} from "../../Components/Status/Actions"
import { selectCurrentProject, selectCurrentUser } from "../../Components/Selectors"

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

    return { createNewTask }
}

export function useCreateStatus(statusId) {
    const dispatch = useDispatch()
    const currentProject = useSelector(selectCurrentProject)

    const createNewColumn = (statusName) => {
        const status = {
            name: statusName,
            project: currentProject,
            issues: []
        }
        dispatch(createStatus(status))
    }

    return { createNewColumn}
}

export function useEditText(value) {
    const [state, setState] = useState({
        value: value!==undefined?value:"",
        backup: value!==undefined?value:""
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
