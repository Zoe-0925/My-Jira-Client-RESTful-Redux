import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CustomIconMenu from "../Shared/CustomIconMenu"

export default function Account({ }) {
    const options = ["Profile", "Account Settings", "Log out"]

    const handleClick = (value) => {
        switch (value) {
            case "Profile":
                //TODO go to profile page
                return
            case "Account Settings":
                //TODO go to profile page
                return
            case "Log out":
                //TODO log out
                return
            default:
                return
        }
    }

    return <CustomIconMenu options={options} click={handleClick}>
        <AccountCircleIcon fontSize="large" />
    </CustomIconMenu>

}
