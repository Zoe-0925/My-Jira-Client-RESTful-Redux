import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import { Button } from "@material-ui/core"
import Account from "./Account"
import IssueModal from "../Issues/IssueModal"
import CustomIconMenu from "../Shared/CustomIconMenu"
import { Navbar, Nav, Form, FormControl, Col } from 'react-bootstrap';
import { ClickAwayListener } from '@material-ui/core';

const NavBarDesktop = () => {
    //TODO create issue modal
    //TODO loading page
    const { openModal, setOpenModal } = useState(false)
//    const { searchClicked, setSearchClicked } = useState(false)
    //  const emptyIssue = { _id: "", summary: "", description: "", issueType: "" }
    //  const className = searchClicked ? "mr-sm-5" : "mr-sm-2"
    //  const placeholder = searchClicked ? "Search Jira" : "Search"

    const handleClick = () => { }

    return (
        <div className="nav-bar">
            <Navbar className="bg-light justify-content-between" sticky="top" >
                <Navbar.Brand href="/">Jira Software Mock</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Projects</Nav.Link>
                    <Button className="navbar-create-btn" onClick={() => setOpenModal(true)}>Create</Button>
                </Nav>
                <Form inline className="ml-auto">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />

                    <CustomIconMenu options={[]} click={handleClick}>
                        <SettingsIcon className="icon" fontSize="large" />
                    </CustomIconMenu>
                    <Account />
                </Form>
            </Navbar>
        </div>
    )
}

export default NavBarDesktop

//       <IssueModal open={openModal} closeModal={() => setOpenModal(false)} issue={emptyIssue} />



/**
 *             <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
 */