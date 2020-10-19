import React, { useState, useEffect } from 'react'
import Pusher from 'pusher-js';
import CommentBox from "./CommentBox"

export default function CommentHOC() {
    const [comments, setState] = useState([])

    const data = []
    // TODO
    //useSelect()
    // Select comments from the store

    useEffect(() => {
        const pusher = new Pusher('<your app key>', {
            cluster: '<your app cluster>',
            encrypted: true,
        });

        const channel = pusher.subscribe('comments');


        channel.bind('new-comment', data => {
            setState(prevState => {
                const { commentList } = prevState;
                commentList.push(data.comment);
                //TODO
                //check if data.comment is correct

                return {
                    commentList,
                };
            });
        })

    }, [])

    return (
        <CommentBox comments={comments} />
    )
}
