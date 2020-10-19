import React from 'react'
import CommentContent from "./CommentContent"

export default function CommentBox({ comments }) {

    return (
        <div className="CommentBox">
            <div className="CommentList">
                {comments.map(each => <CommentContent comment={each} />)}
            </div>
        </div>)
}
