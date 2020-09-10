import React from 'react';
import { useSelector } from "react-redux"
import { selectCurrentProjectName } from "../../Components/Selectors"
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { ProjectHeaderTab } from "../Shared/Tabs"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    menuButton: {
        marginLeft: theme.spacing(2),
    },
    hide: {
        display:"none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));
export default function SideDrawer({ handleClick, open, ...props }) {
    const theme = useTheme();
    const classes = useStyles();

    const title = useSelector(selectCurrentProjectName)

    return <div className={classes.root}>
        <Drawer
            variant="persistent"
            open={open}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className="container drawer">
                <div className="title">
                    <ProjectHeaderTab title={title} subtite="Software project" imgSrc="https://www.lovethispic.com/uploaded_images/218149-Hot-Guy-To-Wake-Up-To.jpg" />
                    <IconButton className="close-drawer-icon" onClick={open ? () => { handleClick(false) } : () => { handleClick(true) }}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                {props.children}
            </div>
        </Drawer>
        {!open && <Drawer
            variant="permanent"
            className="close-drawer"
            style={{"backgroundColor":"rgb(244, 245, 247)"}}
        > <IconButton className="open-drawer-icon" onClick={() => { handleClick(true) }}>
                <ChevronRightIcon />
            </IconButton>
        </Drawer>
        }
    </div>
}