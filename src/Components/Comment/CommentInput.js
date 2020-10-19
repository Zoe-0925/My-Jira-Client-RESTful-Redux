import React, { useCallback } from 'react'
import { useDispatch } from "react-redux"
import { useEditText } from '../Shared/CustomHooks';
import { TextareaAutosize, } from '@material-ui/core';
import { EditableText } from "../Shared/EditableText"
import SaveCancelButtons from "../Shared/SaveCancelButtons"
import { Container, Row } from "reactstrap"

export default function CommentInput() {
    const dispatch = useDispatch()
    const { state, setState, edit, setEdit } = useEditText("Add a comment...")
    const isSubmitting = false

    const handleSave = useCallback(
        () => {
            //TODO
            //dispatch create comment, 
            //isSubmitting is selected from loading

            //leave the rest of the save state par to the redux

            setEdit(false)
        },
        [dispatch],
    )

    return (
        <div className="CommentInput">
            <EditableText name="comment-input" className="comment-input"
                edit={edit} text="Add a comment..." setEdit={setEdit}>
                <Container className="container">
                    <Row>
                        <TextareaAutosize
                            className="comment-input-form"
                            name="description"
                            type="text"
                            variant="outlined"
                            onChange={(e) => setState(e.target.value)}
                            aria-label="minimum height" rowsMin={5}
                        />
                    </Row>
                    <Row className="action-btns">
                        <SaveCancelButtons isSubmitting={isSubmitting} handleCancel={() => { setEdit(false) }} handleSave={handleSave} />
                    </Row>
                </Container>
            </EditableText>
        </div>
    )
}
