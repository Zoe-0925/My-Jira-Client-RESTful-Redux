import { useState } from 'react'

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

export function useDropDownMenu(value) {
    const [selected, setSelected] = useState(value ? value : null)
    const handleSelect = value => {
        switch (value) {
            case "Profile":
                setSelected(false)
                //redirect to log in
                return
            case "Account Setting":
                setSelected(false)
                return
            case "Log out":
                setSelected(false)
                //TODO:
                //clean up for log out 
                //redirect to log in
                return
            default:
                return
        }
        //TODO
        //and then call history.push()...
    }

    const handleClose = () => {
        setSelected(null);
    };

    return (
        { selected, handleSelect, handleClose }
    )
}

