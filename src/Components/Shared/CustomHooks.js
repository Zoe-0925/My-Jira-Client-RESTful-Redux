import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { v4 as uuidv4 } from 'uuid'
import { CREATE_SUCCESS_TASK } from "../../Actions/mockIssueActions"
import {selectCurrentProject, selectCurrentUser} from "../../Reducers/Selectors"
//import {createTask} from "../../Actions/IssueActions"

export function useSimpleState() {
    const [value, setValue] = useState(false)
    const handleTrue = () => {
        setValue(true)
    }

    const handleFalse = () => {
        setValue(false)
    }

    return (
        { value, handleTrue, handleFalse }
    )
}

// Cited from "https://usehooks.com/useKeyPress/"
export function useKeypress(targetKey) {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false);

    // If pressed key is our target key then set to true
    function downHandler({ key }) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    // Add event listeners
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return keyPressed;
}

// Cited from "https://usehooks.com/useKeyPress/"
export function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = event => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }

                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
    );
}


export function useCreateIssue(statusId) {
    const dispatch = useDispatch()
    const currentProject = useSelector(selectCurrentProject)
    const currentUser = useSelector(selectCurrentUser)

    const createNewTask = (issueName) => {
        const issue = {
            _id: uuidv4(),
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


export function useEditText(value) {
    const [state, setState] = useState({
        value: value !== undefined ? value : "",
        backup: value !== undefined ? value : ""
    })
    const [edit, setEdit] = useState(false)

    return { state, setState, edit, setEdit }
}