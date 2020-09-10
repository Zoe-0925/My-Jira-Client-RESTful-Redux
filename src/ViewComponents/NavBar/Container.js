import React, { Fragment } from 'react'
import { Button, Link,Paper } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import Account from "./Account"
import SearchBoxController from "./SearchBoxController"
import IssueModal from "../Issues/IssueModal"
import { useSimpleState } from "./CustomHooks"
import CustomIconMenu from "../Shared/CustomIconMenu"

export default function Container() {
    //TODO create issue modal
    //TODO loading page
    const { value, handleTrue, handleFalse } = useSimpleState()
    const emptyIssue = {_id:"", summary:"", description:"", issueType:""}

    const handleClick = () => { }
    return (
        <Fragment>
            <Paper elevation={3} >
                <div className="nav-bar">
                    <nav className="desktop" style={{ width: "100%" }}>
                        <Link color="inherit" href="/" ><h1 className="title">Jira Software Mock</h1></Link>
                        <Link color="inherit" href="/projects" className="navbar--link-item">Projects</Link>
                        <Link color="inherit" href="/" className="navbar--link-item">People</Link>
                        <Button className="navbar-create-btn" onClick={handleTrue}>Create</Button>
                        <SearchBoxController />
                        <SettingsIcon className="icon" fontSize="large" />
                        <Account />
                    </nav>
                    <nav className="mobile">
                        <h1 className="title">Jira Software Mock</h1>
                        <Link color="inherit" href="/projects" className="navbar--link-item">Projects</Link>
                        <Button className="navbar-create-btn" onClick={handleTrue}>Create</Button>
                        <SearchBoxController />
                        <CustomIconMenu options={[]} click={handleClick}>
                            <SettingsIcon className="icon" fontSize="large" />
                        </CustomIconMenu>
                        <Account />
                    </nav>
                </div>
            </Paper>
            <IssueModal open={value} closeModal={handleFalse} issue={emptyIssue}/>
        </Fragment>
    )
}
