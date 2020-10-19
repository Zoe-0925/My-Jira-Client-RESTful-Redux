import React from 'react'
import IssueDetailForm from "../Components/Issues/IssueDetail"
import CustomModal from "../Components/Shared/CustomModal"
import { Modal, DialogContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Row } from "reactstrap"
import CommentBox from "../Components/Comment/CommentBox"


const testIssue = new Map()
testIssue.set("hdkahdjaskdh", {
    _id: "hdkahdjaskdh", summary: "test 1", key: "test key 1", labels: ["test"], assignee: "testUserId",
    description: "test description", status: "1",
    issueType: "task", flag: false, reportee: "testUserId", project: "test id"
})

export default function Test() {
    const [open, setOpen] = React.useState(true)

    const closeModal = () => setOpen(false)

    const comments = [
        { author: "author 1", description: "test comment", date: "date" }
    ]

    return (
        <div>
            <p onClick={() => setOpen(true)}>open </p>
            <Modal
                className="modal"
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <DialogContent>
                    <Row>
                        <CloseIcon onClick={closeModal} />
                    </Row>
                    <IssueDetailForm issue={testIssue} />
                </DialogContent>
            </Modal>
            <CommentBox comments={comments} />
        </div>
    )
}


//  <IssueModal open={true} closeModal={()=>{}} issue={testIssue}/>