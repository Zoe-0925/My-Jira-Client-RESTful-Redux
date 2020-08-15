import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
//The round version
//import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {
    Typography, Link, Grow, Paper, Popper, ClickAwayListener,
    ListItem, MenuList, IconButton, MenuItem
} from '@material-ui/core';
import { reorderToBotttom } from "../../Components/Status/Actions"

export function AddTab({ operationName, handleClick, className }) {
    return (
        <ListItem className={className} button key="CreateIssue" onClick={handleClick}>
            <AddIcon className={className + "-icon"} />
            <Typography variant="subtitle2" gutterBottom>{operationName}</Typography>
        </ListItem>
    )
}

export function BackTab({ operationName, handleClick }) {
    return (
        <ListItem button key="goBack" onClick={handleClick}>
            <KeyboardBackspaceIcon />
            <Typography variant="subtitle1" gutterBottom>{operationName}</Typography>
        </ListItem>
    )
}

export function ManageCategoryTab() {
    return (
        <div className="row tab">
            <KeyboardBackspaceIcon />
            <Link href="/Manage Category">
                <Typography variant="subtitle1" gutterBottom>Manage Category</Typography>
            </Link>
        </div>
    )
}

export function ProjectHeaderTab({ title, subtite, imgSrc }) {
    return (
        <div className="project-header">
            <img className="item-left drawer-img" alt="project photo" src={imgSrc} />
            <div>
                <Typography className="item-right-up"
                    variant="subtitle1" gutterBottom>{title}</Typography>
                <Typography className="item-right-down"
                    variant="caption" display="block" gutterBottom>{subtite}</Typography>
            </div>
        </div>
    )
}

export function DotIconMenu({ className, ...props }) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={className}>
            <IconButton ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}>
                <MoreHorizIcon />
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {props.children}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}

export function IssueDotIconMenu({id, flag}) {
    return (
        <DotIconMenu className="dot-icon">
            <MenuItem onClick={() => dispatch(toggleFlag(id))}>{flag ? "Add flag" : "Remove flag"}</MenuItem>
            <MenuItem >Add parent</MenuItem>
            <MenuItem >Add label</MenuItem>
            <MenuItem onClick={() => dispatch(deleteSuccessfulIssue(id))}>Delete</MenuItem>
            <MenuItem onClick={() => dispatch(reorderToBotttom(id))} >Bottom of column</MenuItem>
        </DotIconMenu>
    )
}