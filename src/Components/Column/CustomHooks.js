import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
// TODO swap
import { CREATE_SUCCESS_TASK } from "../../Actions/mockIssueActions"
//import {createTask} from "../../Actions/IssueActions"
import { createStatus } from "../../Actions/mockStatusActions"
//TODO swap
//import {createStatus} from "../../Actions/StatusActions"
import { getUserByIds } from "../../Actions/mockUserActions"
import { selectCurrentProject, selectCurrentUser } from "../../Reducers/Selectors"
import { v4 as uuidv4 } from 'uuid'


export function useCreateIssue(statusId) {
    const dispatch = useDispatch()
    const currentProject = useSelector(selectCurrentProject)
    const currentUser = useSelector(selectCurrentUser)

    const createNewTask = (issueName) => {
        const issue = {
            _id:uuidv4(),
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
        dispatch({
            type: CREATE_SUCCESS_TASK,
            data: issue
        })
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

    return { createNewColumn }
}

export function useEditText(value) {
    const [state, setState] = useState({
        value: value !== undefined ? value : "",
        backup: value !== undefined ? value : ""
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

export const useIssueDetailModal = () => {
    const dispatch = useDispatch()

    const [openModal, setOpenModal] = useState(false)
    const [issueDetailOpened, setIssue] = useState("")
    
    const openTaskDetail = (task) => {
        setOpenModal(true)
        setIssue(task)
        if (task.assignee === task._id && task.reportee === task._id) { return }
        dispatch(getUserByIds([task.assignee, task.reportee]))
    }

    return { openModal, setOpenModal, issueDetailOpened,  openTaskDetail}

}