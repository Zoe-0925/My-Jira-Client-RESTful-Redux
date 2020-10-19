import React from 'react'
import { EditableText, Input } from "../Shared/EditableText"
import { useEditText } from "../Shared/CustomHooks"
import { Row, Container } from 'reactstrap';
import { Button, } from '@material-ui/core';

export function IssueSummaryInput({ summary }) {
    const { state, setState, edit, setEdit } = useEditText(summary)

    //TODO
    //state.value on change, save to the state and call the api

    const updateSummary = () => {

    }

    return (
        <EditableText name="issue-summary" className="board-name" style="summary"
            setEdit={setEdit} edit={edit} text={state.value}>
            <Input state={state} setState={setState} setEdit={setEdit} handleSubmit={updateSummary} />
        </EditableText>
    )
}

export function IssueDescriptionInput({ id, description }) {
    const { state, setState, edit, setEdit } = useEditText(description)

    const updateDesciption = () => {

    }

    const cancel = () => {
        setState({ ...state, value: state.backup })
        setEdit(false)
    }
    //TODO
    //save on click, call the thunk

    return (
        <EditableText name="issue-description" className="board-name"
            setEdit={setEdit} edit={edit} text={state.value} >
            <Container>
                <Row>
                    <Input state={state} setState={setState} setEdit={setEdit} handleSubmit={updateDesciption} />
                </Row>
            </Container>
        </EditableText>
    )
}

