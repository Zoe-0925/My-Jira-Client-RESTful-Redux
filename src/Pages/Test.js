import React from 'react'
import IssueModal from "../Components/Issues/IssueModal"

const testIssue = new Map()
testIssue.set("hdkahdjaskdh", {
    _id: "hdkahdjaskdh", summary: "test 1", key: "test key 1", labels: ["test"], assignee: "testUserId",
    description: "test description", status:"1",
    issueType: "task", flag: false, reportee: "testUserId", project: "test id"
})

export default function Test() {
    return (
        <div>
            <IssueModal issue={testIssue} />
        </div>
    )
}


//  <IssueModal open={true} closeModal={()=>{}} issue={testIssue}/>