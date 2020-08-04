import React from 'react'
import { Typography, Breadcrumbs, Link } from '@material-ui/core';


export default function NavBreadcrumbs() {



    const projectName = "Project Name"


    return (
        <Breadcrumbs aria-label="breadcrumb" >
            <Link color="inherit" href="/">Projects</Link>
            <Typography color="textPrimary">{projectName}</Typography>
        </Breadcrumbs>
    )
}
