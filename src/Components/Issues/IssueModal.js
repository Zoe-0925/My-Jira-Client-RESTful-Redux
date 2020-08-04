import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useSimpleState } from "../Shared/CustomHooks"
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import CreateIcon from '@material-ui/icons/Create';
import history from "../../history"


export const Labels = () => {
    //TODO get labels from the db

    const labelsFromServer = []

    const contents = labelsFromServer.map(each => <p className="cancel-btn">{each}</p>)

    return (
        <Fragment>
            <Typography variant="caption" display="block" gutterBottom>Labels</Typography>
            <div className="grid-row">
                {contents}
            </div>
        </Fragment>
    )
}

export const AvatorCard = ({ user }) => {

    return <div className="avator-card">
        <div className="blue-bg">
            <Typography variant="h3" gutterBottom>{user.name}</Typography>
        </div>
        <AccountCircleIcon className="avator-big" size="inherit" />
        <div className="white-bg">
            <Typography className="row" variant="subtitle1" gutterBottom>
                <MailOutlineIcon size="small" />{user.email}</Typography>
            <div className="row">
                <p className="tab">View Profile</p>
                <p className="tab">Assigned Issues</p>
            </div>
        </div>
    </div>

}


export const Member = ({ user }) => {
    const { value, handleTrue, handleFalse } = useSimpleState()

    return <div className="row" >
        {value && <AvatorCard user={user} />}
        <AccountCircleIcon onMouseOver={handleTrue} onMouseOut={handleFalse} />
        <Typography variant="h6" display="block" gutterBottom>{user.name}</Typography>
    </div>
}

const IssueForm = props => {
    const [formValue, setValue] = useState({
        email: "",
        password: ""
    })

    const {
        values,
        handleChange,
        handleSubmit,
        closeModal
    } = props


    function importIssue() {

    }

    function openFields() {

    }

    function showEpic() {

        //TODO
        //If there's no epic,
        //Pop the dialogue

    }

    //TODO get project name
    const projectName = "test project name"

    return <div className="Issue-form-wide">
        <div className="row">
            <Breadcrumbs aria-label="breadcrumb">
                <div>
                    <CreateIcon className="cursor" size="small" onClick={showEpic} />
                    <Link color="inherit" href="/" onClick={showEpic}>
                        Add epic</Link>
                </div>
                <Typography color="textPrimary">{projectName}</Typography>
            </Breadcrumbs>
        </div>
        <Form onSubmit={handleSubmit}>
            <InputLabel className="row" id="state">Project Name*</InputLabel>
            <Field
                className="form-select"
                id="select"
                className="row"
                component={TextField}
                name="projectName"
                type="text"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={values.projectName}
                margin="normal"
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <ExpandMoreIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <InputLabel className="row" id="state">Issue Type*</InputLabel>
            <Field
                className="form-select"
                id="select"
                className="row"
                component={TextField}
                name="issueType"
                type="text"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={values.issueType}
                margin="normal"
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <ExpandMoreIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />


            <Typography className="row" variant="caption">Some issue types are unavailable due to incompatible field configuration and/or workflow associations.</Typography>
            <Box margin={1}>
                <Divider />
            </Box>
            <InputLabel className="row" id="state">Summary*</InputLabel>
            <Field
                className="form-select"
                className="row full-length-center summary"
                component={TextField}
                name="summary"
                type="text"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={values.summary}
                margin="normal"
            />
            <InputLabel className="row" id="state">description*</InputLabel>
            <Field
                className="full-length-center"
                className="row full-length-center summary"
                component={TextareaAutosize}
                name="description"
                type="text"
                variant="outlined"
                size="small"
                onChange={handleChange}
                value={values.description}
                margin="normal"
                aria-label="minimum height" rowsMin={15}
            />
            <div className="row right-align btn-row">
                <p className="cancel-btn" onClick={closeModal}>Cancel</p>
                <Button className="navbar-create-btn" onClick={handleSubmit}>Create</Button>
            </div>
        </Form>
    </div>
}