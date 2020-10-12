import React from 'react'
import IssueModal from "../Components/Issues/IssueModal"
import IssueCreateView from "../Components/Issues/IssueCreateModal"

const testIssue = new Map()
testIssue.set("hdkahdjaskdh", {
    _id: "hdkahdjaskdh", summary: "test 1", key: "test key 1", labels: ["test"], assignee: "testUserId",
    issueType: "task", flag: false, reportee: "testUserId", project: "test id"
})

export default function Test() {
    return (
        <div>
          <IssueCreateView projectName="test id"/>
        </div>
    )
}


//  <IssueModal open={true} closeModal={()=>{}} issue={testIssue}/>